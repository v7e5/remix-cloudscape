import {forwardRef, memo, useCallback, useState} from 'react'
import InternalSelect from './internal'
import useBaseComponent from '../internal/hooks/use-base-component'
import {getExternalProps} from '../internal/utils/external-props'

const nu = [null, undefined]
const not_nu = e => !nu.includes(e)

const Select = memo(
  forwardRef(
    (
      {
        options = [],
        filteringType = 'none',
        statusType = 'finished',
        triggerVariant = 'option',
        selectedOption,
        name,
        value,
        onChange,
        ...restProps
      },
      ref
    ) => {
      const _fi = e => e.value === value
      const [_selectedOption, _setSelectedOption] = useState(
        selectedOption ?? options.find(_fi) ?? null
      )
      const _onChange = useCallback(({selectedOption}) => {
        _setSelectedOption(selectedOption)
        onChange?.(selectedOption)
      }, [])

      const baseComponentProps = useBaseComponent('Select')
      const externalProps = getExternalProps(restProps)
      return (
        <>
          <InternalSelect
            options={options}
            filteringType={filteringType}
            statusType={statusType}
            triggerVariant={triggerVariant}
            {...externalProps}
            {...baseComponentProps}
            ref={ref}
            selectedOption={_selectedOption}
            onChange={_onChange}
          />
          {[name, _selectedOption].every(not_nu) && (
            <input type='hidden' name={name} value={_selectedOption.value} />
          )}
        </>
      )
    }
  )
)

export {
  Select as default
}
