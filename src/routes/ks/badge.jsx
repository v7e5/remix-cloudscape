import {memo} from 'react'
import Badge from '~/components/badge'
import SpaceBetween from '~/components/space-between'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Badge'>
      <SpaceBetween size='m' direction='horizontal'>
        <Badge color={false}>nien</Badge>
        <Badge color='red'>8</Badge>
        <Badge color='blue'>4</Badge>
        <Badge color='green'>2</Badge>
        <Badge color='grey'>1</Badge>
      </SpaceBetween>
    </SB>
  )
})

export {
  Z as default
}
