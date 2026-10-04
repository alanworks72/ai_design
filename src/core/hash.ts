import { createHash } from 'node:crypto';
export function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
    .map(([key, item]) => `${JSON.stringify(key)}:${canonical(item)}`).join(',')}}`;
  const result = JSON.stringify(value);
  if (result === undefined) throw new Error('Cannot hash undefined');
  return result;
}
export function contentHash(value: unknown): string { return createHash('sha256').update(canonical(value)).digest('hex'); }
