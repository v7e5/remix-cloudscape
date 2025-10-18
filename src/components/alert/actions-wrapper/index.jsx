import {memo} from 'react'
import clsx from 'clsx'
import styles from './styles.css.js'

const ActionsWrapper = memo(
  ({className, testUtilClasses, action, discoveredActions}) => {
    if (!action && discoveredActions.length === 0) {
      return null
    }
    return (
      <div className={clsx(styles.root, className)}>
        <div className={testUtilClasses.actionSlot}>{action}</div>
        {discoveredActions}
      </div>
    )
  }
)

export {
  ActionsWrapper
}
