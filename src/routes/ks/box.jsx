import {memo} from 'react'
import Box from '~/components/box'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Box'>
      <Box color='text-status-info' fontSize='display-l' fontWeight='bold'>
        Large and bold text
      </Box>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Box'}
}

export {
  handle,
  Z as default
}
