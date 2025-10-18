import clsx from 'clsx'
import {memo, useEffect, useRef} from 'react'
import {Link, useSubmit} from 'react-router'
import InternalIcon from '../../icon/internal'
import {useDropdownContext} from '../../internal/components/dropdown/context'
import Tooltip from '../tooltip'
import {getMenuItemCheckboxProps, getMenuItemProps} from '../utils/menu-item'
import useHiddenDescription from '../utils/use-hidden-description'
import styles from './styles.css.js'

const ItemElement = memo(
  ({
    item,
    disabled,
    onItemActivate,
    highlighted,
    highlightItem,
    showDivider,
    hasCategoryHeader,
    isKeyboardHighlighted = false,
    variant = 'normal'
  }) => {
    const submit = useSubmit()

    const onClick = event => {
      event.stopPropagation()

      if (!item.to) {
        event.preventDefault()
      }

      if (!!item.action) {
        submit(null, {
          method: 'POST',
          action: item.action
        })
      }

      if (!disabled) {
        onItemActivate(item, event)
      }
    }

    const onHover = () => {
      highlightItem(item)
    }
    return (
      <li
        className={clsx(styles['item-element'], styles[`variant-${variant}`], {
          [styles.highlighted]: highlighted,
          [styles.disabled]: disabled,
          [styles['has-category-header']]: hasCategoryHeader,
          [styles['has-checkmark']]: item.itemType === 'checkbox',
          [styles['show-divider']]: showDivider,
          [styles['is-focused']]: isKeyboardHighlighted
        })}
        role='presentation'
        data-testid={item.id}
        data-description={item.description}
        onClick={onClick}
        onMouseEnter={onHover}
        onTouchStart={onHover}>
        <MenuItem item={item} disabled={disabled} highlighted={highlighted} />
      </li>
    )
  }
)
const MenuItem = memo(({item, disabled, highlighted}) => {
  const menuItemRef = useRef(null)
  useEffect(() => {
    if (highlighted && menuItemRef.current) {
      menuItemRef.current.focus()
    }
  }, [highlighted])
  const isDisabledWithReason = disabled && item.disabledReason
  const {targetProps, descriptionEl} = useHiddenDescription(
    item.disabledReason
  )
  const menuItemProps = {
    className: styles['menu-item'],
    lang: item.lang,
    ref: menuItemRef,

    tabIndex: highlighted ? 0 : -1,
    ...(item.itemType === 'checkbox'
      ? getMenuItemCheckboxProps({disabled, checked: item.checked})
      : getMenuItemProps({disabled})),
    ...(isDisabledWithReason ? targetProps : {})
  }

  const menuItem = !!item.to ? (
    <Link
      {...menuItemProps}
      to={!disabled ? item.to : void 0}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : void 0}>
      <MenuItemContent item={item} disabled={disabled} />
    </Link>
  ) : (
    <span {...menuItemProps}>
      <MenuItemContent item={item} disabled={disabled} />
    </span>
  )

  const {position} = useDropdownContext()
  const tooltipPosition =
    position === 'bottom-left' || position === 'top-left' ? 'left' : 'right'
  return isDisabledWithReason ? (
    <Tooltip content={item.disabledReason} position={tooltipPosition}>
      {menuItem}
      {descriptionEl}
    </Tooltip>
  ) : (
    menuItem
  )
})

const MenuItemContent = memo(({item, disabled}) => {
  const hasIcon = !!(item.iconName || item.iconUrl || item.iconSvg)
  const hasExternal = !!item.to && item.external

  return (
    <>
      {item.itemType === 'checkbox' && (
        <MenuItemCheckmark checked={item.checked} disabled={disabled} />
      )}
      {hasIcon && (
        <MenuItemIcon
          name={item.iconName}
          url={item.iconUrl}
          svg={item.iconSvg}
          alt={item.iconAlt}
          badge={item.badge}
        />
      )}
      {item.text}
      {hasExternal && (
        <ExternalIcon
          disabled={disabled}
          ariaLabel={item.externalIconAriaLabel}
        />
      )}
    </>
  )
})
const MenuItemIcon = memo(props => (
  <span className={styles.icon}>
    <InternalIcon {...props} />
  </span>
))
const MenuItemCheckmark = memo(({disabled, checked}) => {
  const checkmark = (
    <InternalIcon variant={disabled ? 'disabled' : 'normal'} name='check' />
  )
  return (
    <span
      className={clsx(styles.icon, styles.checkmark, {
        [styles.disabled]: disabled
      })}
      aria-hidden='true'
      style={{visibility: checked ? 'visible' : 'hidden'}}>
      {checkmark}
    </span>
  )
})
const ExternalIcon = memo(({disabled, ariaLabel}) => {
  const icon = (
    <InternalIcon variant={disabled ? 'disabled' : 'normal'} name='external' />
  )
  return (
    <span
      className={styles['external-icon']}
      role={ariaLabel ? 'img' : void 0}
      aria-label={ariaLabel}>
      {icon}
    </span>
  )
})

export {
  ItemElement as default
}
