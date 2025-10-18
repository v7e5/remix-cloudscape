import {memo} from 'react'
import Container from '~/components/container'
import ContentLayout from '~/components/content-layout'
import Header from '~/components/header'
import SpaceBetween from '~/components/space-between'

const CL = memo(({title, actions, children, ...r}) => (
  <ContentLayout disableOverlap={false} defaultPadding={true}>
    <Container
      data-xxxass
      fitHeight={false}
      disableContentPaddings={false}
      disableHeaderPaddings={false}
      header={
        <Header
          variant='h2'
          actions={actions}
          counter={!!r?.count && '[' + r?.count + ']'}>
          {title}
        </Header>
      }>
      {children}
    </Container>
  </ContentLayout>
))

const SB = memo(({title, actions, children, ...r}) => (
  <SpaceBetween size='m'>
    <Header
      variant='h2'
      actions={actions}
      counter={!!r?.count && '[' + r?.count + ']'}>
      {title}
    </Header>
    <Container
      fitHeight={false}
      disableContentPaddings={false}
      disableHeaderPaddings={false}>
      {children}
    </Container>
  </SpaceBetween>
))

export {
  CL,
  SB
}
