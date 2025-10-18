import {useRef, forwardRef, memo} from 'react'
import clsx from 'clsx'
import AbstractSwitch from '../internal/components/abstract-switch'
import useForwardFocus from '../internal/hooks/forward-focus'
import {getBaseProps} from '../internal/base-component'
import styles from './styles.css.js'
import {useFormFieldContext} from '../internal/context/form-field-context'

const InternalToggle = memo(
  forwardRef(
    (
      {
        controlId,
        checked,
        setChecked,
        name,
        value,
        disabled,
        children,
        description,
        ariaLabel,
        ariaControls,
        onFocus,
        onBlur,
        onChange,
        __internalRootRef = null,
        ...rest
      },
      ref
    ) => {
      const {ariaDescribedby, ariaLabelledby} = useFormFieldContext(rest)
      const baseProps = getBaseProps(rest)
      const checkboxRef = useRef(null)
      useForwardFocus(ref, checkboxRef)
      return (
        <AbstractSwitch
          {...baseProps}
          className={clsx(styles.root, baseProps.className)}
          controlClassName={clsx(styles['toggle-control'], {
            [styles['toggle-control-checked']]: checked,
            [styles['toggle-control-disabled']]: disabled
          })}
          outlineClassName={styles.outline}
          controlId={controlId}
          disabled={disabled}
          label={children}
          description={description}
          descriptionBottomPadding={true}
          ariaLabel={ariaLabel}
          ariaLabelledby={ariaLabelledby}
          ariaDescribedby={ariaDescribedby}
          ariaControls={ariaControls}
          nativeControl={nativeControlProps => (
            <input
              {...nativeControlProps}
              ref={checkboxRef}
              type='checkbox'
              checked={checked}
              name={name}
              value={value}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={() => {}}
            />
          )}
          onClick={() => {
            setChecked(!checked)
            checkboxRef.current?.focus()
            if (!!onChange) {
              onChange({name, value, checked: !checked})
            }
          }}
          styledControl={
            <span
              className={clsx(styles['toggle-handle'], {
                [styles['toggle-handle-checked']]: checked,
                [styles['toggle-handle-disabled']]: disabled
              })}
            />
          }
          __internalRootRef={__internalRootRef}
        />
      )
    }
  )
)

export {
  InternalToggle as default
}
