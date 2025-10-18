import {forwardRef, memo, useCallback, useState} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalDateInput from './internal'

const DateInput = memo(
  forwardRef(({value, onChange, placeholder = 'YYYY-MM-DD', ...rest}, ref) => {
    const [_value, _setValue] = useState(value ?? '')

    const _onChange = useCallback(({value}) => {
      _setValue(value)
      onChange?.({value})
    }, [])

    const baseComponentProps = useBaseComponent('DateInput')
    return (
      <InternalDateInput
        value={_value}
        placeholder={placeholder}
        onChange={_onChange}
        ref={ref}
        {...rest}
        {...baseComponentProps}
      />
    )
  })
)

export {
  DateInput as default
}
