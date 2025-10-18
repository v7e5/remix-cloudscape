import {forwardRef, memo, useState, useEffect} from 'react'
import InternalCheckbox from './internal'
import useBaseComponent from '../internal/hooks/use-base-component'

const Checkbox = memo(
  forwardRef(({checked = false, ...props}, ref) => {
    const [_checked, _setChecked] = useState(checked)

    useEffect(() => {
      _setChecked(checked)
    }, [checked])

    const baseComponentProps = useBaseComponent('Checkbox')
    return (
      <InternalCheckbox
        checked={_checked}
        setChecked={_setChecked}
        {...props}
        {...baseComponentProps}
        ref={ref}
      />
    )
  })
)

export {
  Checkbox as default
}
