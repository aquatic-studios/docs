'use client'

import { usePathname } from 'next/navigation'
import gitInfo from '../git-info.json'

type Entry = {
  sha: string
  short: string
  commitUrl: string
  name: string
  handle: string | null
  date: string
}

const info = gitInfo as Record<string, Entry>

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function LastUpdated({ date }: { date?: Date }) {
  const pathname = usePathname() || '/'
  const key = pathname.length > 1 ? pathname.replace(/\/$/, '') : '/'
  const entry = info[key]

  if (!entry) {
    return date ? <span className="as-updated">Last updated: {formatDate(date.toISOString())}</span> : null
  }

  const profileUrl = entry.handle ? `https://github.com/${entry.handle}` : null
  const avatarUrl = entry.handle ? `https://github.com/${entry.handle}.png?size=40` : null

  return (
    <span className="as-updated">
      <span>Last updated: {formatDate(entry.date)} by</span>

      {profileUrl ? (
        <a className="as-updated__author" href={profileUrl} target="_blank" rel="noopener noreferrer">
          {avatarUrl ? (
            <img className="as-updated__avatar" src={avatarUrl} alt="" width={16} height={16} loading="lazy" />
          ) : null}
          <span>{entry.name}</span>
        </a>
      ) : (
        <span className="as-updated__author">{entry.name}</span>
      )}

      <span>in</span>

      <a href={entry.commitUrl} target="_blank" rel="noopener noreferrer">
        <code className="as-updated__sha">{entry.short}</code>
      </a>
    </span>
  )
}
