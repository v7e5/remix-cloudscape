import {memo} from 'react'
import SpaceBetween from '~/components/space-between'
import StatusIndicator from '~/components/status-indicator'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Status indicator'>
      <SpaceBetween size='xxl' direction='horizontal'>
        {[
          'error',
          'warning',
          'success',
          'info',
          'stopped',
          'pending',
          'in-progress',
          'loading'
        ].map((e, i) => (
          <StatusIndicator key={i} type={e}>
            {e}
          </StatusIndicator>
        ))}
        {['blue', 'grey', 'green', 'red', 'yellow'].map((e, i) => (
          <StatusIndicator key={i} type={'info'} colorOverride={e}>
            {e}
          </StatusIndicator>
        ))}
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Status indicator'}
}

export {
  handle,
  Z as default
}
