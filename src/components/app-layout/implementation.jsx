import {forwardRef, memo} from 'react'
import {createWidgetizedForwardRef} from '../internal/widgets'
import RefreshedAppLayout from './visual-refresh'

const AppLayoutImplementation = memo(
  forwardRef((props, ref) => {
    return <RefreshedAppLayout ref={ref} {...props} />
  })
)
const createWidgetizedAppLayout = createWidgetizedForwardRef(
  AppLayoutImplementation
)

export {
  AppLayoutImplementation,
  createWidgetizedAppLayout
}
