import {memo, useCallback, useMemo} from 'react'
import Button from '~/components/button'
import Checkbox from '~/components/checkbox'
import ProgressBar from '~/components/progress-bar'
import SpaceBetween from '~/components/space-between'
import Toggle from '~/components/toggle'
import {useGlobal, useGlobalDispatch} from '~/context'
import {SB} from '~/shell/cont'
import {useBase, useBaseDispatch} from './context'

const _items = [
  {
    id: 'fl_info',
    type: 'info',
    header: 'info header',
    content: 'This is an info flash message'
  },
  {
    id: 'fl_warning',
    type: 'warning',
    header: 'warning',
    content: 'This is a warning flash message'
  },
  {
    id: 'fl_error',
    type: 'error',
    action: <Button formAction='none'>xxx</Button>,
    header: 'Failed to update instance id-4890f893e',
    content: 'This is a dismissible error message'
  },
  {
    id: 'fl_success',
    type: 'success',
    header: 'success',
    content: 'you have succeeded'
  },
  {
    id: 'fl_progress',
    type: 'in-progress',
    header: 'progress bar',
    content: (
      <ProgressBar
        label='Progress bar label'
        description='Progress bar description'
        value={37}
        additionalInfo='Additional information'
        variant='flash'
      />
    )
  }
]

const ms = [3000, 1000, 5000, 4000, 2000]

const Z = memo(() => {
  const data = useBase()
  const dispatch = useBaseDispatch()
  const globalData = useGlobal()
  const globalDispatch = useGlobalDispatch()

  const items = useMemo(() => {
    if (!data.flash.autoclose) {
      return _items
    }
    return _items.map((e, i) => ({
      ...e,
      header: e.header + ': (Will auto-close in ' + ms[i] + ' seconds)',
      expire: ms[i]
    }))
  }, [data.flash.autoclose])

  const setFlash = useCallback(
    ({name, value, checked}) => {
      if (checked) {
        globalDispatch({
          action: 'flash_set',
          items: items.filter(e => e.id === value)
        })
      } else {
        globalDispatch({action: 'flash_unset', ids: [value]})
      }
    },
    [data.flash.autoclose]
  )

  const active = globalData.flash.items.map(e => e.id)

  return (
    <SB
      title='Flashbar'
      actions={
        <SpaceBetween size='m' direction='horizontal'>
          <Toggle
            checked={globalData.flash.stacked}
            onChange={() => {
              globalDispatch({action: 'flash_stacked'})
            }}>
            stacked
          </Toggle>
          <Toggle
            onChange={() => {
              dispatch({action: 'flash_autoclose'})
              globalDispatch({
                action: 'flash_unset',
                ids: globalData.flash.items.map(e => e.id)
              })
            }}>
            autoclose
          </Toggle>
        </SpaceBetween>
      }>
      <SpaceBetween size='s' direction='horizontal'>
        {items.map((e, i) => (
          <Checkbox
            key={i}
            value={e.id}
            checked={active.includes(e.id)}
            onChange={setFlash}>
            {e.type + (!!e.expire ? ' (' + e.expire + ' ms)' : '')}
          </Checkbox>
        ))}
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Flashbar'}
}

export {
  handle,
  Z as default
}
