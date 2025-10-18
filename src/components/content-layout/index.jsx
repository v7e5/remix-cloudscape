import {memo} from 'react'
import InternalContentLayout from './internal'
import useBaseComponent from '../internal/hooks/use-base-component'

const ContentLayout = memo(props => {
  const baseComponentProps = useBaseComponent('ContentLayout')
  return <InternalContentLayout {...props} {...baseComponentProps} />
})

export {
  ContentLayout as default
}
