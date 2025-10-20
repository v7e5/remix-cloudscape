import {memo, useCallback} from 'react'
import Modal from '~/components/modal'
import SegmentedControl from '~/components/segmented-control'
import {useBase, useBaseDispatch} from './context'

const Z = memo(() => {
  const data = useBase()
  const dispatch = useBaseDispatch()

  const onDismiss = useCallback(ev => {
    dispatch({action: 'modal_toggle'})
  }, [])

  const onChange = useCallback(({event, selectedOption}) => {
    dispatch({action: 'modal_size', size: selectedOption.value})
  }, [])

  return (
    <Modal
      onDismiss={onDismiss}
      visible={data.modal}
      size={data.segcon.selected}
      header='head'
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <SegmentedControl
            label='sizes'
            selectedId={data.segcon.selected}
            options={Object.entries(data.segcon.options).map(e => ({
              id: e[0],
              text: e[1],
              name: data.segcon.name,
              value: e[0]
            }))}
            onChange={onChange}
          />
        </div>
      }>
      <div
        style={{
          border: '3px dashed lime',
          color: 'lime',
          height: '50vh',
          display: 'grid',
          placeContent: 'center',
          fontSize: '2em'
        }}>
        {data.segcon.selected}
      </div>
    </Modal>
  )
})

export {
  Z as default
}
