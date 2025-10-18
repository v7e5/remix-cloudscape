import {memo} from 'react'
import InternalStatusIndicator from './internal'
import useBaseComponent from '../internal/hooks/use-base-component'

const StatusIndicator = memo(
  ({type = 'success', wrapText = true, ...props}) => {
    const baseComponentProps = useBaseComponent('StatusIndicator')
    return (
      <InternalStatusIndicator
        type={type}
        wrapText={wrapText}
        {...props}
        {...baseComponentProps}
      />
    )
  }
)

export {
  StatusIndicator as default
}
