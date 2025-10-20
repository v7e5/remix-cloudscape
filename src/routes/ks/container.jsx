import {memo} from 'react'
import Container from '~/components/container'
import Header from '~/components/header'
import SpaceBetween from '~/components/space-between'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SpaceBetween size='m'>
      <Header variant='h2'>Container</Header>
      <Container
        fitHeight={false}
        disableContentPaddings={false}
        disableHeaderPaddings={false}>
        Container
      </Container>
    </SpaceBetween>
  )
})

const handle = {
  crumb: {text: 'Container'}
}

export {
  handle,
  Z as default
}
