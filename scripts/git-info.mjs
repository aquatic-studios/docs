import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const CONTENT_DIR = 'content'
const OUT_FILE = 'git-info.json'
const REPO = 'https://github.com/aquatic-studios/docs'

const KNOWN_AUTHORS = {
  senkex: 'senkex',
  ssenkex: 'senkex'
}

const DISPLAY_NAMES = {
  senkex: 'Senkex'
}

function collect(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) collect(full, files)
    else if (entry.name.endsWith('.mdx')) files.push(full)
  }
  return files
}

function toRoute(file) {
  const rel = path.relative(CONTENT_DIR, file).split(path.sep).join('/')
  const noExt = rel.replace(/\.mdx$/, '')
  const noIndex = noExt.replace(/(^|\/)index$/, '')
  return '/' + noIndex.replace(/\/$/, '')
}

function resolveHandle(name, email) {
  const noreply = email.match(/^(?:\d+\+)?([^@]+)@users\.noreply\.github\.com$/)
  if (noreply) return noreply[1]
  const local = email.split('@')[0]?.toLowerCase()
  if (local && KNOWN_AUTHORS[local]) return KNOWN_AUTHORS[local]
  if (KNOWN_AUTHORS[name.toLowerCase()]) return KNOWN_AUTHORS[name.toLowerCase()]
  return null
}

const result = {}

if (fs.existsSync(CONTENT_DIR)) {
  for (const file of collect(CONTENT_DIR)) {
    let out = ''
    try {
      out = execFileSync(
        'git',
        ['log', '-1', '--format=%H%x1f%an%x1f%ae%x1f%aI', '--', file],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
      ).trim()
    } catch {
      continue
    }
    if (!out) continue

    const [sha, name, email, iso] = out.split('\x1f')
    const handle = resolveHandle(name, email)

    result[toRoute(file)] = {
      sha,
      short: sha.slice(0, 7),
      commitUrl: `${REPO}/commit/${sha}`,
      name: (handle && DISPLAY_NAMES[handle]) || name,
      handle,
      date: iso
    }
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify(result, null, 2) + '\n')
console.log(`git-info: ${Object.keys(result).length} pages`)
