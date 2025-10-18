import {forwardRef, memo, useState, useEffect} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalToggle from './internal'

const Toggle = memo(
  forwardRef(({checked = false, ...props}, ref) => {
    const [_checked, _setChecked] = useState(checked)

    useEffect(() => {
      _setChecked(checked)
    }, [checked])

    const baseComponentProps = useBaseComponent('Toggle')
    return (
      <InternalToggle
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
  Toggle as default
}
