import {memo} from 'react'
import clsx from 'clsx'
import {getBaseProps} from '../internal/base-component'
import InternalAlert from '../alert/internal'
import InternalBox from '../box/internal'
import styles from './styles.css.js'
import {useInternalI18n} from '../i18n/context'

const InternalForm = memo(
  ({
    children,
    header,
    errorText,
    errorIconAriaLabel: errorIconAriaLabelOverride,
    actions,
    secondaryActions,
    __internalRootRef,
    ...props
  }) => {
    const baseProps = getBaseProps(props)
    const i18n = useInternalI18n('form')
    const errorIconAriaLabel = i18n(
      'errorIconAriaLabel',
      errorIconAriaLabelOverride
    )
    return (
      <div
        {...baseProps}
        ref={__internalRootRef}
        className={clsx(styles.root, baseProps.className)}>
        {header && <div className={styles.header}>{header}</div>}
        {children && <div className={styles.content}>{children}</div>}
        {errorText && (
          <InternalBox margin={{top: 'l'}}>
            <InternalAlert
              type='error'
              statusIconAriaLabel={errorIconAriaLabel}>
              <div className={styles.error}>
                {Array.isArray(errorText) ? (
                  <ul>
                    {errorText.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                ) : (
                  errorText
                )}
              </div>
            </InternalAlert>
          </InternalBox>
        )}
        {(actions || secondaryActions) && (
          <div className={styles.footer}>
            <div className={styles['actions-section']}>
              {actions && <div className={styles.actions}>{actions}</div>}
              {secondaryActions && (
                <div className={styles['secondary-actions']}>
                  {secondaryActions}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)

export {
  InternalForm as default
}
