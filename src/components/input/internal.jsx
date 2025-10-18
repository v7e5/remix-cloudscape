import {useRef, forwardRef, memo} from 'react'
import clsx from 'clsx'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'
import InternalIcon from '../icon/internal'
import InternalButton from '../button/internal'
import {getBaseProps} from '../internal/base-component'
import {useSearchProps, convertAutoComplete} from './utils'
import {useDebounceCallback} from '../internal/hooks/use-debounce-callback'
import {useFormFieldContext} from '../internal/context/form-field-context'
import styles from './styles.css.js'
import {useInternalI18n} from '../i18n/context'

const InternalInput = memo(
  forwardRef(
    (
      {
        type = 'text',
        step,
        inputMode,
        autoComplete = false,
        ariaLabel,
        clearAriaLabel: clearAriaLabelOverride,
        name,
        value,
        defaultValue,
        placeholder,
        autoFocus,
        disabled,
        readOnly,
        disableBrowserAutocorrect,
        spellcheck,
        __noBorderRadius,
        __leftIcon,
        __leftIconVariant = 'subtle',
        __onLeftIconClick,
        ariaRequired,
        onKeyDown,
        onKeyUp,
        onChange,
        __onDelayedInput,
        __onBlurWithDetail,
        onBlur,
        onFocus,
        __nativeAttributes,
        __internalRootRef,
        __inheritFormFieldProps,
        ...rest
      },
      ref
    ) => {
      const baseProps = getBaseProps(rest)
      const i18n = useInternalI18n('input')
      const inputRef = useRef(null)

      const fireDelayedInput = useDebounceCallback(
        (...a) => __onDelayedInput(...a),
        200
      )

      const handleChange = (...a) => {
        if (__onDelayedInput !== undefined) {
          fireDelayedInput(...a)
        }

        onChange?.(...a)
      }

      const searchProps = useSearchProps(
        type,
        disabled,
        readOnly,
        defaultValue ?? value,
        inputRef,
        handleChange
      )

      __leftIcon = __leftIcon ?? searchProps.__leftIcon
      const formFieldContext = useFormFieldContext(rest)
      const {ariaLabelledby, ariaDescribedby, controlId, invalid, warning} =
        __inheritFormFieldProps ? formFieldContext : rest
      const attributes = {
        'aria-label': ariaLabel,

        'aria-labelledby':
          ariaLabel && !rest.ariaLabelledby ? void 0 : ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        name,
        placeholder,
        autoFocus,
        id: controlId,
        className: clsx(
          styles.input,
          type && styles[`input-type-${type}`],
          __leftIcon && styles['input-has-icon-left'],
          __noBorderRadius && styles['input-has-no-border-radius'],
          {
            [styles['input-readonly']]: readOnly,
            [styles['input-invalid']]: invalid,
            [styles['input-warning']]: warning && !invalid
          }
        ),
        autoComplete: convertAutoComplete(autoComplete),
        disabled,
        readOnly,
        type,
        step,
        inputMode,
        spellCheck: spellcheck,
        onKeyDown,
        onKeyUp,
        onChange: handleChange,
        onBlur,
        onFocus,
        ...__nativeAttributes
      }
      if (type === 'number') {
        attributes.onWheel = event => event.currentTarget.blur()
      }
      if (disableBrowserAutocorrect) {
        attributes.autoCorrect = 'off'
        attributes.autoCapitalize = 'off'
      }
      if (ariaRequired) {
        attributes['aria-required'] = 'true'
      }
      if (invalid) {
        attributes['aria-invalid'] = 'true'
      }
      const mergedRef = useMergeRefs(ref, inputRef)
      if (attributes.type === 'visualSearch') {
        attributes.type = 'text'
      }

      if (defaultValue !== undefined) {
        attributes.defaultValue = defaultValue
      } else if (value !== undefined) {
        attributes.value = value
      }

      return (
        <div
          {...baseProps}
          className={clsx(baseProps.className, styles['input-container'])}
          ref={__internalRootRef}
          dir={type === 'email' ? 'ltr' : void 0}>
          {__leftIcon && (
            <span
              onClick={__onLeftIconClick}
              className={styles['input-icon-left']}>
              <InternalIcon
                name={__leftIcon}
                variant={disabled || readOnly ? 'disabled' : __leftIconVariant}
              />
            </span>
          )}
          <input ref={mergedRef} {...attributes} />
        </div>
      )
    }
  )
)

export {
  InternalInput as default
}
