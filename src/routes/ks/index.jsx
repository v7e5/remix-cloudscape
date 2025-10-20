import {memo, useEffect} from 'react'
import {useMatches} from 'react-router'
import ColumnLayout from '~/components/column-layout'
import Link from '~/components/link'
import {useGlobalDispatch} from '~/context'
import {CL} from '~/shell/cont'

const Z = memo(() => {
  const globalDispatch = useGlobalDispatch()

  useEffect(() => {
    globalDispatch({
      action: 'sidenav_toggle',
      open: true
    })
  }, [])

  const nav = useMatches()?.find(e => e.id === 'routes/ks/route')?.handle
    .sidenav.items

  return (
    <CL title='Components' count={nav.length}>
      <ColumnLayout columns={4} borders='all'>
        {nav.map((e, i) => (
          <Link key={i} to={e.to}>
            {e.text}
          </Link>
        ))}
      </ColumnLayout>
    </CL>
  )
})

const handle = {
  crumb: {text: '_index'}
}

export {
  handle,
  Z as default
}
