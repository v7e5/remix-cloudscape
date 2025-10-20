import {memo} from 'react'
import Link from '~/components/link'
import SpaceBetween from '~/components/space-between'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Link'>
      <SpaceBetween size='m' direction='vertical'>
        <Link variant='primary'>variant: primary</Link>
        <Link variant='secondary'>variant: secondary</Link>
        <Link variant='info'>variant: info</Link>
        <Link variant='awsui-value-large'>variant: awsui-value-large</Link>

        <Link fontSize='body-s'>fontSize: body-s</Link>
        <Link fontSize='body-m'>fontSize: body-m</Link>
        <Link fontSize='heading-xs'>fontSize: heading-xs</Link>
        <Link fontSize='heading-s'>fontSize: heading-s</Link>
        <Link fontSize='heading-m'>fontSize: heading-m</Link>
        <Link fontSize='heading-l'>fontSize: heading-l</Link>
        <Link fontSize='heading-xl'>fontSize: heading-xl</Link>
        <Link fontSize='display-l'>fontSize: display-l</Link>
        <Link fontSize='inherit'>fontSize: inherit</Link>

        <Link color='normal'>color: normal</Link>
        <div style={{backgroundColor: 'currentcolor'}}>
          <Link color='inverted'>color: inverted</Link>
        </div>
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Link'}
}

export {
  handle,
  Z as default
}
