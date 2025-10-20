import {memo} from 'react'
import Box from '~/components/box'
import Container from '~/components/container'
import ContentLayout from '~/components/content-layout'
import Header from '~/components/header'

const Z = memo(() => {
  return (
    <ContentLayout disableOverlap={false} defaultPadding={true}>
      <Container
        fitHeight={false}
        disableContentPaddings={false}
        disableHeaderPaddings={false}
        header={<Header variant='h2'>Content layout</Header>}>
        Content layout
      </Container>
    </ContentLayout>
  )
})

const handle = {
  crumb: {text: 'Content layout'}
}

export {
  handle,
  Z as default
}
