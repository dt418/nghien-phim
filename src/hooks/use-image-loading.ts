'use client'

import { useCallback, useLayoutEffect, useState } from 'react'

interface UseImageLoadingOptions {
  onLoad?: () => void
  onError?: (error: Error) => void
}

/**
 * Hook for handling image loading states with error handling
 * Provides loading state tracking and error handling for images
 *
 * @param src - The image source URL
 * @param options - Optional configuration for load/error callbacks
 * @returns Object containing loading state and error
 */
export function useImageLoading(src: string, options?: UseImageLoadingOptions) {
  const [state, setState] = useState({
    isLoading: true,
    error: null as Error | null,
    imageSrc: src,
  })

  const handleImageLoad = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: false, error: null }))
    options?.onLoad?.()
  }, [options])

  const handleImageError = useCallback((error: Error) => {
    setState(prev => ({ ...prev, isLoading: false, error }))
    options?.onError?.(error)
  }, [options])

  // Reset loading state when src changes
  useLayoutEffect(() => {
    setState({
      isLoading: true,
      error: null,
      imageSrc: src,
    })
  }, [src])

  return {
    ...state,
    handleImageLoad,
    handleImageError,
  }
}
