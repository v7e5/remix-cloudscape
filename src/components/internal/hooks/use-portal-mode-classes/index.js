import clsx from 'clsx'
import {useVisualContext} from '../../components/visual-context'
import {currentMode} from '~/components/internal/toolkit/internal'

const usePortalModeClasses = ref => {
  const colorMode = currentMode
  const context = useVisualContext(ref)
  return clsx({
    'awsui-polaris-dark-mode awsui-dark-mode': colorMode === 'dark',
    'awsui-polaris-compact-mode awsui-compact-mode': true,
    'awsui-visual-refresh': true,
    [`awsui-context-${context}`]: context
  })
}

export {
  usePortalModeClasses
}
