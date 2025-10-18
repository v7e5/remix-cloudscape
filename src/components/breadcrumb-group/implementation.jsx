import {memo} from 'react'
import styles from './styles.css.js'
import clsx from 'clsx'
import InternalIcon from '../icon/internal'
import InternalButtonDropdown from '../button-dropdown/internal'
import {InternalButton} from '../button/internal'
import {BreadcrumbItem} from './item/item'
import {getBaseProps} from '../internal/base-component'
import {useMobile} from '../internal/hooks/use-mobile'
import {useInternalI18n} from '../i18n/context'
import {createWidgetizedComponent} from '../internal/widgets'

const DEFAULT_EXPAND_ARIA_LABEL = 'Show path'
const getDropdownTrigger = ({
  ariaLabel,
  triggerRef,
  disabled,
  testUtilsClass,
  isOpen
}) => {
  return (
    <InternalButton
      ref={triggerRef}
      className={testUtilsClass}
      disabled={disabled}
      ariaExpanded={isOpen}
      aria-haspopup={true}
      ariaLabel={ariaLabel}
      variant='breadcrumb-group'
      formAction='none'>
      ...
    </InternalButton>
  )
}
const EllipsisDropdown = memo(({ariaLabel, dropdownItems}) => {
  const i18n = useInternalI18n('breadcrumb-group')
  return (
    <li className={styles.ellipsis}>
      <InternalButtonDropdown
        ariaLabel={
          i18n('expandAriaLabel', ariaLabel) ?? DEFAULT_EXPAND_ARIA_LABEL
        }
        items={dropdownItems}
        customTriggerBuilder={getDropdownTrigger}
      />
      <span className={styles.icon}>
        <InternalIcon name='angle-right' />
      </span>
    </li>
  )
})
const BreadcrumbGroupImplementation = memo(
  ({items = [], ariaLabel, expandAriaLabel, __internalRootRef, ...props}) => {
    const baseProps = getBaseProps(props)
    const isMobile = useMobile()
    let breadcrumbItems = items.map((item, index) => {
      const isLast = index === items.length - 1
      return (
        <li className={styles.item} key={index}>
          <BreadcrumbItem
            item={item}
            isCompressed={isMobile}
            isLast={isLast}
            isDisplayed={!isMobile || isLast || index === 0}
          />
        </li>
      )
    })
    if (breadcrumbItems.length >= 2) {
      const dropdownItems = items
        .slice(1, items.length - 1)
        .map((item, index) => ({
          id: (index + 1).toString(),

          text: item.text,
          to: item.to || '#'
        }))
      breadcrumbItems = [
        breadcrumbItems[0],
        <EllipsisDropdown
          key={'ellipsis'}
          ariaLabel={expandAriaLabel}
          dropdownItems={dropdownItems}
        />,
        ...breadcrumbItems.slice(1)
      ]
    }
    return (
      <nav
        {...baseProps}
        className={clsx(
          styles['breadcrumb-group'],
          isMobile && styles.mobile,
          items.length <= 2 && styles['mobile-short'],
          baseProps.className
        )}
        aria-label={ariaLabel || void 0}
        ref={__internalRootRef}>
        <ol className={styles['breadcrumb-group-list']}>{breadcrumbItems}</ol>
      </nav>
    )
  }
)

const createWidgetizedBreadcrumbGroup = createWidgetizedComponent(
  BreadcrumbGroupImplementation
)

export {
  BreadcrumbGroupImplementation,
  createWidgetizedBreadcrumbGroup
}
