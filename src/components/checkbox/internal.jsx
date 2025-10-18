import {useEffect, useRef, forwardRef, memo} from 'react'
import clsx from 'clsx'
import useForwardFocus from '../internal/hooks/forward-focus'
import {getBaseProps} from '../internal/base-component'
import AbstractSwitch from '../internal/components/abstract-switch'
import styles from './styles.css.js'
import CheckboxIcon from '../internal/components/checkbox-icon'
import {useFormFieldContext} from '../internal/context/form-field-context'
import {useSingleTabStopNavigation} from '../internal/context/single-tab-stop-navigation-context'

const InternalCheckbox = memo(
  forwardRef(
    (
      {
        controlId,
        name,
        value,
        checked,
        setChecked,
        disabled,
        ariaRequired,
        children,
        description,
        ariaLabel,
        onFocus,
        onBlur,
        onChange,
        tabIndex: explicitTabIndex,
        showOutline,
        ariaControls,
        __internalRootRef,
        ...rest
      },
      ref
    ) => {
      const {ariaDescribedby, ariaLabelledby} = useFormFieldContext(rest)
      const baseProps = getBaseProps(rest)
      const checkboxRef = useRef(null)
      useForwardFocus(ref, checkboxRef)
      const {tabIndex} = useSingleTabStopNavigation(checkboxRef, {
        tabIndex: explicitTabIndex
      })
      return (
        <AbstractSwitch
          {...baseProps}
          className={clsx(styles.root, baseProps.className)}
          controlClassName={styles['checkbox-control']}
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
          showOutline={showOutline}
          nativeControl={nativeControlProps => (
            <input
              {...nativeControlProps}
              ref={checkboxRef}
              type='checkbox'
              defaultChecked={checked}
              name={name}
              value={value}
              aria-required={ariaRequired ? 'true' : void 0}
              tabIndex={tabIndex}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={() => {}}
            />
          )}
          onClick={() => {
            setChecked?.(!checked)
            checkboxRef.current?.focus()
            if (!!onChange) {
              onChange({name, value, checked: !checked})
            }
          }}
          styledControl={
            <CheckboxIcon checked={checked} disabled={disabled} />
          }
          __internalRootRef={__internalRootRef}
        />
      )
    }
  )
)

export {
  InternalCheckbox as default
}
