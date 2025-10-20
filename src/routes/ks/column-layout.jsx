import {memo} from 'react'
import ColumnLayout from '~/components/column-layout'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Column layout'>
      <ColumnLayout borders='all' columns={3}>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
        <div>Content</div>
      </ColumnLayout>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Column layout'}
}

export {
  handle,
  Z as default
}
