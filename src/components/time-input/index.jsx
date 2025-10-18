import {forwardRef, memo, useCallback, useState} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalTimeInput from './internal'

const TimeInput = memo(
  forwardRef(
    (
      {
        format = 'hh:mm:ss',
        placeholder = 'hh:mm:ss',
        use24Hour = true,
        autoComplete = false,
        autoFocus = false,
        disableBrowserAutocorrect = true,
        value,
        onChange,
        ...props
      },
      ref
    ) => {
      const [_value, _setValue] = useState(value ?? '')

      const _onChange = useCallback(({value}) => {
        _setValue(value)
        onChange?.({value})
      }, [])

      const baseComponentProps = useBaseComponent('TimeInput')
      return (
        <InternalTimeInput
          format={format}
          placeholder={placeholder}
          use24Hour={use24Hour}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          disableBrowserAutocorrect={disableBrowserAutocorrect}
          value={_value}
          onChange={_onChange}
          ref={ref}
          {...props}
          {...baseComponentProps}
        />
      )
    }
  )
)

export {
  TimeInput as default
}
