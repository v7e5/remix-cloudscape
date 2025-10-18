import {memo} from 'react'
import Container from '~/components/container'
import ContentLayout from '~/components/content-layout'

const X = memo(() => {
  return (
    <Container
      fitHeight={true}
      disableContentPaddings={false}
      disableHeaderPaddings={false}>
      <div
        className='gridbg'
        style={{
          '--bg': 'var(--gray-20)',
          height: '100%'
        }}></div>
    </Container>
  )
})

const Z = memo(() => {
  const phi = (1 + Math.sqrt(5)) / 2
  const a = 11
  const b = a / phi

  return (
    <ContentLayout
      disableOverlap={false}
      defaultPadding={true}
      headerVariant='high-contrast'>
      <Container
        fitHeight={true}
        disableContentPaddings={false}
        disableHeaderPaddings={false}>
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            height: '100%'
          }}>
          <div
            style={{
              width: `${a}vw`,
              height: `${a + b}vw`
            }}>
            <div
              className='gridbg'
              style={{
                '--bg': 'var(--gold-20v)',
                height: `${b}vw`,
                width: '100%'
              }}></div>
            <div
              className='gridbg'
              style={{
                '--bg': 'var(--gray-20)',
                height: `${a}vw`,
                width: '100%',
                fontSize: '2em'
              }}></div>
          </div>
        </div>
      </Container>
    </ContentLayout>
  )
})

const handle = {
  headerVariant: 'high-contrast'
}

export {
  handle,
  Z as default
}
