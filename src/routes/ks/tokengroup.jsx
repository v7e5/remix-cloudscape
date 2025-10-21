import {memo, useCallback, useRef} from 'react'
import Button from '~/components/button'
import TokenGroup from '~/components/token-group'
import {SB} from '~/shell/cont'
import {useBase, useBaseDispatch} from './context'

const Z = memo(() => {
  const data = useBase()
  const dispatch = useBaseDispatch()

  const ref = useRef(data.tokengroup.items)

  const dismiss = useCallback(index => {
    dispatch({action: 'tokengroup_dismiss', index})
  }, [])

  const reset = useCallback(i => {
    dispatch({action: 'tokengroup_reset', items: ref.current})
  }, [])

  return (
    <SB title='Token group' actions={<Button onClick={reset}>reset</Button>}>
      <TokenGroup onDismiss={dismiss} items={data.tokengroup.items} />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Token group'}
}

export {
  handle,
  Z as default
}
