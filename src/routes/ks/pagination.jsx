import {memo, useCallback, useState} from 'react'
import Pagination from '~/components/pagination'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  const [page, setPage] = useState(1)

  const onClick = useCallback(n => {
    setPage(n)
  }, [])

  return (
    <SB title='Pagination' count={page}>
      <Pagination currentPage={page} pagesCount={50} onClick={onClick} />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Pagination'}
}

export {
  handle,
  Z as default
}
