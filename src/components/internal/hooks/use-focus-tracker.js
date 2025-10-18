import {useRef, useEffect} from 'react'
import FocusTracker from '../focus-tracker'

const useFocusTracker = ({rootRef, onBlur, onFocus}) => {
  const focusTracker = useRef(null)
  useEffect(() => {
    if (!rootRef.current) {
      return
    }
    focusTracker.current = new FocusTracker(rootRef.current, {
      onFocusLeave: () => {
        onBlur?.()
      },
      onFocusEnter: () => {
        onFocus?.()
      }
    })
    focusTracker.current.initialize()
    return () => {
      focusTracker.current?.destroy()
    }
  }, [rootRef, onBlur, onFocus])
}

export {
  useFocusTracker
}
