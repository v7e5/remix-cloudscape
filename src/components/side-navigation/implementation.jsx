import {memo} from 'react'
import clsx from 'clsx'
import {getBaseProps} from '../internal/base-component'
import {Header, NavigationItemsList} from './parts'
import styles from './styles.css.js'
import {createWidgetizedComponent} from '../internal/widgets'

const SideNavigationImplementation = memo(
  ({header, activeHref, items = [], __internalRootRef, ...props}) => {
    const baseProps = getBaseProps(props)

    return (
      <div
        {...baseProps}
        className={clsx(styles.root, baseProps.className)}
        ref={__internalRootRef}>
        {header && <Header definition={header} activeHref={activeHref} />}
        {items && (
          <div className={styles['list-container']}>
            <NavigationItemsList
              variant='root'
              items={items}
              activeHref={activeHref}
            />
          </div>
        )}
      </div>
    )
  }
)

const createWidgetizedSideNavigation = createWidgetizedComponent(
  SideNavigationImplementation
)

export {
  SideNavigationImplementation,
  createWidgetizedSideNavigation
}
