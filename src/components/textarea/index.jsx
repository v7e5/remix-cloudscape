import {useRef, forwardRef, memo} from 'react'
import {getBaseProps} from '../internal/base-component'
import {useFormFieldContext} from '../internal/context/form-field-context'
import useForwardFocus from '../internal/hooks/forward-focus'
import clsx from 'clsx'
import styles from './styles.css.js'
import useBaseComponent from '../internal/hooks/use-base-component'
import {convertAutoComplete} from '../input/utils'

const Textarea = memo(
  forwardRef(
    (
      {
        value,
        defaultValue,
        autoComplete = false,
        disabled,
        readOnly,
        disableBrowserAutocorrect = true,
        disableBrowserSpellcheck = true,
        spellcheck,
        onKeyDown,
        onKeyUp,
        onChange,
        onBlur,
        onFocus,
        ariaRequired,
        name,
        rows,
        placeholder,
        autoFocus,
        ariaLabel,
        ...rest
      },
      ref
    ) => {
      const {__internalRootRef} = useBaseComponent('Textarea')
      const {ariaLabelledby, ariaDescribedby, controlId, invalid, warning} =
        useFormFieldContext(rest)
      const baseProps = getBaseProps(rest)
      const textareaRef = useRef(null)
      useForwardFocus(ref, textareaRef)
      const attributes = {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        'aria-required': ariaRequired ? 'true' : void 0,
        'aria-invalid': invalid ? 'true' : void 0,
        name,
        placeholder,
        autoFocus,
        className: clsx(styles.textarea, {
          [styles['textarea-readonly']]: readOnly,
          [styles['textarea-invalid']]: invalid,
          [styles['textarea-warning']]: warning && !invalid
        }),
        autoComplete: convertAutoComplete(autoComplete),
        spellCheck: spellcheck,
        disabled,
        readOnly: readOnly ? true : void 0,
        rows: rows || 3,
        onKeyDown,
        onKeyUp,
        onChange,
        onBlur,
        onFocus
      }
      if (disableBrowserAutocorrect) {
        attributes.autoCorrect = 'off'
        attributes.autoCapitalize = 'off'
      }
      if (disableBrowserSpellcheck) {
        attributes.spellCheck = 'false'
      }

      if (defaultValue !== undefined) {
        attributes.defaultValue = defaultValue
      } else if (value !== undefined) {
        attributes.value = value
      }

      return (
        <span
          {...baseProps}
          className={clsx(styles.root, baseProps.className)}
          ref={__internalRootRef}>
          <textarea ref={textareaRef} id={controlId} {...attributes} />
        </span>
      )
    }
  )
)

export {
  Textarea as default
}
