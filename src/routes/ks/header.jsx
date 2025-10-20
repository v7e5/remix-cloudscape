import {memo} from 'react'
import Button from '~/components/button'
import Header from '~/components/header'
import Link from '~/components/link'
import SpaceBetween from '~/components/space-between'
import {SB} from '~/shell/cont'

const X = memo(({i}) => (
  <Header
    variant={'h' + i}
    info={<Link variant='info'>info link</Link>}
    description='description'
    actions={
      <SpaceBetween direction='horizontal' size='xs'>
        <Button>H{i} action 1</Button>
        {i % 2 !== 0 && <Button>H{i} action 2</Button>}
      </SpaceBetween>
    }
    counter={123}>
    H{i} Header
  </Header>
))

const Z = memo(() => {
  return (
    <SB title='Header'>
      <SpaceBetween size='m' direction='vertical'>
        {Array.from({length: 6}).map((e, i) => (
          <X i={i + 1} />
        ))}
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Header'}
}

export {
  handle,
  Z as default
}
