import {forwardRef, memo, useState} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalRadioGroup from './internal'

const RadioGroup = memo(
  forwardRef(({value, ...props}, ref) => {
    const [_value, _setValue] = useState(value ?? null)
    const baseComponentProps = useBaseComponent('RadioGroup')
    return (
      <InternalRadioGroup
        value={_value}
        setValue={_setValue}
        ref={ref}
        {...props}
        {...baseComponentProps}
      />
    )
  })
)

export {
  RadioGroup as default
}
