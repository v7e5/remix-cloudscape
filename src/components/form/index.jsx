import {memo} from 'react'
import InternalForm from './internal'
import useBaseComponent from '../internal/hooks/use-base-component'

const Form = memo(props => (
  <InternalForm {...useBaseComponent('Form')} {...props} />
))

export {
  Form as default
}
