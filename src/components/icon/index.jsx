import {memo} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalIcon from './internal'

const Icon = memo(({size = 'normal', variant = 'normal', ...props}) => {
  const baseComponentProps = useBaseComponent('Icon')
  return (
    <InternalIcon
      size={size}
      variant={variant}
      {...props}
      {...baseComponentProps}
    />
  )
})

export {
  Icon as default
}
