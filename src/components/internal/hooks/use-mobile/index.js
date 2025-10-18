import {useEffect, useState} from 'react'
import {getMatchingBreakpoint, mobileBreakpoint} from '../../breakpoints'

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(
      window.matchMedia
        ? window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches
        : getMatchingBreakpoint(window.innerWidth, ['xs']) !== 'xs'
    )
  }, [])

  return isMobile
}

export {
  useMobile
}
