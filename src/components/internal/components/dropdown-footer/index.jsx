import {memo} from 'react'
import clsx from 'clsx'
import styles from './styles.css.js'
import DropdownStatus from '../dropdown-status/'

const DropdownFooter = memo(({content, id, hasItems = true}) => (
  <div
    className={clsx(styles.root, {
      [styles.hidden]: content === null,
      [styles['no-items']]: !hasItems
    })}>
    <div id={id}>{content && <DropdownStatus>{content}</DropdownStatus>}</div>
  </div>
))

export {
  DropdownFooter as default
}
