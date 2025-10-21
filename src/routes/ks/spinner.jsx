import {memo} from 'react'
import SpaceBetween from '~/components/space-between'
import Spinner from '~/components/spinner'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Spinner'>
      <SpaceBetween size='xxl' style={{color: 'blue'}} direction='horizontal'>
        <Spinner size='big' />
        <Spinner size='large' />
        <Spinner size='normal' />
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Spinner'}
}

export {
  handle,
  Z as default
}
