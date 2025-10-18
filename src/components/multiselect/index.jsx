import {forwardRef, memo, useCallback, useState} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalMultiselect from './internal'

const Multiselect = memo(
  forwardRef(
    (
      {
        options = [],
        filteringType = 'none',
        statusType = 'finished',
        selectedOptions = [],
        keepOpen = true,
        hideTokens = false,
        name,
        value = [],
        onChange,
        ...restProps
      },
      ref
    ) => {
      const _fi = e => value.includes(e.value)
      const [_selectedOptions, _setSelectedOptions] = useState(
        selectedOptions.length !== 0 ? selectedOptions : options.filter(_fi)
      )

      const _onChange = useCallback(({selectedOptions}) => {
        _setSelectedOptions(selectedOptions)
        onChange?.(selectedOptions)
      }, [])

      const baseComponentProps = useBaseComponent('Multiselect')
      const inlineTokens = Boolean(restProps.inlineTokens)
      return (
        <>
          <InternalMultiselect
            options={options}
            filteringType={filteringType}
            statusType={statusType}
            selectedOptions={_selectedOptions}
            onChange={_onChange}
            keepOpen={keepOpen}
            hideTokens={hideTokens}
            inlineTokens={inlineTokens}
            {...restProps}
            {...baseComponentProps}
            ref={ref}
          />
          {name !== undefined &&
            _selectedOptions.length !== 0 &&
            _selectedOptions.map((e, i) => (
              <input key={i} type='hidden' name={name} value={e.value} />
            ))}
        </>
      )
    }
  )
)

export {
  Multiselect as default
}
