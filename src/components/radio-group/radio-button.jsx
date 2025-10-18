import {useRef, forwardRef, memo} from 'react'
import clsx from 'clsx'
import AbstractSwitch from '../internal/components/abstract-switch'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'
import styles from './styles.css.js'
import {useSingleTabStopNavigation} from '../internal/context/single-tab-stop-navigation-context'

const RadioButton = memo(
  forwardRef(
    (
      {
        name,
        label,
        value,
        setValue,
        checked,
        description,
        disabled,
        controlId,
        onChange
      },
      ref
    ) => {
      const radioButtonRef = useRef(null)
      const mergedRefs = useMergeRefs(radioButtonRef, ref)
      const {tabIndex} = useSingleTabStopNavigation(radioButtonRef)
      return (
        <AbstractSwitch
          className={clsx(
            styles.radio,
            description && styles['radio--has-description']
          )}
          controlClassName={styles['radio-control']}
          outlineClassName={styles.outline}
          label={label}
          description={description}
          disabled={disabled}
          controlId={controlId}
          nativeControl={nativeControlProps => (
            <input
              {...nativeControlProps}
              tabIndex={tabIndex}
              type='radio'
              ref={mergedRefs}
              name={name}
              value={value}
              checked={checked}
              onClick={ev => {
                ev.stopPropagation()
                if (checked) {
                  return
                }
                setValue?.(value)
                onChange?.({value})
              }}
              onChange={() => {}}
            />
          )}
          onClick={ev => {
            ev.stopPropagation()
            if (checked) {
              return
            }
            if (ev.target !== radioButtonRef.current) {
              radioButtonRef.current.click()
            }
          }}
          styledControl={
            <svg viewBox='0 0 100 100' focusable='false' aria-hidden='true'>
              <circle
                className={clsx(styles['styled-circle-border'], {
                  [styles['styled-circle-disabled']]: disabled
                })}
                strokeWidth={12}
                cx={50}
                cy={50}
                r={44}
              />
              <circle
                className={clsx(styles['styled-circle-fill'], {
                  [styles['styled-circle-disabled']]: disabled,
                  [styles['styled-circle-checked']]: checked
                })}
                strokeWidth={30}
                cx={50}
                cy={50}
                r={35}
              />
            </svg>
          }
        />
      )
    }
  )
)

export {
  RadioButton as default
}
