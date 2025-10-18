import {useImperativeHandle, useRef, forwardRef, memo} from 'react'
import clsx from 'clsx'
import {useAutosuggestItems} from './options-controller'
import {useDropdownStatus} from '../internal/components/dropdown-status'
import DropdownFooter from '../internal/components/dropdown-footer'
import {useUniqueId} from '../internal/hooks/use-unique-id'
import AutosuggestOptionsList from './options-list'
import {useAutosuggestLoadMore} from './load-more-controller'
import AutosuggestInput from '../internal/components/autosuggest-input'
import {useFormFieldContext} from '../internal/context/form-field-context'

import {useInternalI18n} from '../i18n/context'
import styles from './styles.css.js'

const InternalAutosuggest = memo(
  forwardRef((props, ref) => {
    const {
      value,
      onChange,
      onBlur,
      onFocus,
      onKeyUp,
      onLoadItems,
      options,
      filteringType = 'auto',
      statusType = 'finished',
      placeholder,
      clearAriaLabel,
      name,
      disabled,
      disableBrowserAutocorrect = false,
      autoFocus,
      readOnly,
      ariaLabel,
      ariaRequired,
      enteredTextLabel,
      filteringResultsText,
      onKeyDown,
      virtualScroll,
      expandToViewport,
      onSelect,
      renderHighlightedAriaLive,
      __internalRootRef,
      ...restProps
    } = props
    const autosuggestInputRef = useRef(null)
    useImperativeHandle(
      ref,
      () => ({
        focus: () => autosuggestInputRef.current?.focus(),
        select: () => autosuggestInputRef.current?.select()
      }),
      []
    )
    const i18n = useInternalI18n('autosuggest')
    const errorIconAriaLabel = i18n(
      'errorIconAriaLabel',
      restProps.errorIconAriaLabel
    )
    const selectedAriaLabel = i18n(
      'selectedAriaLabel',
      restProps.selectedAriaLabel
    )
    const recoveryText = i18n('recoveryText', restProps.recoveryText)
    const [autosuggestItemsState, autosuggestItemsHandlers] =
      useAutosuggestItems({
        options: options || [],
        filterValue: value,
        filterText: value,
        filteringType,
        enteredTextLabel,
        hideEnteredTextLabel: false,
        onSelectItem: option => {
          const value2 = option.value || ''
          onChange?.({value: value2})
          onSelect?.({
            value: value2,
            selectedOption:
              option.type !== 'use-entered' ? option.option : void 0
          })
          autosuggestInputRef.current?.close()
        }
      })
    const autosuggestLoadMoreHandlers = useAutosuggestLoadMore({
      options,
      statusType,
      onLoadItems
    })
    const handleChange = o => {
      autosuggestItemsHandlers.setShowAll(false)
      autosuggestItemsHandlers.resetHighlightWithKeyboard()
      onChange?.(o)
    }
    const handleDelayedInput = ({value}) => {
      autosuggestLoadMoreHandlers.fireLoadMoreOnInputChange(value)
    }
    const handleFocus = event => {
      autosuggestItemsHandlers.setShowAll(true)
      autosuggestLoadMoreHandlers.fireLoadMoreOnInputFocus()
      onFocus?.(event)
    }
    const handlePressArrowDown = () => {
      autosuggestItemsHandlers.moveHighlightWithKeyboard(1)
    }
    const handlePressArrowUp = () => {
      autosuggestItemsHandlers.moveHighlightWithKeyboard(-1)
    }
    const handlePressEnter = () => {
      return autosuggestItemsHandlers.selectHighlightedOptionWithKeyboard()
    }
    const handleCloseDropdown = () => {
      autosuggestItemsHandlers.resetHighlightWithKeyboard()
    }
    const handleRecoveryClick = () => {
      autosuggestLoadMoreHandlers.fireLoadMoreOnRecoveryClick()
      autosuggestInputRef.current?.focus()
    }
    const formFieldContext = useFormFieldContext(restProps)
    const selfControlId = useUniqueId('input')
    const footerControlId = useUniqueId('footer')
    const controlId = formFieldContext.controlId ?? selfControlId
    const listId = useUniqueId('list')
    const highlightedOptionIdSource = useUniqueId()
    const highlightedOptionId = autosuggestItemsState.highlightedOption
      ? highlightedOptionIdSource
      : void 0
    const isEmpty = !value && !autosuggestItemsState.items.length
    const isFiltered = !!value && value.length !== 0
    const filteredText = isFiltered
      ? filteringResultsText?.(
          autosuggestItemsState.items.length,
          options?.length ?? 0
        )
      : void 0
    const dropdownStatus = useDropdownStatus({
      ...props,
      isEmpty,
      isFiltered,
      recoveryText,
      errorIconAriaLabel,
      onRecoveryClick: handleRecoveryClick,
      filteringResultsText: filteredText,
      hasRecoveryCallback: !!onLoadItems
    })
    const shouldRenderDropdownContent = !isEmpty || dropdownStatus.content
    return (
      <AutosuggestInput
        {...restProps}
        className={clsx(styles.root, restProps.className)}
        ref={autosuggestInputRef}
        __internalRootRef={__internalRootRef}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={handleFocus}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        name={name}
        controlId={controlId}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        ariaLabel={ariaLabel}
        ariaRequired={ariaRequired}
        clearAriaLabel={clearAriaLabel}
        disableBrowserAutocorrect={disableBrowserAutocorrect}
        expandToViewport={expandToViewport}
        ariaControls={listId}
        ariaActivedescendant={highlightedOptionId}
        dropdownExpanded={
          autosuggestItemsState.items.length > 1 ||
          dropdownStatus.content !== null
        }
        dropdownContent={
          shouldRenderDropdownContent && (
            <AutosuggestOptionsList
              statusType={statusType}
              autosuggestItemsState={autosuggestItemsState}
              autosuggestItemsHandlers={autosuggestItemsHandlers}
              highlightedOptionId={highlightedOptionId}
              highlightText={value}
              listId={listId}
              controlId={controlId}
              handleLoadMore={autosuggestLoadMoreHandlers.fireLoadMoreOnScroll}
              hasDropdownStatus={dropdownStatus.content !== null}
              virtualScroll={virtualScroll}
              selectedAriaLabel={selectedAriaLabel}
              renderHighlightedAriaLive={renderHighlightedAriaLive}
              listBottom={
                !dropdownStatus.isSticky ? (
                  <DropdownFooter
                    content={dropdownStatus.content}
                    id={footerControlId}
                  />
                ) : null
              }
              ariaDescribedby={
                dropdownStatus.content ? footerControlId : void 0
              }
            />
          )
        }
        dropdownFooter={
          dropdownStatus.isSticky && dropdownStatus.content ? (
            <DropdownFooter
              id={footerControlId}
              content={dropdownStatus.content}
              hasItems={autosuggestItemsState.items.length >= 1}
            />
          ) : null
        }
        loopFocus={statusType === 'error' && !!recoveryText && !!onLoadItems}
        onCloseDropdown={handleCloseDropdown}
        onDelayedInput={handleDelayedInput}
        onPressArrowDown={handlePressArrowDown}
        onPressArrowUp={handlePressArrowUp}
        onPressEnter={handlePressEnter}
      />
    )
  })
)

export {
  InternalAutosuggest as default
}
