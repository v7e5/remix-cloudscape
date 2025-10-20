import {memo, useCallback} from 'react'
import Checkbox from '~/components/checkbox'
import SpaceBetween from '~/components/space-between'
import {useGlobalDispatch} from '~/context'
import {SB} from '~/shell/cont'
import Drawer from './drawer_comp'

const Z = memo(() => {
  const globalDispatch = useGlobalDispatch()

  const selectDrawer = useCallback(({name, value, checked}) => {
    globalDispatch({action: 'update_drawers', item: [value, checked]})
  }, [])

  return (
    <SB title='Drawer'>
      <SpaceBetween size='s' direction='horizontal'>
        <Checkbox value='drawer_0' onChange={selectDrawer}>
          drawer 0
        </Checkbox>
        <Checkbox value='drawer_1' onChange={selectDrawer}>
          drawer 1
        </Checkbox>
        <Checkbox value='drawer_2' onChange={selectDrawer}>
          drawer 2
        </Checkbox>
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Drawer'},
  drawer: {
    id: 'drawer_2',
    ariaLabels: {
      drawerName: 'drawer_2'
    },
    content: <Drawer title='drawer_2' />,
    resizable: true,
    onResize: (...a) => {
      console.log('resize', a)
    },
    trigger: {
      iconName: 'keyboard'
    }
  }
}

export {
  handle,
  Z as default
}
