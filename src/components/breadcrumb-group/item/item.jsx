import clsx from 'clsx'
import {memo} from 'react'
import {Link} from 'react-router'
import InternalIcon from '../../icon/internal'
import styles from './styles.css.js'

const Item = memo(({anchorAttributes, children, isLast, ...itemAttributes}) =>
  isLast ? (
    <span {...itemAttributes}>{children}</span>
  ) : (
    <Link {...itemAttributes} {...anchorAttributes}>
      {children}
    </Link>
  )
)
const BreadcrumbItem = memo(
  ({item, onClick, isDisplayed, isLast = false, isCompressed = false}) => {
    const itemAttributes = {
      className: clsx(styles.anchor, {[styles.compressed]: isCompressed})
    }
    const anchorAttributes = {
      to: item.to || '#',
      onClick
    }
    return (
      <div className={clsx(styles.breadcrumb, isLast && styles.last)}>
        {isDisplayed ? (
          <Item
            isLast={isLast}
            anchorAttributes={anchorAttributes}
            {...itemAttributes}>
            <span className={styles.text}>{item.text}</span>
          </Item>
        ) : null}
        {!isLast ? (
          <span className={styles.icon}>
            <InternalIcon name='angle-right' />
          </span>
        ) : null}
      </div>
    )
  }
)

export {
  BreadcrumbItem
}
