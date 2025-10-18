import {memo} from 'react'
import InternalBox from './internal'
import useBaseComponent from '../internal/hooks/use-base-component'

const Box = memo(({variant = 'div', margin = {}, padding = {}, ...props}) => {
  const baseComponentProps = useBaseComponent('Box')
  return (
    <InternalBox
      variant={variant}
      margin={margin}
      padding={padding}
      {...props}
      {...baseComponentProps}
    />
  )
})

export {
  Box as default
}
