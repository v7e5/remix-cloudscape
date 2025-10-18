import {memo} from 'react'
import clsx from 'clsx'
import styles from './styles.css.js'

const Arrow = memo(props => {
  return (
    <div
      className={clsx(
        styles.arrow,
        props.position && styles[`arrow-position-${props.position}`]
      )}>
      <div className={styles['arrow-outer']} />
      <div className={clsx(styles['arrow-inner'], styles.refresh)} />
    </div>
  )
})

export {
  Arrow as default
}
