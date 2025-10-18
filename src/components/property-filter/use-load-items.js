import {useRef} from 'react'

const useLoadItems = (
  onLoadItems,
  focusFilteringText,
  currentFilteringProperty,
  currentFilteringText,
  currentFilteringOperator
) => {
  const focusIn = useRef(false)
  const handleBlur = () => {
    focusIn.current = true
  }
  const fireLoadItems = o => {
    onLoadItems?.({
      ...o,
      filteringText: currentFilteringText ?? o.filteringText ?? '',
      filteringProperty: currentFilteringProperty,
      filteringOperator: currentFilteringOperator
    })
    focusIn.current = false
  }
  const handleFocus = () => {
    if (focusIn.current) {
      fireLoadItems({
        firstPage: true,
        samePage: false,
        filteringText: focusFilteringText
      })
    }
  }

  return {
    onBlur: handleBlur,
    onFocus: handleFocus,
    onLoadItems: fireLoadItems
  }
}

export {
  useLoadItems
}
