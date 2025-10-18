import clsx from 'clsx'
import {forwardRef, memo, useRef} from 'react'
import {Link} from 'react-router'
import {useButtonContext} from '../internal/context/button-context'
import {useSingleTabStopNavigation} from '../internal/context/single-tab-stop-navigation-context'
import useForwardFocus from '../internal/hooks/forward-focus'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'
import {useUniqueId} from '../internal/hooks/use-unique-id'
import {LeftIcon, RightIcon} from './icon-helper'
import styles from './styles.css.js'

const InternalButton = memo(
  forwardRef(
    (
      {
        children,
        iconName,
        __iconClass,
        onClick,
        iconAlign = 'left',
        iconUrl,
        iconSvg,
        iconAlt,
        variant = 'normal',
        loading = false,
        loadingText,
        disabled = false,
        wrapText = true,
        to,
        target,
        rel,
        download,
        formAction = 'submit',
        ariaLabel,
        ariaDescribedby,
        ariaExpanded,
        ariaControls,
        fullWidth,
        badge,
        __nativeAttributes,
        __internalRootRef = null,
        __focusable = false,
        name,
        ...props
      },
      ref
    ) => {
      const isAnchor = Boolean(to)
      const isNotInteractive = loading || disabled
      const hasAriaDisabled =
        (loading && !disabled) || (disabled && __focusable)
      const shouldHaveContent =
        children &&
        ['icon', 'inline-icon', 'flashbar-icon', 'modal-dismiss'].indexOf(
          variant
        ) === -1
      const buttonRef = useRef(null)
      useForwardFocus(ref, buttonRef)
      const buttonContext = useButtonContext()
      const uniqueId = useUniqueId('button')

      const buttonClass = clsx(
        props.className,
        styles.button,
        styles[`variant-${variant}`],
        {
          [styles.disabled]: isNotInteractive,
          [styles['button-no-wrap']]: !wrapText,
          [styles['button-no-text']]: !shouldHaveContent,
          [styles['full-width']]: shouldHaveContent && fullWidth
        }
      )
      const explicitTabIndex =
        __nativeAttributes && 'tabIndex' in __nativeAttributes
          ? __nativeAttributes.tabIndex
          : void 0
      const {tabIndex} = useSingleTabStopNavigation(buttonRef, {
        tabIndex: isAnchor && isNotInteractive ? -1 : explicitTabIndex
      })
      const buttonProps = {
        ...props,
        ...__nativeAttributes,
        tabIndex,

        ref: useMergeRefs(buttonRef, __internalRootRef),
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedby,
        'aria-expanded': ariaExpanded,
        'aria-controls': ariaControls,

        title: ariaLabel,
        className: buttonClass,
        onClick,
        name
      }
      const iconProps = {
        loading,
        iconName,
        iconAlign,
        iconUrl,
        iconSvg,
        iconAlt,
        variant,
        badge,
        iconClass: __iconClass,
        iconSize: variant === 'modal-dismiss' ? 'medium' : 'normal'
      }
      const buttonContent = (
        <>
          <LeftIcon {...iconProps} />
          {shouldHaveContent && (
            <span className={styles.content}>{children}</span>
          )}
          <RightIcon {...iconProps} />
        </>
      )
      if (isAnchor) {
        return (
          <Link
            {...buttonProps}
            to={to}
            target={target}
            rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : void 0)}
            aria-disabled={isNotInteractive ? true : void 0}
            download={download}>
            {buttonContent}
          </Link>
        )
      }
      return (
        <button
          {...buttonProps}
          type={formAction === 'none' ? 'button' : 'submit'}
          disabled={disabled && !__focusable}
          aria-disabled={hasAriaDisabled ? true : void 0}>
          {buttonContent}
        </button>
      )
    }
  )
)

export {
  InternalButton,
  InternalButton as default
}
