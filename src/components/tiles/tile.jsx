import {useRef, forwardRef, memo} from 'react'
import clsx from 'clsx'
import RadioButton from '../radio-group/radio-button'
import styles from './styles.css.js'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'

const Tile = memo(
  forwardRef(
    ({item, selected, name, setValue, breakpoint, onChange}, forwardedRef) => {
      const internalRef = useRef(null)
      const mergedRef = useMergeRefs(internalRef, forwardedRef)
      return (
        <div
          className={clsx(
            styles['tile-container'],
            {[styles['has-metadata']]: item.description || item.image},
            {[styles.selected]: selected},
            {[styles.disabled]: !!item.disabled},
            {[styles.refresh]: true},
            styles[`breakpoint-${breakpoint}`]
          )}
          data-value={item.value}
          onClick={ev => {
            if (selected || item.disabled) {
              return
            }
            internalRef.current?.click()
          }}>
          <div
            className={clsx(styles.control, {
              [styles['no-image']]: !item.image
            })}>
            <RadioButton
              checked={selected}
              ref={mergedRef}
              name={name}
              value={item.value}
              setValue={setValue}
              label={item.label}
              description={item.description}
              disabled={item.disabled}
              controlId={item.controlId}
              onChange={onChange}
            />
          </div>
          {item.image && (
            <div
              className={clsx(styles.image, {
                [styles.disabled]: !!item.disabled
              })}>
              {item.image}
            </div>
          )}
        </div>
      )
    }
  )
)

export {
  Tile
}
