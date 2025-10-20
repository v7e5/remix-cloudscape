import {memo} from 'react'
import LoadingBar from '~/components/loading-bar'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Loading bar'>
      <LoadingBar/>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Loading bar'}
}

export {
  handle,
  Z as default
}
