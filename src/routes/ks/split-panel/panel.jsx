import {memo} from 'react'

import {useGlobal} from '~/context'

import PanelA from './panel_0'
import PanelB from './panel_1'

const panels_map = {
  panel_0: PanelA,
  panel_1: PanelB
}

const Z = memo(({id}) => {
  const Panel = panels_map[useGlobal().panel.id]

  if (Panel === undefined) {
    return <></>
  }

  return <Panel/>
})

export {
  Z as default
}
