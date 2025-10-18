import {useContext, memo} from 'react'
import clsx from 'clsx'
import {getBaseProps} from '../internal/base-component'
import {StickyHeaderContext} from '../container/use-sticky-header'
import styles from './styles.css.js'
import {useMobile} from '../internal/hooks/use-mobile'
import {InfoLinkLabelContext} from '../internal/context/info-link-label-context'
import {CollectionLabelContext} from '../internal/context/collection-label-context'
import {useUniqueId} from '../internal/hooks/use-unique-id'
import {useContainerHeader} from '../internal/context/container-header'

const InternalHeader = memo(
  ({
    variant,
    headingTagOverride,
    children,
    actions,
    counter,
    description,
    info,
    __internalRootRef = null,
    __disableActionsWrapping,
    ...restProps
  }) => {
    const isMobile = useMobile()
    const HeadingTag =
      headingTagOverride ?? (variant === 'awsui-h1-sticky' ? 'h1' : variant)
    const {isStuck} = useContext(StickyHeaderContext)
    const baseProps = getBaseProps(restProps)
    const assignHeaderId = useContext(CollectionLabelContext).assignId
    const isInContainer = useContainerHeader()
    const headingId = useUniqueId('heading')
    if (assignHeaderId !== void 0) {
      assignHeaderId(headingId)
    }
    const dynamicVariant = !isMobile && isStuck ? 'h2' : 'h1'
    const variantOverride =
      variant === 'awsui-h1-sticky' ? dynamicVariant : variant
    return (
      <div
        {...baseProps}
        className={clsx(
          styles.root,
          baseProps.className,
          styles[`root-variant-${variantOverride}`],
          styles.refresh,
          !actions && [styles[`root-no-actions`]],
          description && [styles[`root-has-description`]]
        )}
        ref={__internalRootRef}>
        <div
          className={clsx(
            styles.main,
            styles[`main-variant-${variantOverride}`],
            styles.refresh,
            __disableActionsWrapping && [styles['no-wrap']]
          )}>
          <div
            className={clsx(
              styles.title,
              styles[`title-variant-${variantOverride}`],
              styles.refresh
            )}>
            <HeadingTag
              id={restProps?.id}
              className={clsx(
                styles.heading,
                styles[`heading-variant-${variantOverride}`]
              )}>
              <span
                className={clsx(
                  styles['heading-text'],
                  styles[`heading-text-variant-${variantOverride}`]
                )}
                id={headingId}>
                {children}
              </span>
              {counter !== void 0 && (
                <span className={styles.counter}> {counter}</span>
              )}
            </HeadingTag>
            {info && (
              <InfoLinkLabelContext.Provider value={headingId}>
                {}
                <span className={styles['virtual-space']}> &nbsp;</span>
                <span className={styles.info}>{info}</span>
              </InfoLinkLabelContext.Provider>
            )}
          </div>
          {actions && (
            <div
              className={clsx(
                styles.actions,
                styles[`actions-variant-${variantOverride}`],
                styles.refresh,
                !__disableActionsWrapping && [styles['actions-centered']]
              )}>
              {actions}
            </div>
          )}
        </div>
        <Description variantOverride={variantOverride}>
          {description}
        </Description>
      </div>
    )
  }
)

const Description = memo(({children, variantOverride}) => {
  return (
    (children && (
      <p
        className={clsx(
          styles.description,
          styles[`description-variant-${variantOverride}`],
          styles.refresh
        )}>
        {children}
      </p>
    )) ||
    null
  )
})

export {
  Description,
  InternalHeader as default
}
