import {useRef, useState, forwardRef, memo} from 'react'
import {FileOption} from './file-option'
import InternalSpaceBetween from '../space-between/internal'
import styles from './styles.css.js'
import {getBaseProps} from '../internal/base-component'
import clsx from 'clsx'
import {Dropzone, useDropzoneVisible} from './dropzone'
import FileInput from './file-input'
import TokenList from '../internal/components/token-list'
import {Token} from '../token-group/token'
import {
  ConstraintText,
  FormFieldError,
  FormFieldWarning
} from '../form-field/internal'
import {useUniqueId} from '../internal/hooks/use-unique-id'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'
import {joinStrings} from '../internal/utils/strings'
import {useFormFieldContext} from '../internal/context/form-field-context'
import InternalBox from '../box/internal'

const InternalFileUpload = memo(
  forwardRef(
    (
      {
        accept,
        ariaRequired,
        multiple = false,
        onChange,
        value,
        tokenLimit,
        showFileSize,
        showFileLastModified,
        showFileThumbnail,
        i18nStrings,
        __internalRootRef = null,
        constraintText,
        errorText,
        warningText,
        fileErrors,
        fileWarnings,
        ...restProps
      },
      externalRef
    ) => {
      const baseProps = getBaseProps(restProps)
      const metadata = {
        showFileSize,
        showFileLastModified,
        showFileThumbnail
      }
      const errorId = useUniqueId('error-')
      const warningId = useUniqueId('warning-')
      const constraintTextId = useUniqueId('constraint-text-')
      const fileInputRef = useRef(null)
      const ref = useMergeRefs(fileInputRef, externalRef)
      const [removedFileIndex, setRemovedFileIndex] = useState(null)
      const handleFilesChange = newFiles => {
        const newValue = multiple
          ? [...value, ...newFiles]
          : newFiles[0]
            ? newFiles
            : [...value]

        onChange({value: newValue})
      }
      const onFileRemove = removeFileIndex => {
        const newValue = value.filter(
          (_, fileIndex) => fileIndex !== removeFileIndex
        )
        onChange({value: newValue})
        setRemovedFileIndex(removeFileIndex)
        if (value.length === 1) {
          fileInputRef.current?.focus()
        }
      }
      const isDropzoneVisible = useDropzoneVisible(multiple)
      const showWarning = warningText && !errorText
      const formFieldContext = useFormFieldContext(restProps)
      const ariaDescribedBy = joinStrings(
        restProps.ariaDescribedby ?? formFieldContext.ariaDescribedby,
        errorText ? errorId : void 0,
        showWarning ? warningId : void 0,
        constraintText ? constraintTextId : void 0
      )
      const hasError = Boolean(errorText || fileErrors?.filter(Boolean).length)
      const invalid = restProps.invalid || formFieldContext.invalid || hasError
      return (
        <InternalSpaceBetween
          {...baseProps}
          size='xs'
          className={clsx(baseProps.className, styles.root)}
          __internalRootRef={__internalRootRef}>
          <InternalBox>
            {isDropzoneVisible ? (
              <Dropzone onChange={handleFilesChange}>
                {i18nStrings.dropzoneText(multiple)}
              </Dropzone>
            ) : (
              <FileInput
                ref={ref}
                accept={accept}
                ariaRequired={ariaRequired}
                multiple={multiple}
                onChange={handleFilesChange}
                value={value}
                {...restProps}
                ariaDescribedby={ariaDescribedBy}
                invalid={invalid}>
                {i18nStrings.uploadButtonText(multiple)}
              </FileInput>
            )}
            {(constraintText || errorText || warningText) && (
              <div className={styles.hints}>
                {errorText && (
                  <FormFieldError
                    id={errorId}
                    errorIconAriaLabel={i18nStrings?.errorIconAriaLabel}>
                    {errorText}
                  </FormFieldError>
                )}
                {showWarning && (
                  <FormFieldWarning
                    id={warningId}
                    warningIconAriaLabel={i18nStrings?.warningIconAriaLabel}>
                    {warningText}
                  </FormFieldWarning>
                )}
                {constraintText && (
                  <ConstraintText
                    id={constraintTextId}
                    hasValidationText={!!errorText || !!warningText}>
                    {constraintText}
                  </ConstraintText>
                )}
              </div>
            )}
          </InternalBox>
          {!multiple && value.length > 0 ? (
            <InternalBox>
              <Token
                ariaLabel={value[0].name}
                dismissLabel={i18nStrings.removeFileAriaLabel(0)}
                onDismiss={() => onFileRemove(0)}
                errorText={fileErrors?.[0]}
                warningText={fileWarnings?.[0]}
                errorIconAriaLabel={i18nStrings.errorIconAriaLabel}
                warningIconAriaLabel={i18nStrings.warningIconAriaLabel}
                data-index={0}>
                <FileOption
                  file={value[0]}
                  metadata={metadata}
                  i18nStrings={i18nStrings}
                />
              </Token>
            </InternalBox>
          ) : null}
          {multiple && value.length > 0 ? (
            <InternalBox>
              <TokenList
                alignment='vertical'
                items={value}
                renderItem={(file, fileIndex) => (
                  <Token
                    ariaLabel={file.name}
                    dismissLabel={i18nStrings.removeFileAriaLabel(fileIndex)}
                    onDismiss={() => onFileRemove(fileIndex)}
                    errorText={fileErrors?.[fileIndex]}
                    warningText={fileWarnings?.[fileIndex]}
                    errorIconAriaLabel={i18nStrings.errorIconAriaLabel}
                    warningIconAriaLabel={i18nStrings.warningIconAriaLabel}
                    data-index={fileIndex}>
                    <FileOption
                      file={file}
                      metadata={metadata}
                      i18nStrings={i18nStrings}
                    />
                  </Token>
                )}
                limit={tokenLimit}
                i18nStrings={{
                  limitShowFewer: i18nStrings.limitShowFewer,
                  limitShowMore: i18nStrings.limitShowMore
                }}
                moveFocusNextToIndex={removedFileIndex}
              />
            </InternalBox>
          ) : null}
        </InternalSpaceBetween>
      )
    }
  )
)

export {
  InternalFileUpload as default
}
