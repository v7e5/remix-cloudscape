import handleKey from '../../internal/utils/handle-key'

const KEYBOARD_SINGLE_STEP_SIZE = 10
const KEYBOARD_MULTIPLE_STEPS_SIZE = 60
const getCurrentSize = panelRef => {
  if (!panelRef || !panelRef.current) {
    return {
      panelHeight: 0,
      panelWidth: 0
    }
  }
  return {
    panelHeight: panelRef.current.clientHeight,
    panelWidth: panelRef.current.clientWidth
  }
}
const useKeyboardEvents = ({position, onResize, panelRef}) => {
  return event => {
    let currentSize
    let maxSize
    const {panelHeight, panelWidth} = getCurrentSize(panelRef)
    if (position === 'side') {
      currentSize = panelWidth
      maxSize = window.innerWidth
    } else {
      currentSize = panelHeight
      maxSize = window.innerHeight
    }
    let isEventHandled = true
    const singleStepUp = () =>
      onResize(currentSize + KEYBOARD_SINGLE_STEP_SIZE)
    const singleStepDown = () =>
      onResize(currentSize - KEYBOARD_SINGLE_STEP_SIZE)
    const multipleStepUp = () =>
      onResize(currentSize + KEYBOARD_MULTIPLE_STEPS_SIZE)
    const multipleStepDown = () =>
      onResize(currentSize - KEYBOARD_MULTIPLE_STEPS_SIZE)
    handleKey(event, {
      onBlockStart: () => {
        position === 'bottom' ? singleStepUp() : singleStepDown()
      },
      onBlockEnd: () => {
        position === 'bottom' ? singleStepDown() : singleStepUp()
      },
      onInlineEnd: () => {
        position === 'bottom' ? singleStepUp() : singleStepDown()
      },
      onInlineStart: () => {
        position === 'bottom' ? singleStepDown() : singleStepUp()
      },
      onPageDown: () => multipleStepDown(),
      onPageUp: () => multipleStepUp(),
      onHome: () => onResize(maxSize),
      onEnd: () => onResize(0),
      onDefault: () => (isEventHandled = false)
    })
    if (isEventHandled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
}

export {
  useKeyboardEvents
}
