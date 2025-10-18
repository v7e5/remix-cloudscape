import {memo} from 'react'
import clsx from 'clsx'
import InternalButton from '../button/internal'
import {useSplitPanelContext} from '../internal/context/split-panel-context'
import styles from './styles.css.js'
import testUtilStyles from './test-classes/styles.css.js'

const SplitPanelContentSide = memo(
  ({
    style,
    baseProps,
    splitPanelRef,
    toggleRef,
    header,
    children,
    resizeHandle,
    isOpen,
    cappedSize,
    openButtonAriaLabel,
    panelHeaderId,
    onToggle
  }) => {
    const {topOffset, bottomOffset} = useSplitPanelContext()
    return (
      <div
        {...baseProps}
        className={clsx(
          baseProps.className,
          styles.drawer,
          styles['position-side'],
          testUtilStyles.root,
          {
            [testUtilStyles['open-position-side']]: isOpen,
            [styles['drawer-closed']]: !isOpen
          }
        )}
        style={{
          width: isOpen ? cappedSize : void 0,
          maxWidth: '100%',
          ...style
        }}
        ref={splitPanelRef}>
        <div
          className={clsx(styles['drawer-content-side'])}
          style={{
            top: topOffset,
            bottom: bottomOffset
          }}
          onClick={() => !isOpen && onToggle()}
          aria-labelledby={panelHeaderId}
          role='region'>
          {isOpen ? (
            <div className={styles['slider-wrapper-side']}>{resizeHandle}</div>
          ) : (
            <InternalButton
              className={clsx(
                testUtilStyles['open-button'],
                styles['open-button-side']
              )}
              iconName='angle-left'
              variant='icon'
              formAction='none'
              ariaLabel={openButtonAriaLabel}
              ariaExpanded={isOpen}
              ref={null}
            />
          )}
          <div className={styles['content-side']} aria-hidden={!isOpen}>
            <div className={clsx(styles['pane-header-wrapper-side'])}>
              {header}
            </div>
            <div className={clsx(styles['pane-content-wrapper-side'])}>
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export {
  SplitPanelContentSide
}
