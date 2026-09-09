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

    // Both strokes follow the exact same path. The active one is revealed with
    // a dash window, which is what lets it slide and grow smoothly instead of
    // snapping from one section to the next.
    let total = 0
    let starts: number[] = []
    let mids: number[] = []
    let dotX: number[] = []
    let dotY: number[] = []

    const measure = () => {
      let d = ''
      let length = 0
      let prevX = 0
      let prevY = 0

      starts = []
      mids = []
      dotX = []
      dotY = []

      pairs.forEach(({ link }, index) => {
        const x = link.offsetLeft + 0.5
        const top = link.offsetTop
        const height = link.offsetHeight
        const bottom = top + height

        if (index === 0) {
          d += `M ${x} ${top}`
        } else {
          d += ` L ${x} ${top}`
          length += Math.hypot(x - prevX, top - prevY)
        }

        starts[index] = length
        // The stroke stops where the dot sits, never past it.
        mids[index] = length + height / 2
        dotX[index] = x
        dotY[index] = top + height / 2

        d += ` L ${x} ${bottom}`
        length += height

        prevX = x
        prevY = bottom
      })

      total = length
      // Sizing this from scrollHeight feeds back into it: the rail is absolutely
      // positioned inside the list, so it grows the scrollable area, which grows
      // the rail again and leaves the list with a scrollbar it never needed.
      svg.style.height = `${prevY}px`
      basePath.setAttribute('d', d)
      activePath.setAttribute('d', d)
    }

    let ticking = false

    const update = () => {
      ticking = false

      const top = 72
      const bottom = Math.max(top + 40, window.innerHeight * 0.55)
      const atEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

      let current = -1
      let frontier = -1

      pairs.forEach(({ heading }, index) => {
        const rect = heading.getBoundingClientRect()
        if (rect.top <= top) current = index
        if (rect.top < bottom) frontier = index
      })

      // A short final section never reaches the top of the viewport, so without
      // this the indicator stops before the last entry.
      if (atEnd) {
        current = pairs.length - 1
        frontier = pairs.length - 1
      }

      const last = Math.max(current, frontier)
      const first = current >= 0 ? current : frontier

      pairs.forEach(({ link }, index) => {
        link.classList.toggle('as-toc-on', last >= 0 && index >= first && index <= last)
      })

      if (last < 0) {
        activePath.style.strokeDasharray = `0 ${total + 1000}`
        activePath.style.strokeDashoffset = '0'
        node.style.opacity = '0'
        return
      }

      const from = starts[first]
      const to = mids[last]

      activePath.style.strokeDasharray = `${to - from} ${total + 1000}`
      activePath.style.strokeDashoffset = `${-from}`

      node.style.opacity = '1'
      node.style.top = `${dotY[last]}px`
      node.style.left = `${dotX[last]}px`
    }

    const schedule = () => {
      if (ticking) return
      ticking = true
      update()
    }

    const remeasure = () => {
      measure()
      update()
    }

    measure()
    update()

    // Skip the opening animation, then let every later change transition.
    const timer = setTimeout(() => svg.classList.add('as-toc-rail--ready'), 60)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
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
