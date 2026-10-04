// JSON Schema draft-07. These contracts reject unknown properties and do not coerce input.
const text = { type: 'string', minLength: 1, maxLength: 4000 };
const id = { type: 'string', pattern: '^[a-z][a-z0-9-]{0,63}$' };
const hash = { type: 'string', pattern: '^[a-f0-9]{64}$' };
const integer = { type: 'integer', minimum: 0 };
const strings = { type: 'array', items: text, maxItems: 100 };
const ids = { type: 'array', items: id, uniqueItems: true, maxItems: 500 };
const layer = { enum: ['context', 'direction', 'tokens', 'patterns', 'assets', 'validation'] };
const literal = (value: string) => ({ const: value });
const enumeration = (...values: string[]) => ({ enum: values });
const nullable = (schema: object) => ({ anyOf: [schema, { type: 'null' }] });
const array = (items: object) => ({ type: 'array', items, maxItems: 500 });
const object = (properties: Record<string, object>) => ({
  type: 'object', properties, required: Object.keys(properties), additionalProperties: false,
});
const source = object({
  id, layer, title: text, url: { type: 'string', pattern: '^https://[^\\s]+$', maxLength: 2000 },
  revision: text, usage: enumeration('design-reference', 'code-reuse', 'live-connection'),
  license: text, adopted: { type: 'boolean' },
});
const rule = object({
  id, statement: text, intent: text, scope: enumeration('personal', 'project'), projectId: nullable(id),
  strength: enumeration('required', 'preferred'), status: enumeration('proposed', 'accepted', 'rejected'), layer,
  origin: object({ type: enumeration('user-feedback', 'framework-reference', 'ai-proposal'), referenceId: id }),
  appliesWhen: strings,
  effect: object({ key: { type: 'string', pattern: '^[a-z][a-z0-9.-]{0,127}$' }, value: { type: ['string', 'number', 'boolean'] } }),
  verification: object({ method: enumeration('automated', 'human-visual'), description: text }),
});
const token = object({
  id: { type: 'string', pattern: '^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)*$' },
  kind: enumeration('color', 'dimension', 'duration', 'font'), value: text, ruleIds: ids,
});
const asset = object({
  id, type: enumeration('pattern', 'component'), version: text, sourceId: id,
  tokenIds: { type: 'array', items: token.properties.id, uniqueItems: true, maxItems: 500 }, ruleIds: ids,
});
const baseline = object({ id, label: text, sourceHash: hash, viewport: object({
  width: { type: 'integer', minimum: 1, maximum: 10000 }, height: { type: 'integer', minimum: 1, maximum: 10000 },
}) });
const brief = object({ id, audience: text, purpose: text, tasks: strings, content: strings, environment: strings, constraints: strings });
const answer = object({
  id, actor: literal('user'), conflictId: id, projectId: id, leftHash: hash, rightHash: hash,
  selectedRuleId: id, scope: enumeration('project-exception', 'pack-change'), explanation: text,
});
const acceptance = object({
  id, actor: literal('user'), draftHash: hash, sessionId: id, revision: integer, acceptedRuleIds: ids, reason: text,
});
const packFields = {
  schemaVersion: literal('1.0'), id, name: text, rules: array(rule), tokens: array(token),
  assets: array(asset), sources: array(source), baselines: array(baseline),
};
export const schemas = {
  conflict: object({ id, projectId: id, key: text, leftId: id, rightId: id, leftHash: hash, rightHash: hash,
    question: text, recommendedId: id, recommendedReason: text,
    options: array(object({ ruleId: id, statement: text, sourceType: enumeration('user-feedback', 'framework-reference', 'ai-proposal') })) }),
  packDraft: object(packFields),
  packVersion: object({ ...packFields, version: { type: 'integer', minimum: 1 }, hash,
    parentHash: nullable(hash), requestId: id, acceptance }),
  session: object({
    schemaVersion: literal('1.0'), id, revision: integer, brief, feedback: array(object({ id, text, targetId: id })),
    sources: array(source), rules: array(rule), answers: array(answer),
    acceptances: array(object({ id, actor: literal('user'), ruleIds: ids, ruleHashes: array(object({ id, hash })), revision: integer })),
  }),
  project: object({ schemaVersion: literal('1.0'), id, packId: id, packVersion: { type: 'integer', minimum: 1 },
    packHash: hash, brief, overrides: array(rule), answers: array(answer) }),
  acceptance,
  change: object({ id, packId: id, baseVersion: { type: 'integer', minimum: 1 }, baseHash: hash,
    draftHash: hash, reason: text, changedPaths: strings, changes: array(object({ path: text, before: {}, after: {} })), impactedAssetIds: ids, impactedProjectIds: ids,
    status: enumeration('proposed', 'accepted', 'rejected') }),
  report: object({ id, targetHash: hash, checks: array(object({ ruleId: id,
    result: enumeration('pass', 'fail', 'needs-review', 'not-run'),
    method: enumeration('automated', 'human-visual'), evidence: text })) }),
};
