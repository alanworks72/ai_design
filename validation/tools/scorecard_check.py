#!/usr/bin/env python3
"""Validate AI Design scorecards and compare reviewers.

Checks structure, evidence-reference presence, math, and declared gates.
Does NOT inspect screenshots or independently verify cited evidence.
"""
import argparse
import json
from pathlib import Path

GROUPS = {
    "A": ("A1", "A2", "A3", "A4", "A5"),
    "V": ("V1", "V2", "V3", "V4", "V5"),
    "D": ("D1", "D2", "D3", "D4"),
    "F": ("F1", "F2", "F3", "F4"),
    "R": ("R1", "R2"),
}
IDS = tuple(x for group in GROUPS.values() for x in group)
GATES = tuple(f"G{i:02d}" for i in range(1, 8))
MINIMUMS = {"A": 17.5, "V": 17.5, "D": 14.0, "F": 14.0, "R": 7.0}


def has_evidence(value):
    return isinstance(value, list) and bool(value) and all(
        isinstance(x, str) and bool(x.strip()) for x in value
    )


def check(doc):
    """Compute a provisional decision from a reviewer's stated evidence."""
    if not isinstance(doc, dict):
        raise ValueError("Scorecard must be a JSON object")
    for field in ("artifact_id", "reviewer_id"):
        if not isinstance(doc.get(field), str) or not doc[field].strip():
            raise ValueError(f"{field} must be a nonempty string")
    ratings = doc.get("ratings", {})
    gates = doc.get("gates", {})
    acceptance = doc.get("acceptance", [])
    if not isinstance(ratings, dict) or not isinstance(gates, dict):
        raise ValueError("ratings and gates must be objects")
    if not isinstance(acceptance, list) or not acceptance:
        raise ValueError("acceptance must be a non-empty array")
    if set(ratings) != set(IDS):
        raise ValueError(f"ratings must have exactly {list(IDS)}; missing={sorted(set(IDS)-set(ratings))}, extras={sorted(set(ratings)-set(IDS))}")
    if set(gates) != set(GATES):
        raise ValueError(f"gates must have exactly {list(GATES)}")

    safe_ratings = {}
    issues = []
    for criterion in IDS:
        row = ratings[criterion]
        if not isinstance(row, dict):
            raise ValueError(f"{criterion}: expected an object")
        value = row.get("rating")
        if value is not None and (type(value) is not int or value not in range(5)):
            raise ValueError(f"{criterion}: rating must be 0..4 or null")
        if value is not None and not has_evidence(row.get("evidence")):
            issues.append(f"{criterion}: rating exists but cited evidence is absent")
            value = None
        if value is None:
            issues.append(f"{criterion}: UNVERIFIED")
        safe_ratings[criterion] = value

    gate_statuses = {}
    for gate in GATES:
        row = gates[gate]
        if not isinstance(row, dict) or row.get("status") not in ("CLEAR", "VIOLATION", "UNVERIFIED"):
            raise ValueError(f"{gate}: status must be CLEAR, VIOLATION or UNVERIFIED")
        status = row["status"]
        if status != "UNVERIFIED" and not has_evidence(row.get("evidence")):
            issues.append(f"{gate}: no evidence for {status}; treated as UNVERIFIED")
            status = "UNVERIFIED"
        gate_statuses[gate] = status

    seen = set()
    acceptance_statuses = []
    for item in acceptance:
        if not isinstance(item, dict) or not isinstance(item.get("id"), str) or not item["id"].strip():
            raise ValueError("Every acceptance item needs a nonempty id")
        if item["id"] in seen:
            raise ValueError(f"Duplicate acceptance id: {item['id']}")
        seen.add(item["id"])
        if type(item.get("mandatory")) is not bool:
            raise ValueError(f"{item['id']}: mandatory must be boolean")
        if item.get("status") not in ("PASS", "FAIL", "UNVERIFIED"):
            raise ValueError(f"{item['id']}: status must be PASS, FAIL or UNVERIFIED")
        status = item["status"]
        if status != "UNVERIFIED" and not has_evidence(item.get("evidence")):
            status = "UNVERIFIED"
            issues.append(f"{item['id']}: missing evidence, treated as UNVERIFIED")
        if item["mandatory"]:
            acceptance_statuses.append(status)

    regression = doc.get("major_regression")
    if regression not in ("NONE", "PRESENT", "UNVERIFIED", "NOT_APPLICABLE"):
        raise ValueError("major_regression must be NONE, PRESENT, UNVERIFIED, or NOT_APPLICABLE")

    points = {}
    for prefix, ids in GROUPS.items():
        vals = [safe_ratings[key] for key in ids]
        points[prefix] = 1.25 * sum(vals) if all(x is not None for x in vals) else None
    total = sum(points.values()) if all(v is not None for v in points.values()) else None
    confirmed_failure = (
        "VIOLATION" in gate_statuses.values()
        or "FAIL" in acceptance_statuses
        or regression == "PRESENT"
    )
    incomplete = (
        any(value is None for value in safe_ratings.values())
        or "UNVERIFIED" in gate_statuses.values()
        or "UNVERIFIED" in acceptance_statuses
        or regression == "UNVERIFIED"
    )
    if confirmed_failure:
        status = "FAIL"
    elif incomplete:
        status = "PENDING"
    elif total < 85 or any(points[p] < MINIMUMS[p] for p in GROUPS):
        status = "FAIL"
    else:
        status = "PASS"

    return {
        "artifact_id": doc.get("artifact_id"),
        "reviewer_id": doc.get("reviewer_id"),
        "status": status,
        "total": total,
        "categories": points,
        "ratings": safe_ratings,
        "gates": gate_statuses,
        "issues": sorted(set(issues)),
    }


def compare(a, b):
    if a["artifact_id"] != b["artifact_id"]:
        raise ValueError("Cannot compare reviews of different artifacts")
    common = [(a["ratings"][key], b["ratings"][key]) for key in IDS]
    both = [(v, w) for v, w in common if v is not None and w is not None]
    disagreements = [gate for gate in GATES if a["gates"][gate] != b["gates"][gate]]
    return {
        "reviewers": [a["reviewer_id"], b["reviewer_id"]],
        "status_agrees": a["status"] == b["status"],
        "total_gap": abs(a["total"] - b["total"]) if a["total"] is not None and b["total"] is not None else None,
        "mean_item_rating_gap": round(sum(abs(v - w) for v, w in both) / len(both), 3) if both else None,
        "items_both_rated": len(both),
        "gate_disagreements": disagreements,
        "per_item_gaps": {key: abs(a["ratings"][key] - b["ratings"][key]) for key in IDS if a["ratings"][key] is not None and b["ratings"][key] is not None},
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("files", type=Path, nargs="+", help="One reviewer scorecard JSON per file")
    args = parser.parse_args()
    reports = []
    for filepath in args.files:
        try:
            doc = json.loads(filepath.read_text(encoding="utf-8"))
            reports.append(check(doc))
        except (OSError, json.JSONDecodeError, ValueError) as exc:
            parser.error(f"{filepath}: {exc}")
    output = {"reviews": reports}
    if len(reports) == 2:
        output["comparison"] = compare(reports[0], reports[1])
    elif len(reports) > 2:
        output["pairwise_comparisons"] = [compare(reports[i], reports[j]) for i in range(len(reports)) for j in range(i+1, len(reports))]
    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
