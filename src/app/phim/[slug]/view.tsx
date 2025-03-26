'use client'
import type React from 'react'
import { useCallback, useEffect } from 'react'

export const ReportView: React.FC<{ slug: string | string[] }> = ({ slug }) => {
  const fetchIncrement = useCallback(async () => {
    if (slug) {
      try {
        await fetch('/api/increment', {
          body: JSON.stringify({ slug }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        // Handle response if needed
      }
      catch (error) {
        console.error('Fetch view count error.', error)
      }
    }
  }, [slug])

  useEffect(() => {
    fetchIncrement()

    return () => {}
  }, [fetchIncrement])

  return null
}
