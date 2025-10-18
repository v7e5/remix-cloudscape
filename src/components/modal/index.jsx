import {memo} from 'react'
import InternalModal from './internal'
import useBaseComponent from '../internal/hooks/use-base-component'

const Modal = memo(({size = 'medium', ...props}) => {
  const baseComponentProps = useBaseComponent('Modal')
  return <InternalModal size={size} {...props} {...baseComponentProps} />
})

export {
  Modal as default
}
