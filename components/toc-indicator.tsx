'use client'

import { useEffect, useRef } from 'react'

type Pair = { link: HTMLAnchorElement; heading: HTMLElement }

export function TocIndicator() {
  const dot = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const nav = document.querySelector('.nextra-toc')
    const list = nav?.querySelector('ul')
    const node = dot.current
    if (!nav || !list || !node) return

    list.appendChild(node)

    const pairs: Pair[] = []
    for (const link of list.querySelectorAll<HTMLAnchorElement>('li > a')) {
      const id = decodeURIComponent(link.hash.slice(1))
      const heading = id ? document.getElementById(id) : null
      if (heading) pairs.push({ link, heading })
    }
    if (!pairs.length) return

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

      const active = last >= 0 ? pairs[last].link : null
      if (!active) {
        node.style.opacity = '0'
        return
      }

      node.style.opacity = '1'
      node.style.top = `${active.offsetTop + active.offsetHeight / 2}px`
      node.style.left = `${active.offsetLeft}px`
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

  return <span ref={dot} className="as-toc-dot" aria-hidden="true" />
}
