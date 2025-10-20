import {memo, useCallback, useState} from 'react'
import {Link} from 'react-router'
import Box from '~/components/box'
import BreadcrumbGroup from '~/components/breadcrumb-group'
import SpaceBetween from '~/components/space-between'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  const [str, setStr] = useState('')

  const onClick = useCallback(ev => {
    ev.preventDefault()
    setStr(ev.currentTarget.hash)
  }, [])

  return (
    <SB title='Breadcrumb group'>
      <SpaceBetween size='m' direction='vertical'>
        <BreadcrumbGroup
          items={[
            {text: 'usr', to: '#usr'},
            {text: 'local', to: '#local'},
            {text: 'bin', to: '#bin'}
          ]}
          onClick={onClick}
        />

        <Box variant='pre'>{str}</Box>
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Breadcrumb group'}
}

export {
  handle,
  Z as default
}
