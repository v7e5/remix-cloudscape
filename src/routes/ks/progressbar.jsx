import {memo} from 'react'
import ProgressBar from '~/components/progress-bar'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Progress bar'>
      <ProgressBar
        value={37}
        status='in-progress'
        resultText='dun'
        resultButtonText='ok'
        additionalInfo='Additional information'
        description='Progress bar description'
        label='Progress bar label'
      />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Progress bar'}
}

export {
  handle,
  Z as default
}
