import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from scorecard_check import IDS, GATES, check, compare


def sample(rating=4):
    return {
        "artifact_id": "test01", "reviewer_id": "self",
        "ratings": {key: {"rating": rating, "evidence": ["evidence/1440.png"]} for key in IDS},
        "gates": {key: {"status": "CLEAR", "evidence": ["evidence/test.log"]} for key in GATES},
        "acceptance": [{"id": "P01", "mandatory": True, "status": "PASS", "evidence": ["evidence/test.log"]}],
        "major_regression": "NOT_APPLICABLE",
    }


class ScorecardTests(unittest.TestCase):
    def test_all_fours_pass(self):
        r = check(sample())
        self.assertEqual((r["total"], r["status"]), (100, "PASS"))
        self.assertEqual(r["categories"], {"A": 25, "V": 25, "D": 20, "F": 20, "R": 10})

    def test_all_threes_fail_total(self):
        r = check(sample(3))
        self.assertEqual((r["total"], r["status"]), (75, "FAIL"))

    def test_critical_blocks_high_score(self):
        x = sample()
        x["gates"]["G06"]["status"] = "VIOLATION"
        self.assertEqual(check(x)["status"], "FAIL")

    def test_missing_criterion_evidence_never_passes(self):
        x = sample()
        x["ratings"]["A1"]["evidence"] = []
        r = check(x)
        self.assertEqual(r["status"], "PENDING")
        self.assertIsNone(r["categories"]["A"])

    def test_gate_without_evidence_never_passes(self):
        x = sample()
        x["gates"]["G01"]["evidence"] = []
        self.assertEqual(check(x)["status"], "PENDING")

    def test_group_floor_blocks_high_total(self):
        x = sample()
        for k in ("R1", "R2"):
            x["ratings"][k]["rating"] = 2
        r = check(x)
        self.assertEqual(r["total"], 95)
        self.assertEqual(r["status"], "FAIL")

    def test_fail_overrides_pending(self):
        x = sample()
        x["ratings"]["A1"]["rating"] = None
        x["gates"]["G02"]["status"] = "VIOLATION"
        self.assertEqual(check(x)["status"], "FAIL")

    def test_reviewer_comparison(self):
        a = check(sample())
        x = sample()
        x["reviewer_id"] = "blind-a"
        x["ratings"]["A1"]["rating"] = 2
        b = check(x)
        comparison = compare(a, b)
        self.assertEqual(comparison["total_gap"], 2.5)
        self.assertEqual(comparison["gate_disagreements"], [])
        self.assertEqual(comparison["per_item_gaps"]["A1"], 2)

    def test_mismatched_artifacts_rejected(self):
        a = check(sample())
        x = sample()
        x["artifact_id"] = "different-artifact"
        with self.assertRaises(ValueError):
            compare(a, check(x))

    def test_invalid_rating_rejected(self):
        x = sample()
        x["ratings"]["A1"]["rating"] = 7
        with self.assertRaises(ValueError):
            check(x)


if __name__ == "__main__":
    unittest.main()
