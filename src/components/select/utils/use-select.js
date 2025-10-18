import {useEffect, useRef} from 'react'
import {
  isInteractive,
  isGroupInteractive,
  isGroup
} from '../../internal/components/option/utils/filter-options'
import {useHighlightedOption} from '../../internal/components/options-list/utils/use-highlight-option'
import {useOpenState} from '../../internal/components/options-list/utils/use-open-state'
import {
  useMenuKeyboard,
  useTriggerKeyboard
} from '../../internal/components/options-list/utils/use-keyboard'
import {getOptionId} from '../../internal/components/options-list/utils/use-ids'
import {connectOptionsByValue} from './connect-options'
import useForwardFocus from '../../internal/hooks/forward-focus'
import {usePrevious} from '../../internal/hooks/use-previous'
import {useUniqueId} from '../../internal/hooks/use-unique-id'

const useSelect = ({
  selectedOptions,
  updateSelectedOption,
  options,
  filteringType,
  onBlur,
  onFocus,
  externalRef,
  keepOpen,
  fireLoadItems,
  setFilteringValue,
  useInteractiveGroups = false,
  statusType
}) => {
  const interactivityCheck = useInteractiveGroups
    ? isGroupInteractive
    : isInteractive
  const isHighlightable = option =>
    !!option && (useInteractiveGroups || option.type !== 'parent')
  const filterRef = useRef(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const hasFilter = filteringType !== 'none'
  const activeRef = hasFilter ? filterRef : menuRef
  const __selectedOptions = connectOptionsByValue(options, selectedOptions)
  const __selectedValuesSet = selectedOptions.reduce(
    (selectedValuesSet, item) => {
      if (item.value) {
        selectedValuesSet.add(item.value)
      }
      return selectedValuesSet
    },
    new Set()
  )
  const [
    {highlightType, highlightedOption, highlightedIndex},
    {
      moveHighlightWithKeyboard,
      resetHighlightWithKeyboard,
      setHighlightedIndexWithMouse,
      highlightOptionWithKeyboard,
      goHomeWithKeyboard,
      goEndWithKeyboard
    }
  ] = useHighlightedOption({options, isHighlightable})
  const {
    isOpen,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    openedWithKeyboard
  } = useOpenState({
    onOpen: () => fireLoadItems(''),
    onClose: () => {
      resetHighlightWithKeyboard()
      setFilteringValue('')
    }
  })

  const handleBlur = event => {
    onBlur?.(event)
    closeDropdown()
  }

  const hasSelectedOption = __selectedOptions.length > 0
  const menuId = useUniqueId('option-list')
  const dialogId = useUniqueId('dialog')
  const highlightedOptionId = getOptionId(menuId, highlightedIndex)
  const selectOption = option => {
    const optionToSelect = option || highlightedOption
    if (!optionToSelect || !interactivityCheck(optionToSelect)) {
      return
    }
    updateSelectedOption(optionToSelect.option)
    if (!keepOpen) {
      triggerRef.current?.focus()
      closeDropdown()
    }
  }
  const activeKeyDownHandler = useMenuKeyboard({
    goUp: () => {
      if (
        (!useInteractiveGroups &&
          highlightedOption?.type === 'child' &&
          highlightedIndex === 1) ||
        highlightedIndex === 0
      ) {
        return
      }
      moveHighlightWithKeyboard(-1)
    },
    goDown: () => {
      if (highlightedIndex === options.length - 1) {
        return
      }
      moveHighlightWithKeyboard(1)
    },
    selectOption,
    goHome: goHomeWithKeyboard,
    goEnd: goEndWithKeyboard,
    closeDropdown: () => {
      triggerRef.current?.focus()
      closeDropdown()
    },
    preventNativeSpace: !hasFilter
  })
  const triggerKeyDownHandler = useTriggerKeyboard({
    openDropdown: () => openDropdown(true),
    goHome: goHomeWithKeyboard
  })
  const getDropdownProps = () => ({
    onFocus,
    onBlur: handleBlur,
    dropdownContentId: dialogId,
    dropdownContentRole: hasFilter ? 'dialog' : void 0
  })
  const getTriggerProps = (disabled = false, autoFocus = false) => {
    const triggerProps = {
      ref: triggerRef,
      onFocus: () => closeDropdown(),
      autoFocus,
      ariaHasPopup: hasFilter ? 'dialog' : 'listbox',
      ariaControls: isOpen ? (hasFilter ? dialogId : menuId) : void 0
    }
    if (!disabled) {
      triggerProps.onMouseDown = event => {
        event.preventDefault()
        if (isOpen) {
          triggerRef.current?.focus()
        }
        toggleDropdown()
      }
      triggerProps.onKeyDown = triggerKeyDownHandler
    }
    return triggerProps
  }
  const getFilterProps = () => {
    if (!hasFilter) {
      return {}
    }
    return {
      ref: filterRef,
      onKeyDown: activeKeyDownHandler,
      onChange: event => {
        setFilteringValue(event.target.value)
        resetHighlightWithKeyboard()
      },
      __onDelayedInput: event => {
        fireLoadItems(event.target.value)
      },
      __nativeAttributes: {
        'aria-activedescendant': highlightedOptionId,
        ['aria-owns']: menuId,
        ['aria-controls']: menuId
      }
    }
  }
  const getMenuProps = () => {
    const menuProps = {
      id: menuId,
      ref: menuRef,
      open: isOpen,
      onMouseUp: itemIndex => {
        if (itemIndex > -1) {
          selectOption(options[itemIndex])
        }
      },
      onMouseMove: itemIndex => {
        if (itemIndex > -1) {
          setHighlightedIndexWithMouse(itemIndex)
        }
      },
      statusType
    }
    if (!hasFilter) {
      menuProps.onKeyDown = activeKeyDownHandler
      menuProps.nativeAttributes = {
        'aria-activedescendant': highlightedOptionId
      }
    }
    return menuProps
  }
  const getGroupState = option => {
    const totalSelected = option.options.filter(
      item => !!item.value && __selectedValuesSet.has(item.value)
    ).length
    const hasSelected = totalSelected > 0
    const allSelected = totalSelected === option.options.length
    return {
      selected: hasSelected && allSelected
    }
  }
  const getOptionProps = (option, index) => {
    const highlighted = option === highlightedOption
    const groupState = isGroup(option.option)
      ? getGroupState(option.option)
      : void 0
    const selected =
      __selectedOptions.indexOf(option) > -1 || !!groupState?.selected
    const nextOption = options[index + 1]?.option
    const isNextSelected =
      !!nextOption && isGroup(nextOption)
        ? getGroupState(nextOption).selected
        : __selectedOptions.indexOf(options[index + 1]) > -1
    const optionProps = {
      key: index,
      option,
      highlighted,
      selected,
      isNextSelected,
      ['data-mouse-target']: isHighlightable(option) ? index : -1,
      id: getOptionId(menuId, index)
    }
    return optionProps
  }
  const prevOpen = usePrevious(isOpen)
  useEffect(() => {
    if (isOpen && !prevOpen && hasSelectedOption && !hasFilter) {
      if (openedWithKeyboard) {
        highlightOptionWithKeyboard(__selectedOptions[0])
      } else {
        setHighlightedIndexWithMouse(
          options.indexOf(__selectedOptions[0]),
          true
        )
      }
    }
  }, [
    isOpen,
    __selectedOptions,
    hasSelectedOption,
    setHighlightedIndexWithMouse,
    highlightOptionWithKeyboard,
    openedWithKeyboard,
    options,
    prevOpen,
    hasFilter
  ])
  useEffect(() => {
    if (isOpen) {
      activeRef.current?.focus({preventScroll: true})
    }
  }, [isOpen, activeRef])
  useForwardFocus(externalRef, triggerRef)
  const highlightedGroupSelected =
    !!highlightedOption &&
    isGroup(highlightedOption.option) &&
    getGroupState(highlightedOption.option).selected
  const announceSelected =
    !!highlightedOption &&
    (__selectedOptions.indexOf(highlightedOption) > -1 ||
      highlightedGroupSelected)
  return {
    isOpen,
    highlightedOption,
    highlightedIndex,
    highlightType,
    getTriggerProps,
    getDropdownProps,
    getMenuProps,
    getFilterProps,
    getOptionProps,
    highlightOption: highlightOptionWithKeyboard,
    selectOption,
    announceSelected,
    dialogId
  }
}

export {
  useSelect
}
