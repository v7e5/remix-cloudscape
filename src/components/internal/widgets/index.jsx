import {forwardRef} from 'react'
import {getGlobalFlag} from '../utils/global-flags'

const createWidgetizedComponent = Implementation => {
  return Loader => {
    return props => {
      if (getGlobalFlag('appLayoutWidget') && Loader) {
        return <Loader {...props} />
      }
      return <Implementation {...props} />
    }
  }
}
const createWidgetizedForwardRef = Implementation => {
  return Loader => {
    return forwardRef((props, ref) => {
      if (getGlobalFlag('appLayoutWidget') && Loader) {
        return <Loader ref={ref} {...props} />
      }
      return <Implementation ref={ref} {...props} />
    })
  }
}

export {
  createWidgetizedComponent,
  createWidgetizedForwardRef
}
