import {forwardRef, memo, useState} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalTiles from './internal'

const Tiles = memo(
  forwardRef(({value, ...props}, ref) => {
    const [_value, _setValue] = useState(value ?? null)
    const baseComponentProps = useBaseComponent('Tiles')
    return (
      <InternalTiles
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
  Tiles as default
}
