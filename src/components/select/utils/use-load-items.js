import {useRef} from 'react'

const useLoadItems = ({onLoadItems, options, statusType}) => {
  const prevFilteringText = useRef(void 0)

  const fireLoadItems = filteringText => {
    if (prevFilteringText.current === filteringText) {
      return
    }
    prevFilteringText.current = filteringText

    onLoadItems?.({
      filteringText,
      firstPage: true,
      samePage: false
    })
  }

  const handleLoadMore = () => {
    if (statusType === 'pending') {
      onLoadItems({
        firstPage: options.length === 0,
        samePage: false,
        filteringText: prevFilteringText.current || ''
      })
    }
  }

  const handleRecoveryClick = () =>
    onLoadItems({
      firstPage: false,
      samePage: true,
      filteringText: prevFilteringText.current || ''
    })

  return {
    fireLoadItems,
    handleLoadMore,
    handleRecoveryClick
  }
}

export {
  useLoadItems
}
