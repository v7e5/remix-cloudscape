import Item from '../parts/item'
import MutliselectItem from '../parts/multiselect-item'
import {getItemProps} from './get-item-props'

const renderOptions = ({
  options,
  getOptionProps,
  filteringValue,
  highlightType,
  checkboxes = false,
  hasDropdownStatus,
  virtualItems,
  useInteractiveGroups,
  ariaSetsize
}) => {
  return options.map((option, index) => {
    const virtualItem = virtualItems && virtualItems[index]
    const globalIndex = virtualItem ? virtualItem.index : index
    const {key, ...props} = getItemProps({
      option,
      index: globalIndex,
      getOptionProps,
      filteringValue,
      checkboxes
    })
    const isLastItem = index === options.length - 1
    const padBottom = !hasDropdownStatus && isLastItem
    const ListItem = useInteractiveGroups ? MutliselectItem : Item
    return (
      <ListItem
        key={globalIndex}
        {...props}
        virtualPosition={virtualItem && virtualItem.start}
        ref={virtualItem && virtualItem.measureRef}
        padBottom={padBottom}
        ariaPosinset={globalIndex + 1}
        ariaSetsize={ariaSetsize}
        highlightType={highlightType.type}
      />
    )
  })
}

export {
  renderOptions
}
