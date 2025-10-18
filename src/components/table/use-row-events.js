import {findUpUntil} from '../internal/utils/dom'
import styles from './styles.css.js'

const useRowEvents = ({onRowClick, onRowContextMenu}) => {
  const onRowClickHandler = (rowIndex, item, event) => {
    const tableCell = findUpUntil(
      event.target,
      element => element.tagName.toLowerCase() === 'td'
    )
    if (
      !tableCell ||
      !tableCell.classList.contains(styles['selection-control'])
    ) {
      onRowClick?.({rowIndex, item, event})
    }
  }
  const onRowContextMenuHandler = (rowIndex, item, event) => {
    onRowContextMenu?.({
      rowIndex,
      item,
      clientX: event.clientX,
      clientY: event.clientY,
      event
    })
  }
  return {
    onRowClickHandler: onRowClick && onRowClickHandler,
    onRowContextMenuHandler: onRowContextMenu && onRowContextMenuHandler
  }
}

export {
  useRowEvents
}
