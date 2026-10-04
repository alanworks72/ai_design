import { lstat, mkdir, mkdtemp, open, readFile, readdir, realpath, rename, rm, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { contentHash } from './hash.js';
import { renderChangelog, renderDesign, renderTokens } from './exports.js';
import { detectConflicts, ruleHash, validateSession } from './rules.js';
import { ContractError, parseContract, validateDraft } from './validation.js';
import type { DesignSession, PackAcceptance, PackDraft, PackVersion } from './types.js';

const safeId = /^[a-z][a-z0-9-]{0,63}$/;
function identifier(id: string) {
  if (!safeId.test(id) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/.test(id)) throw new ContractError('Invalid storage identifier');
}
function errno(error: unknown, code: string): boolean { return (error as NodeJS.ErrnoException).code === code; }
export class WorkspaceBusyError extends Error { constructor() { super('Pack is being written; retry the same request'); this.name = 'WorkspaceBusyError'; } }

/** Trusted local Core API, not an authentication endpoint. A future service must authenticate user events. */
export class PackStore {
  private constructor(private readonly root: string) {}
  static async create(directory: string): Promise<PackStore> {
    await mkdir(directory, { recursive: true });
    const root = await realpath(directory);
    const store = new PackStore(root);
    await store.folder('packs');
    return store;
  }
  private inside(target: string): boolean {
    const relative = path.relative(this.root, target);
    return relative !== '' && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative);
  }
  private async folder(...segments: string[]): Promise<string> {
    let current = this.root;
    for (const segment of segments) {
      identifier(segment);
      current = path.join(current, segment);
      if (!this.inside(current)) throw new ContractError('Path outside workspace');
      try { await mkdir(current); } catch (error) { if (!errno(error, 'EEXIST')) throw error; }
      const stat = await lstat(current);
      if (stat.isSymbolicLink() || !stat.isDirectory()) throw new ContractError('Managed directory must not be a link');
    }
    return current;
  }
  private async safeRead(file: string): Promise<string> {
    if (!this.inside(file)) throw new ContractError('Path outside workspace');
    const stat = await lstat(file);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > 2_000_000) throw new ContractError('Invalid managed file');
    return readFile(file, 'utf8');
  }
  private async versions(packId: string): Promise<number[]> {
    const folder = await this.folder('packs', packId);
    return (await readdir(folder)).filter(name => /^v[1-9]\d*$/.test(name)).map(name => Number(name.slice(1)))
      .filter(Number.isSafeInteger).sort((a,b) => a-b);
  }
  async read(packId: string, version: number): Promise<PackVersion> {
    identifier(packId);
    if (!Number.isSafeInteger(version) || version < 1) throw new ContractError('Invalid version');
    const directory = path.join(await this.folder('packs', packId), `v${version}`);
    const stat = await lstat(directory);
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw new ContractError('Invalid version directory');
    const pack = parseContract('packVersion', JSON.parse(await this.safeRead(path.join(directory, 'pack.json'))));
    validateDraft(toDraft(pack));
    const { hash, ...body } = pack;
    if (contentHash(body) !== hash || pack.id !== packId || pack.version !== version || pack.rules.some(rule => rule.status !== 'accepted')) {
      throw new ContractError('Stored pack integrity mismatch');
    }
    return pack;
  }
  async latest(packId:string):Promise<PackVersion> {
    identifier(packId);
    const version=(await this.versions(packId)).at(-1);
    if(!version)throw new ContractError('Pack has no published version');
    return this.read(packId,version);
  }
  async save(options: {
    draft: unknown; session: unknown; acceptance: unknown; requestId: string; expectedBaseVersion: number;
  }): Promise<PackVersion> {
    identifier(options.requestId);
    if (!Number.isSafeInteger(options.expectedBaseVersion) || options.expectedBaseVersion < 0) throw new ContractError('Invalid base version');
    const draft = validateDraft(options.draft);
    const session = validateSession(options.session);
    const acceptance = parseContract('acceptance', options.acceptance);
    this.assertAcceptance(draft, session, acceptance);
    const directory = await this.folder('packs', draft.id);
    const lockFile = path.join(directory, '.write-lock');
    let lock;
    try { lock = await open(lockFile, 'wx'); } catch (error) {
      if (errno(error, 'EEXIST')) throw new WorkspaceBusyError();
      throw error;
    }
    try {
      const versions = await this.versions(draft.id);
      for (const version of versions) {
        const existing = await this.read(draft.id, version);
        if (existing.requestId === options.requestId) {
          if (existing.acceptance.draftHash !== contentHash(draft) || contentHash(existing.acceptance) !== contentHash(acceptance)
            || existing.version !== options.expectedBaseVersion + 1) throw new ContractError('Request id reused with different payload');
          return existing;
        }
      }
      const latest = versions.at(-1) ?? 0;
      if (latest !== options.expectedBaseVersion) throw new ContractError('Stale base version');
      const parent = latest ? await this.read(draft.id, latest) : null;
      const body = { ...draft, rules: draft.rules.map(rule => ({ ...rule, status: 'accepted' as const })),
        version: latest + 1, parentHash: parent?.hash ?? null, requestId: options.requestId, acceptance };
      const pack: PackVersion = { ...body, hash: contentHash(body) };
      if (Buffer.byteLength(JSON.stringify(pack)) > 2_000_000) throw new ContractError('Pack exceeds file size limit');
      const temporary = await mkdtemp(path.join(directory, '.pending-'));
      try {
        await writeFile(path.join(temporary, 'pack.json'), JSON.stringify(pack, null, 2) + '\n', { flag: 'wx' });
        await writeFile(path.join(temporary, 'DESIGN.md'), renderDesign(toDraft(pack)), { flag: 'wx' });
        await writeFile(path.join(temporary, 'tokens.css'), renderTokens(toDraft(pack)), { flag: 'wx' });
        await writeFile(path.join(temporary, 'sources.json'), JSON.stringify(pack.sources, null, 2) + '\n', { flag: 'wx' });
        await writeFile(path.join(temporary, 'CHANGELOG.md'), renderChangelog(pack), { flag: 'wx' });
        await rename(temporary, path.join(directory, `v${pack.version}`));
      } catch (error) {
        if (this.inside(temporary)) await rm(temporary, { recursive: true, force: true });
        throw error;
      }
      return pack;
    } finally {
      await lock.close();
      await unlink(lockFile);
    }
  }
  private assertAcceptance(draft: PackDraft, session: DesignSession, acceptance: PackAcceptance): void {
    if (acceptance.draftHash !== contentHash(draft) || acceptance.sessionId !== session.id || acceptance.revision !== session.revision) {
      throw new ContractError('Acceptance is for a different draft or revision');
    }
    if (draft.rules.some(rule => rule.status !== 'proposed' && rule.status !== 'accepted')) throw new ContractError('Rejected rule in draft');
    const ids = draft.rules.map(rule => rule.id).sort();
    if (contentHash(ids) !== contentHash([...acceptance.acceptedRuleIds].sort())) throw new ContractError('Accept every exported rule explicitly');
    for (const rule of draft.rules) {
      const accepted = session.rules.find(item => item.id === rule.id && item.status === 'accepted');
      if (!accepted || ruleHash(accepted) !== ruleHash(rule)) throw new ContractError(`Rule not accepted in session: ${rule.id}`);
    }
    if (detectConflicts(draft.rules, session.brief.id).length) throw new ContractError('Resolve personal rule conflicts before publishing pack');
    for (const source of draft.sources) if (source.adopted && !session.sources.some(item => item.id === source.id && contentHash(item) === contentHash(source))) {
      throw new ContractError('Adopted source differs from session');
    }
  }
}
export function toDraft(pack: PackVersion): PackDraft {
  return { schemaVersion: pack.schemaVersion, id: pack.id, name: pack.name, rules: pack.rules,
    tokens: pack.tokens, assets: pack.assets, sources: pack.sources, baselines: pack.baselines };
}
