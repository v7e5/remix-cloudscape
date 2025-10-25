import {memo} from 'react'
import Container from '~/components/container'
import ContentLayout from '~/components/content-layout'
import Header from '~/components/header'
import Link from '~/components/link'
import TextContent from '~/components/text-content'

const Z = memo(() => {
  return (
    <ContentLayout
      disableOverlap={false}
      defaultPadding={true}
      headerVariant='high-contrast'>
      <Container
        fitHeight={false}
        disableContentPaddings={false}
        disableHeaderPaddings={false}
        header={
          <Header variant='h1'>AWS Cloudscape UI Components for Remix</Header>
        }>
        <TextContent>
          <ul>
            <li>
              See <Link to='ks'>Kitchen Sink</Link> for list of all components
              and demo pages.
            </li>
            <li>
              Component library files are in the <code>src/components</code>{' '}
              directory.
            </li>
            <li>
              css files and fonts are located in <code>src/css</code>
            </li>
            <li>
              Pinned to commit{' '}
              <Link
                external={true}
                to='https://github.com/cloudscape-design/components/tree/a4448f5cc2b25fdaee4e9d2d3c4d5bee40767345'>
                a4448f5
              </Link>{' '}
              of{' '}
              <Link
                external={true}
                to='https://github.com/cloudscape-design/components'>
                cloudscape-design/components
              </Link>
              , date: Jun 5, 2024
            </li>
          </ul>
        </TextContent>
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
