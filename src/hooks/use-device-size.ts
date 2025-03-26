'use client'

import { useMediaQuery } from './use-media'

export function useDeviceSizes() {
  const isSmallMobile = useMediaQuery('(max-width: 359px)') // Smaller than iPhone SE
  const isMobile = useMediaQuery('(min-width: 360px) and (max-width: 539px)') // Small to regular mobile phones
  const isSurfaceDuo = useMediaQuery(
    '(min-width: 540px) and (max-width: 719px)',
  ) // Surface Duo
  const isTablet = useMediaQuery(
    '(min-width: 720px) and (max-width: 1023px)',
  ) // Tablets and larger devices
  const isSmallDesktop = useMediaQuery(
    '(min-width: 1024px) and (max-width: 1439px)',
  ) // Small desktops and tablets like iPad Pro 12.9"
  const isLargeDesktop = useMediaQuery('(min-width: 1440px)') // Large desktops and monitors

  return {
    isLargeDesktop,
    isMobile,
    isSmallDesktop,
    isSmallMobile,
    isSurfaceDuo,
    isTablet,
  }
}
