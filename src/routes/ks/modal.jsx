import {memo, useCallback} from 'react'
import Button from '~/components/button'
import {SB} from '~/shell/cont'
import {useBaseDispatch} from './context'
import Modal from './modal_sc'

const Z = memo(() => {
  const dispatch = useBaseDispatch()

  const onClick = useCallback(ev => {
    dispatch({action: 'modal_toggle'})
  }, [])

  return (
    <SB
      title='Modal'
      actions={
        <Button name='modal' onClick={onClick}>
          open
        </Button>
      }>
      <Modal/>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Modal'}
}

export {
  handle,
  Z as default
}
