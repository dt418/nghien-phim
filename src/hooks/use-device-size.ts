'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

type DeviceSize = 'mobile' | 'tablet' | 'desktop' | 'large-desktop'

interface DeviceSizeState {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  deviceType: DeviceSize
}

// Breakpoints based on Tailwind defaults
const BREAKPOINTS = {
  MOBILE: 640, // sm
  TABLET: 768, // md
  DESKTOP: 1024, // lg
  LARGE: 1280, // xl
} as const

// Debounce function moved outside component to prevent recreation
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms = 300,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

/**
 * Hook for detecting device size and type with responsive breakpoints
 * Provides responsive utilities for conditional rendering and layout adjustments
 *
 * @returns DeviceSizeState object with device information
 */
export function useDeviceSize(): DeviceSizeState {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  })

  const updateDimensions = useCallback(() => {
    if (typeof window === 'undefined')
      return

    const width = window.innerWidth
    const height = window.innerHeight

    // Only update state if dimensions actually changed
    if (width !== dimensions.width || height !== dimensions.height) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setDimensions({ width, height })
    }
  }, [dimensions])

  // Derive device information from dimensions
  const deviceInfo = useMemo((): DeviceSizeState => {
    const { width, height } = dimensions

    // Determine device type based on width
    const isMobile = width < BREAKPOINTS.MOBILE
    const isTablet = width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.DESKTOP
    const isDesktop = width >= BREAKPOINTS.DESKTOP && width < BREAKPOINTS.LARGE
    const isLargeDesktop = width >= BREAKPOINTS.LARGE

    // Get device type string
    let deviceType: DeviceSize = 'desktop'
    if (isMobile)
      deviceType = 'mobile'
    else if (isTablet)
      deviceType = 'tablet'
    else if (isLargeDesktop)
      deviceType = 'large-desktop'

    return {
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      deviceType,
    }
  }, [dimensions])

  useEffect(() => {
    // Skip on the server
    if (typeof window === 'undefined')
      return

    // Update dimensions on mount
    updateDimensions()

    // Handle resize events with debounce
    const debouncedHandleResize = debounce(updateDimensions, 200)
    window.addEventListener('resize', debouncedHandleResize)

    return () => window.removeEventListener('resize', debouncedHandleResize)
  }, [updateDimensions])

  return deviceInfo
}
