import {useMemo, useRef, forwardRef, memo} from 'react'
import {useAutosuggestItems} from '../autosuggest/options-controller'
import {useDropdownStatus} from '../internal/components/dropdown-status'
import DropdownFooter from '../internal/components/dropdown-footer'
import {useUniqueId} from '../internal/hooks/use-unique-id'
import autosuggestStyles from '../autosuggest/styles.css.js'
import styles from './styles.css.js'
import AutosuggestOptionsList from '../autosuggest/options-list'
import {useAutosuggestLoadMore} from '../autosuggest/load-more-controller'
import AutosuggestInput from '../internal/components/autosuggest-input'
import {useMergeRefs} from '../internal/hooks/use-merge-refs'
import clsx from 'clsx'
import {getFirstFocusable} from '../internal/components/focus-lock/utils'
import {filterOptions} from './filter-options'
import {joinStrings} from '../internal/utils/strings'

const DROPDOWN_WIDTH_OPTIONS_LIST = 300
const DROPDOWN_WIDTH_CUSTOM_FORM = 200
const PropertyFilterAutosuggest = memo(
  forwardRef((props, ref) => {
    const {
      value,
      onChange,
      onFocus,
      onBlur,
      onLoadItems,
      options,
      statusType = 'finished',
      placeholder,
      disabled,
      ariaLabel,
      enteredTextLabel,
      onKeyDown,
      virtualScroll,
      expandToViewport,
      customForm,
      filterText,
      onOptionClick,
      hideEnteredTextOption,
      searchResultsId,
      ...rest
    } = props
    const highlightText = filterText === void 0 ? value : filterText
    const customFormRef = useRef(null)
    const autosuggestInputRef = useRef(null)
    const mergedRef = useMergeRefs(autosuggestInputRef, ref)
    const filteredOptions = useMemo(
      () => filterOptions(options || [], highlightText),
      [options, highlightText]
    )
    const [autosuggestItemsState, autosuggestItemsHandlers] =
      useAutosuggestItems({
        options: filteredOptions,
        filterValue: value,
        filterText: highlightText,
        filteringType: 'manual',
        enteredTextLabel,
        hideEnteredTextLabel: hideEnteredTextOption,
        onSelectItem: option => {
          onChange(option.value || '')

          if (!onOptionClick(option)) {
            autosuggestInputRef.current?.close()
          } else {
            autosuggestItemsHandlers.resetHighlightWithKeyboard()
          }
        }
      })
    const autosuggestLoadMoreHandlers = useAutosuggestLoadMore({
      options,
      statusType,
      onLoadItems
    })
    const handleChange = ({value}) => {
      autosuggestItemsHandlers.resetHighlightWithKeyboard()
      onChange(value)
    }
    const handleDelayedInput = ({value}) => {
      autosuggestLoadMoreHandlers.fireLoadMoreOnInputChange(value)
    }
    const handleFocus = () => {
      autosuggestLoadMoreHandlers.fireLoadMoreOnInputFocus()
      onFocus?.(null)
    }
    const handleBlur = () => {
      onBlur?.(null)
    }
    const handleKeyDown = event => {
      onKeyDown(event)
    }
    const handlePressArrowDown = () => {
      autosuggestItemsHandlers.moveHighlightWithKeyboard(1)
      if (customFormRef.current) {
        getFirstFocusable(customFormRef.current)?.focus()
      }
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
    const selfControlId = useUniqueId('input')
    const controlId = rest.controlId ?? selfControlId
    const listId = useUniqueId('list')
    const footerId = useUniqueId('footer')
    const highlightedOptionIdSource = useUniqueId()
    const highlightedOptionId = autosuggestItemsState.highlightedOption
      ? highlightedOptionIdSource
      : void 0
    const isEmpty = !value && !autosuggestItemsState.items.length
    const dropdownStatus = useDropdownStatus({
      ...props,
      isEmpty,
      onRecoveryClick: handleRecoveryClick,
      hasRecoveryCallback: !!onLoadItems
    })
    let content = null
    if (customForm) {
      content = (
        <div ref={customFormRef} className={styles['custom-content-wrapper']}>
          {customForm}
        </div>
      )
    } else if (autosuggestItemsState.items.length > 0) {
      content = (
        <AutosuggestOptionsList
          statusType={statusType}
          autosuggestItemsState={autosuggestItemsState}
          autosuggestItemsHandlers={autosuggestItemsHandlers}
          highlightedOptionId={highlightedOptionId}
          highlightText={highlightText}
          listId={listId}
          controlId={controlId}
          handleLoadMore={autosuggestLoadMoreHandlers.fireLoadMoreOnScroll}
          hasDropdownStatus={dropdownStatus.content !== null}
          virtualScroll={virtualScroll}
          listBottom={
            !dropdownStatus.isSticky ? (
              <DropdownFooter content={dropdownStatus.content} id={footerId} />
            ) : null
          }
          ariaDescribedby={dropdownStatus.content ? footerId : void 0}
        />
      )
    }
    return (
      <AutosuggestInput
        ref={mergedRef}
        {...rest}
        className={clsx(autosuggestStyles.root, styles.input)}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        controlId={controlId}
        placeholder={placeholder}
        disabled={disabled}
        ariaLabel={ariaLabel}
        expandToViewport={expandToViewport}
        ariaControls={listId}
        ariaActivedescendant={highlightedOptionId}
        ariaDescribedby={joinStrings(searchResultsId, rest.ariaDescribedby)}
        dropdownExpanded={
          autosuggestItemsState.items.length > 1 ||
          dropdownStatus.content !== null ||
          !!customForm
        }
        dropdownContentKey={customForm ? 'custom' : 'options'}
        dropdownContent={content}
        dropdownFooter={
          dropdownStatus.isSticky && dropdownStatus.content ? (
            <DropdownFooter
              content={dropdownStatus.content}
              hasItems={autosuggestItemsState.items.length >= 1}
              id={footerId}
            />
          ) : null
        }
        dropdownWidth={
          customForm ? DROPDOWN_WIDTH_CUSTOM_FORM : DROPDOWN_WIDTH_OPTIONS_LIST
        }
        dropdownContentFocusable={!!customForm}
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
  PropertyFilterAutosuggest as default
}
