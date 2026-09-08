'use client'

import { useEffect, useRef } from 'react'

type Pair = { link: HTMLAnchorElement; heading: HTMLElement }

export function TocIndicator() {
  const rail = useRef<SVGSVGElement>(null)
  const base = useRef<SVGPathElement>(null)
  const active = useRef<SVGPathElement>(null)
  const dot = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const nav = document.querySelector('.nextra-toc')
    const list = nav?.querySelector('ul')
    const svg = rail.current
    const basePath = base.current
    const activePath = active.current
    const node = dot.current
    if (!nav || !list || !svg || !basePath || !activePath || !node) return

    list.prepend(svg)
    list.appendChild(node)

    const pairs: Pair[] = []
    for (const link of list.querySelectorAll<HTMLAnchorElement>('li > a')) {
      const id = decodeURIComponent(link.hash.slice(1))
      const heading = id ? document.getElementById(id) : null
      if (heading) pairs.push({ link, heading })
    }
    if (!pairs.length) return

    // One continuous stroke: each item contributes a vertical run at its own
    // indent, and the jump between two runs is horizontal because the items
    // touch, which is what turns a level change into an elbow.
    const trace = (from: number, to: number) => {
      if (from < 0 || to < from) return ''

      let d = ''
      for (let i = from; i <= to; i++) {
        const el = pairs[i].link
        const x = el.offsetLeft + 0.5
        const top = el.offsetTop
        d += `${i === from ? 'M' : 'L'} ${x} ${top} L ${x} ${top + el.offsetHeight}`
      }
      return d
    }

    let ticking = false

    const update = () => {
      ticking = false

      const top = 72
      const bottom = Math.max(top + 40, window.innerHeight * 0.55)

      let current = -1
      let frontier = -1

      pairs.forEach(({ heading }, index) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= top) current = index
        if (rect.top < bottom) frontier = index
      })

      const last = Math.max(current, frontier)
      const first = current >= 0 ? current : frontier

      pairs.forEach(({ link }, index) => {
        link.classList.toggle('as-toc-on', last >= 0 && index >= first && index <= last)
      })

      svg.style.height = `${list.scrollHeight}px`
      basePath.setAttribute('d', trace(0, pairs.length - 1))
      activePath.setAttribute('d', trace(first, last))

      if (last < 0) {
        node.style.opacity = '0'
        return
      }

      const el = pairs[last].link
      node.style.opacity = '1'
      node.style.top = `${el.offsetTop + el.offsetHeight / 2}px`
      node.style.left = `${el.offsetLeft}px`
    }

    const schedule = () => {
      if (ticking) return
      ticking = true
      update()
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      for (const { link } of pairs) link.classList.remove('as-toc-on')
    }
  }, [])

  return (
    <>
      <svg ref={rail} className="as-toc-rail" aria-hidden="true">
        <path ref={base} className="as-toc-rail__base" />
        <path ref={active} className="as-toc-rail__active" />
      </svg>
      <span ref={dot} className="as-toc-dot" aria-hidden="true" />
    </>
  )
}
