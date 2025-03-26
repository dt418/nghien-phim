'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [value, setValue] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === 'undefined')
      return

    const result = window.matchMedia(query)

    // ✅ Function to update state safely
    const updateValue = (matches: boolean) => {
      setValue(() => matches)
    }

    // ✅ Event listener
    const onChange = (event: MediaQueryListEvent) => {
      updateValue(event.matches)
    }

    result.addEventListener('change', onChange)

    // ✅ Defer state update outside of useEffect body
    queueMicrotask(() => updateValue(result.matches))

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}
