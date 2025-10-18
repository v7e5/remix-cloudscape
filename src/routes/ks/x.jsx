import {memo} from 'react'
import Container from '~/components/container'
import ContentLayout from '~/components/content-layout'
import Header from '~/components/header'
import SpaceBetween from '~/components/space-between'

const CLWrap = memo(({title, actions, children, ...r}) => (
  <ContentLayout disableOverlap={false} defaultPadding={true}>
    <Container
      data-xxxass
      fitHeight={false}
      disableContentPaddings={false}
      disableHeaderPaddings={false}
      header={
        <Header
          variant='h1'
          actions={actions}
          counter={!!r?.count && '[' + r?.count + ']'}>
          {title}
        </Header>
      }>
      {children}
    </Container>
  </ContentLayout>
))

const SBWrap = memo(({title, actions, children, ...r}) => (
  <SpaceBetween size='m'>
    <Header
      variant='h1'
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
  CLWrap,
  SBWrap
}
