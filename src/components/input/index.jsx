import {useImperativeHandle, useRef, forwardRef, memo} from 'react'
import clsx from 'clsx'
import {getBaseProps} from '../internal/base-component'
import InternalInput from './internal'
import styles from './styles.css.js'
import useBaseComponent from '../internal/hooks/use-base-component'

const Input = memo(
  forwardRef(
    (
      {
        value,
        defaultValue,
        type = 'text',
        step,
        inputMode,
        autoComplete = false,
        spellcheck,
        disabled,
        readOnly,
        disableBrowserAutocorrect = true,
        onKeyDown,
        onKeyUp,
        onChange,
        onBlur,
        onFocus,
        ariaRequired,
        name,
        placeholder,
        autoFocus,
        ariaLabel,
        ariaLabelledby,
        ariaDescribedby,
        invalid,
        warning,
        controlId,
        clearAriaLabel,
        ...rest
      },
      ref
    ) => {
      const baseComponentProps = useBaseComponent('Input')
      const baseProps = getBaseProps(rest)
      const inputRef = useRef(null)
      useImperativeHandle(
        ref,
        () => ({
          focus(...args) {
            inputRef.current?.focus(...args)
          },
          select() {
            inputRef.current?.select()
          }
        }),
        [inputRef]
      )
      return (
        <InternalInput
          ref={inputRef}
          {...{
            ...baseProps,
            ...baseComponentProps,
            autoComplete,
            ariaLabel,
            ariaRequired,
            autoFocus,
            disabled,
            disableBrowserAutocorrect,
            name,
            onKeyDown,
            onKeyUp,
            onChange,
            onBlur,
            onFocus,
            placeholder,
            readOnly,
            type,
            step,
            inputMode,
            spellcheck,
            value,
            defaultValue,
            ariaDescribedby,
            ariaLabelledby,
            invalid,
            warning,
            controlId,
            clearAriaLabel
          }}
          className={clsx(styles.root, baseProps.className)}
          __inheritFormFieldProps={true}
        />
      )
    }
  )
)

export {
  Input as default
}
