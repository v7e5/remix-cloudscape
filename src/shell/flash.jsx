import {memo, useCallback, useEffect} from 'react'
import {useGlobal, useGlobalDispatch} from '~/context'

import Flashbar from '~/components/flashbar'

const Z = memo(() => {
  const {items, stacked} = useGlobal().flash
  const dispatch = useGlobalDispatch()

  const dismiss = useCallback(id => {
    dispatch({action: 'flash_unset', ids: [id]})
  }, [])

  const onDismiss = useCallback(ev => {
    dismiss(ev.currentTarget.dataset.itemid)
  }, [])

  const timedItems = items.filter(e => !!e.expire)

  useEffect(() => {
    if (timedItems.length === 0) {
      return
    }

    const tids = []
    timedItems.forEach(e => {
      tids.push(setTimeout(dismiss, e.expire, e.id))
    })

    return () => {
      tids.forEach(e => clearTimeout(e))
    }
  }, [timedItems])

  if (items.length === 0) {
    return <></>
  }

  return (
    <Flashbar
      data-flashbar
      items={items}
      onDismiss={onDismiss}
      stackItems={stacked}
    />
  )
})

export {
  Z as default
}
