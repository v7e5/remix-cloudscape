import {useComponentMetadata} from '../../toolkit/internal'
import {PACKAGE_VERSION} from '../../environment'
import useFocusVisible from '../focus-visible'

const useBaseComponent = componentName => {
  useFocusVisible()
  return {
    __internalRootRef: useComponentMetadata(componentName, PACKAGE_VERSION)
  }
}

export {
  useBaseComponent as default
}
