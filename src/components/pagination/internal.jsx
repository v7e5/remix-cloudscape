import {memo} from 'react'
import clsx from 'clsx'
import InternalIcon from '../icon/internal'
import styles from './styles.css.js'
import {getPaginationState, range} from './utils'

const PageButton = memo(
  ({className, disabled, pageIndex, isCurrent = false, children, onClick}) => {
    const handleClick = event => {
      event.preventDefault()
      onClick?.(pageIndex)
    }
    return (
      <li className={styles['page-item']}>
        <button
          className={clsx(
            className,
            styles.button,
            disabled && styles['button-disabled'],
            isCurrent && styles['button-current']
          )}
          type='button'
          disabled={disabled || isCurrent}
          onClick={handleClick}>
          {children}
        </button>
      </li>
    )
  }
)

const PageNumber = memo(({pageIndex, ...rest}) => {
  return (
    <PageButton
      className={styles['page-number']}
      pageIndex={pageIndex}
      {...rest}>
      {pageIndex}
    </PageButton>
  )
})

const Z = memo(
  ({currentPage, pagesCount, disabled, onClick}) => {
    const {leftDots, leftIndex, rightIndex, rightDots} = getPaginationState(
      currentPage,
      pagesCount
    )
    return (
      <ul className={clsx(styles.root, disabled && styles['root-disabled'])}>
        <PageButton
          className={styles.arrow}
          pageIndex={currentPage - 1}
          disabled={disabled || currentPage === 1}
          onClick={onClick}>
          <InternalIcon
            name='angle-left'
            variant={disabled ? 'disabled' : 'normal'}
          />
        </PageButton>
        <PageNumber
          pageIndex={1}
          isCurrent={currentPage === 1}
          disabled={disabled}
          onClick={onClick}
        />
        {leftDots && <li className={styles.dots}>...</li>}
        {range(leftIndex, rightIndex).map(pageIndex => (
          <PageNumber
            key={pageIndex}
            isCurrent={currentPage === pageIndex}
            pageIndex={pageIndex}
            disabled={disabled}
            onClick={onClick}
          />
        ))}
        {rightDots && <li className={styles.dots}>...</li>}
        {pagesCount > 1 && (
          <PageNumber
            isCurrent={currentPage === pagesCount}
            pageIndex={pagesCount}
            disabled={disabled}
            onClick={onClick}
          />
        )}
        <PageButton
          className={styles.arrow}
          pageIndex={currentPage + 1}
          disabled={disabled || pagesCount === 0 || currentPage === pagesCount}
          onClick={onClick}>
          <InternalIcon
            name='angle-right'
            variant={disabled ? 'disabled' : 'normal'}
          />
        </PageButton>
      </ul>
    )
  }
)

export {
  Z as default
}
