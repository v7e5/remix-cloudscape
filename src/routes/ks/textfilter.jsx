import {memo, useState} from 'react'
import TextFilter from '~/components/text-filter'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  const [v, setv] = useState('')

  return (
    <SB title='Text filter'>
      <TextFilter
        filteringText={v}
        filteringPlaceholder='placeholder'
        countText={`${v.length} matches`}
        onChange={({filteringText}) => {
          console.log('onChange', filteringText)
          setv(filteringText)
        }}
        onDelayedChange={({filteringText}) => {
          console.log('onDelayedChange', filteringText)
        }}
      />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Text filter'}
}

export {
  handle,
  Z as default
}
