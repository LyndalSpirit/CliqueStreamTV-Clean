// scripts/prebuild-guard.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import readline from 'node:readline';

const REPO_ROOT = process.cwd();
const TARGET_LAYOUT = path.join(REPO_ROOT, 'src', 'app', 'layout.tsx');

// Directories to skip during scan
const SKIP_DIRS = new Set([
  'node_modules', '.git', '.next', '.vercel', 'dist', 'build', 'out',
  '.cache', '.turbo', '.vscode'
]);

// Extensions considered text for scanning
const TEXT_EXTS = new Set([
  '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx',
  '.json', '.md', '.mdx', '.txt', '.yml', '.yaml', '.toml',
  '.css', '.scss', '.sass', '.html', '.svg', '.env', '.ini',
  '.conf', '.config', '.properties'
]);

// Literal conflict markers
const START_MARK = '<<<<<<<';
const MID_MARK   = '=======';
const END_MARK   = '>>>>>>>';

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function readSafe(file) {
  try { return fs.readFileSync(file); } catch { return null; }
}

function isTextFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (TEXT_EXTS.has(ext)) return true;
  const buf = readSafe(file);
  if (!buf) return false;
  if (buf.length === 0) return true;
  const sample = buf.subarray(0, Math.min(buf.length, 2048));
  let nonPrintable = 0;
  for (const b of sample) {
    if (b === 0 || b < 9 || (b > 13 && b < 32)) nonPrintable++;
  }
  return nonPrintable / sample.length < 0.02;
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      yield* walk(path.join(dir, e.name));
    } else if (e.isFile()) {
      yield path.join(dir, e.name);
    }
  }
}

async function scanFileForConflicts(file) {
  if (!isTextFile(file)) return [];
  const stream = fs.createReadStream(file, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  const hits = [];
  let lineNo = 0;

  for await (const raw of rl) {
    lineNo++;
    const line = raw.trimStart(); // conflict markers appear at start
    if (line.startsWith(START_MARK)) {
      hits.push({ lineNo, kind: 'START', line: raw.slice(0, 400) });
    } else if (line.startsWith(MID_MARK)) {
      hits.push({ lineNo, kind: 'MID', line: raw.slice(0, 400) });
    } else if (line.startsWith(END_MARK)) {
      hits.push({ lineNo, kind: 'END', line: raw.slice(0, 400) });
    }
  }
  rl.close();
  return hits;
}

function fingerprintLayout() {
  if (!fs.existsSync(TARGET_LAYOUT)) {
    return { exists: false, message: `Missing file: ${TARGET_LAYOUT}` };
  }
  const buf = fs.readFileSync(TARGET_LAYOUT);
  const text = buf.toString('utf8');
  return {
    exists: true,
    path: TARGET_LAYOUT,
    size: buf.length,
    sha256: sha256(buf),
    startSnippet: text.slice(0, 160),
    endSnippet: text.slice(Math.max(0, text.length - 160))
  };
}

(async () => {
  console.log('🔍 Prebuild guard: fingerprinting src/app/layout.tsx and scanning for conflict markers…\n');

  // 1) Fingerprint layout.tsx for traceability in CI logs
  const fp = fingerprintLayout();
  if (!fp.exists) {
    console.warn(`⚠ ${fp.message}`);
  } else {
    console.log('— Layout fingerprint —');
    console.log(`Path   : ${fp.path}`);
    console.log(`Size   : ${fp.size} bytes`);
    console.log(`SHA256 : ${fp.sha256}`);
    console.log('Start  :');
    console.log('----------------------------------------');
    console.log(fp.startSnippet);
    console.log('----------------------------------------');
    console.log('End    :');
    console.log('----------------------------------------');
    console.log(fp.endSnippet);
    console.log('----------------------------------------\n');
  }

  // 2) Scan repository for unresolved Git conflict markers
  const offenders = [];
  for (const file of walk(REPO_ROOT)) {
    const hits = await scanFileForConflicts(file);
    if (hits.length) offenders.push({ file, hits });
  }

  if (offenders.length) {
    console.error('🚫 Unresolved Git conflict markers detected!\n');
    for (const { file, hits } of offenders) {
      console.error(`File: ${path.relative(REPO_ROOT, file)}`);
      for (const h of hits.slice(0, 10)) {
        console.error(`  Line ${h.lineNo} [${h.kind}] : ${h.line}`);
      }
      if (hits.length > 10) {
        console.error(`  …and ${hits.length - 10} more`);
      }
      console.error('');
    }
    console.error('Fix these conflicts (remove <<<<<<<, =======, >>>>>>>, resolve content) then commit again.');
    process.exit(1);
  }

  console.log('✅ Prebuild guard passed: no conflict markers found.\n');
})();

