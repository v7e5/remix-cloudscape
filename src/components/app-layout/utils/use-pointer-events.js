import {useCallback} from 'react'
import styles from '../styles.css.js'
import {
  getIsRtl,
  getLogicalClientX,
  getLogicalBoundingClientRect
} from '~/components/internal/toolkit/internal'

const usePointerEvents = ({
  position,
  panelRef,
  handleRef,
  onResize,
  hasTransitions = false
}) => {
  const onDocumentPointerMove = useCallback(
    event => {
      if (!panelRef || !panelRef.current || !handleRef || !handleRef.current) {
        return
      }
      panelRef.current.classList.remove(styles['with-motion'])
      if (position === 'side') {
        const mouseClientX =
          getLogicalClientX(event, getIsRtl(panelRef.current)) || 0
        const handleOffset =
          getLogicalBoundingClientRect(handleRef.current).inlineSize / 2
        const width =
          getLogicalBoundingClientRect(panelRef.current).insetInlineEnd -
          mouseClientX +
          handleOffset
        onResize(width)
      } else {
        const mouseClientY = event.clientY || 0
        const handleOffset =
          getLogicalBoundingClientRect(handleRef.current).blockSize / 2
        const height =
          getLogicalBoundingClientRect(panelRef.current).insetBlockEnd -
          mouseClientY +
          handleOffset
        onResize(height)
      }
    },
    [position, panelRef, handleRef, onResize]
  )
  const onDocumentPointerUp = useCallback(() => {
    if (!panelRef || !panelRef.current) {
      return
    }
    if (hasTransitions) {
      panelRef.current.classList.add(styles['with-motion'])
    }
    document.body.classList.remove(styles['resize-active'])
    document.body.classList.remove(styles[`resize-${position}`])
    document.removeEventListener('pointerup', onDocumentPointerUp)
    document.removeEventListener('pointermove', onDocumentPointerMove)
  }, [panelRef, onDocumentPointerMove, position, hasTransitions])
  const onSliderPointerDown = useCallback(() => {
    document.body.classList.add(styles['resize-active'])
    document.body.classList.add(styles[`resize-${position}`])
    document.addEventListener('pointerup', onDocumentPointerUp)
    document.addEventListener('pointermove', onDocumentPointerMove)
  }, [onDocumentPointerMove, onDocumentPointerUp, position])
  return onSliderPointerDown
}

export {
  usePointerEvents
}
