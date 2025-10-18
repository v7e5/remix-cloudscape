import {memo} from 'react'
import clsx from 'clsx'
import {getBaseProps} from '../../base-component'
import styles from './styles.css.js'

const dimensionsByTheme = {
  default: {
    viewBox: '0 0 14 14',
    checked: '2.5,7 6,10 11,3',
    xy: 0.5,
    r: 1.5,
    size: 13
  },
  refresh: {
    viewBox: '0 0 16 16',
    checked: '3.5,8 7,11 12,4',
    xy: 1,
    r: 2,
    size: 14
  }
}
const CheckboxIcon = memo(({checked, disabled = false, ...restProps}) => {
  const baseProps = getBaseProps(restProps)
  const dimensions = dimensionsByTheme['refresh']
  return (
    <svg
      className={styles.root}
      viewBox={dimensions.viewBox}
      aria-hidden='true'
      focusable='false'
      {...baseProps}>
      <rect
        className={clsx(styles['styled-box'], {
          [styles['styled-box-checked']]: checked,
          [styles['styled-box-disabled']]: disabled
        })}
        x={dimensions.xy}
        y={dimensions.xy}
        rx={dimensions.r}
        ry={dimensions.r}
        width={dimensions.size}
        height={dimensions.size}
      />
      {checked ? (
        <polyline
          className={clsx(styles['styled-line'], {
            [styles['styled-line-disabled']]: disabled
          })}
          points={dimensions.checked}
        />
      ) : null}
    </svg>
  )
})

export {
  CheckboxIcon as default,
  dimensionsByTheme
}
