'use client'

import { useEffect } from 'react'

export function SidebarState() {
  useEffect(() => {
    // Nextra reads a focused folder link with a trailing slash as its own child and keeps it open,
    // so the click that follows saves it as closed. Hiding the focus from React keeps the click state.
    const ignore = (event: FocusEvent) => {
      if ((event.target as Element | null)?.closest?.('.nextra-sidebar, .nextra-mobile-nav')) {
        event.stopPropagation()
      }
    }

    window.addEventListener('focusin', ignore, true)
    return () => window.removeEventListener('focusin', ignore, true)
  }, [])

  return null
}
