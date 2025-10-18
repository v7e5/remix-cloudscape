import {useInternalI18n} from '../../i18n/context'
import {ItemSet} from '../selection/utils'

const useExpandableTableProps = ({
  items,
  expandableRows,
  trackBy,
  ariaLabels
}) => {
  const i18n = useInternalI18n('table')
  const isExpandable = !!expandableRows
  const expandedSet = new ItemSet(trackBy, expandableRows?.expandedItems ?? [])
  let allItems = items
  const itemToDetail = new Map()
  const getItemLevel = item => itemToDetail.get(item)?.level ?? 0
  if (isExpandable) {
    const visibleItems = new Array()
    const traverse = (item, dtail) => {
      const children = expandableRows.getItemChildren(item)
      itemToDetail.set(item, {...dtail, children})
      visibleItems.push(item)
      if (expandedSet.has(item)) {
        children.forEach((child, index) =>
          traverse(child, {
            level: dtail.level + 1,
            setSize: children.length,
            posInSet: index + 1,
            parent: item
          })
        )
      }
    }
    items.forEach((item, index) =>
      traverse(item, {
        level: 1,
        setSize: items.length,
        posInSet: index + 1,
        parent: null
      })
    )
    for (let index = 0; index < visibleItems.length; index++) {
      const item = visibleItems[index]
      if (expandedSet.has(item)) {
        let insertionIndex = index + 1
        for (
          insertionIndex;
          insertionIndex < visibleItems.length;
          insertionIndex++
        ) {
          const insertionItem = visibleItems[insertionIndex]
          if (getItemLevel(item) >= getItemLevel(insertionItem)) {
            break
          }
        }
        insertionIndex--
      }
    }
    allItems = visibleItems
  }
  const getExpandableItemProps = item => {
    const {
      level = 1,
      setSize = 1,
      posInSet = 1,
      parent = null,
      children = []
    } = itemToDetail.get(item) ?? {}
    return {
      level,
      setSize,
      posInSet,
      isExpandable: expandableRows?.isItemExpandable(item) ?? true,
      isExpanded: expandedSet.has(item),
      onExpandableItemToggle: () =>
        expandableRows?.onExpandableItemToggle({
          item,
          expanded: !expandedSet.has(item)
        }),
      expandButtonLabel: i18n(
        'ariaLabels.expandButtonLabel',
        ariaLabels?.expandButtonLabel?.(item)
      ),
      collapseButtonLabel: i18n(
        'ariaLabels.collapseButtonLabel',
        ariaLabels?.collapseButtonLabel?.(item)
      ),
      parent,
      children
    }
  }
  return {isExpandable, allItems, getExpandableItemProps}
}

export {
  useExpandableTableProps
}
