import {useCallback, useRef, useState, forwardRef, memo} from 'react'
import clsx from 'clsx'
import styles from './styles.css.js'
import InternalCalendar from '../calendar/internal'
import {KeyCode} from '../internal/keycode'
import Dropdown from '../internal/components/dropdown'
import InternalDateInput from '../date-input/internal'
import {getBaseProps} from '../internal/base-component'
import {useFocusTracker} from '../internal/hooks/use-focus-tracker'
import useForwardFocus from '../internal/hooks/forward-focus'
import {InternalButton} from '../button/internal'
import useBaseComponent from '../internal/hooks/use-base-component'
import {useUniqueId} from '../internal/hooks/use-unique-id'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'
import FocusLock from '../internal/components/focus-lock'
import {parseDate} from '../internal/utils/date-time'
import {useFormFieldContext} from '../internal/context/form-field-context'
import {useLocale} from '../i18n/context'
import {getSelectedDateLabel, isValidFullDate} from './utils'

const DatePicker = memo(
  forwardRef(
    (
      {
        locale = '',
        startOfWeek,
        isDateEnabled,
        nextMonthAriaLabel,
        previousMonthAriaLabel,
        todayAriaLabel,
        i18nStrings,
        placeholder = 'YYYY-MM-DD',
        value,
        readOnly = false,
        disabled = false,
        onBlur,
        autoFocus = false,
        onChange,
        onFocus,
        name,
        ariaLabel,
        ariaRequired,
        controlId,
        invalid,
        warning,
        openCalendarAriaLabel,
        expandToViewport,
        granularity = 'day',
        ...restProps
      },
      ref
    ) => {
      const [_value, _setValue] = useState(value ?? '')

      const _onChange = useCallback(({value}) => {
        _setValue(value)
        onChange?.({value})
      }, [])

      const {__internalRootRef} = useBaseComponent('DatePicker')
      const normalizedLocale = 'en-US'
      const baseProps = getBaseProps(restProps)
      const [isDropDownOpen, setIsDropDownOpen] = useState(false)
      const {ariaLabelledby, ariaDescribedby} = useFormFieldContext(restProps)
      const internalInputRef = useRef(null)
      const buttonRef = useRef(null)
      useForwardFocus(ref, internalInputRef)
      const rootRef = useRef(null)
      const dropdownId = useUniqueId('calender')
      const calendarDescriptionId = useUniqueId('calendar-description-')
      const mergedRef = useMergeRefs(rootRef, __internalRootRef)
      useFocusTracker({rootRef, onBlur, onFocus})
      const onDropdownCloseHandler = useCallback(
        () => setIsDropDownOpen(false),
        [setIsDropDownOpen]
      )
      const onButtonClickHandler = () => {
        if (!isDropDownOpen) {
          setIsDropDownOpen(true)
        }
      }
      const onWrapperKeyDownHandler = event => {
        if (event.keyCode === KeyCode.escape && isDropDownOpen) {
          event.stopPropagation()
          buttonRef.current?.focus()
          setIsDropDownOpen(false)
        }
      }

      const onInputBlurHandler = () => {
        if (!isDropDownOpen) {
          setIsDropDownOpen(false)
        }
      }
      const parsedValue =
        _value && _value.length >= 4 ? parseDate(_value) : null
      const baseDate = parsedValue || new Date()
      const hasFullValue = isValidFullDate({date: _value, granularity})
      const buttonAriaLabel =
        openCalendarAriaLabel &&
        openCalendarAriaLabel(
          hasFullValue && parsedValue
            ? getSelectedDateLabel({
                date: parsedValue,
                granularity,
                locale: normalizedLocale
              })
            : null
        )
      const trigger = (
        <div className={styles['date-picker-trigger']}>
          <div className={styles['date-picker-input']}>
            <InternalDateInput
              name={name}
              invalid={invalid}
              warning={warning}
              controlId={controlId}
              ariaLabelledby={ariaLabelledby}
              ariaDescribedby={ariaDescribedby}
              ariaLabel={ariaLabel}
              ariaRequired={ariaRequired}
              value={_value}
              disabled={disabled}
              readOnly={readOnly}
              onChange={_onChange}
              onBlur={onInputBlurHandler}
              placeholder={placeholder}
              ref={internalInputRef}
              autoFocus={autoFocus}
              onFocus={onDropdownCloseHandler}
              granularity={granularity}
            />
          </div>
          <div>
            <InternalButton
              iconName='calendar'
              className={styles['open-calendar-button']}
              onClick={onButtonClickHandler}
              ref={buttonRef}
              ariaLabel={buttonAriaLabel}
              disabled={disabled || readOnly}
              formAction='none'
            />
          </div>
        </div>
      )
      baseProps.className = clsx(
        baseProps.className,
        styles.root,
        styles['date-picker-container']
      )
      const handleMouseDown = event => {
        event.preventDefault()
      }
      return (
        <div
          {...baseProps}
          ref={mergedRef}
          onKeyDown={
            !disabled && !readOnly ? onWrapperKeyDownHandler : void 0
          }>
          {disabled || readOnly ? (
            trigger
          ) : (
            <Dropdown
              stretchWidth={true}
              stretchHeight={true}
              open={isDropDownOpen}
              onDropdownClose={onDropdownCloseHandler}
              onMouseDown={handleMouseDown}
              trigger={trigger}
              expandToViewport={expandToViewport}
              scrollable={false}
              dropdownId={dropdownId}>
              {isDropDownOpen && (
                <FocusLock className={styles['focus-lock']} autoFocus={true}>
                  <div
                    tabIndex={0}
                    className={styles.calendar}
                    role='dialog'
                    aria-modal='true'>
                    <InternalCalendar
                      value={_value}
                      setValue={_setValue}
                      onChange={v => {
                        onChange?.(v)
                        buttonRef?.current?.focus()
                        setIsDropDownOpen(false)
                      }}
                      locale={normalizedLocale}
                      startOfWeek={startOfWeek}
                      ariaDescribedby={calendarDescriptionId}
                      ariaLabel={ariaLabel}
                      ariaLabelledby={ariaLabelledby}
                      granularity={granularity}
                      isDateEnabled={isDateEnabled}
                      i18nStrings={{
                        ...i18nStrings,
                        todayAriaLabel:
                          i18nStrings?.todayAriaLabel ?? todayAriaLabel,
                        nextMonthAriaLabel:
                          i18nStrings?.nextMonthAriaLabel ??
                          nextMonthAriaLabel,
                        previousMonthAriaLabel:
                          i18nStrings?.previousMonthAriaLabel ??
                          previousMonthAriaLabel
                      }}
                    />
                  </div>
                </FocusLock>
              )}
            </Dropdown>
          )}
        </div>
      )
    }
  )
)

export {
  DatePicker as default
}
