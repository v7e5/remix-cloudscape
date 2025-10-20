import {create} from 'mutative'
import {createContext, useContext, useReducer} from 'react'

const GlobalContext = createContext(null)
const GlobalDispatchContext = createContext(null)

const base = {
  activeDrawers: [],
  panel: {
    id: undefined,
    size: 0,
    open: true,
    position: ['bottom', 'side'][0],
    misc: {
      counter: {caller: 0, callee: 0}
    }
  },
  flash: {
    stacked: true,
    items: []
  },
  sidenav: {
    open: true,
    header: undefined,
    items: []
  }
}

const next = (draft, {action, ...rest}) => {
  switch (action) {
    case 'update_drawers': {
      const [id, checked] = rest.item
      if (checked) {
        draft.activeDrawers.push(id)
      } else {
        draft.activeDrawers = draft.activeDrawers.filter(e => e !== id)
      }
      break
    }
    case 'panel_select': {
      draft.panel.id = rest.id
      break
    }
    case 'panel_toggle': {
      draft.panel.open = rest.open
      break
    }
    case 'panel_position': {
      draft.panel.position = rest.position
      break
    }
    case 'panel_size': {
      draft.panel.size = rest.size
      break
    }
    case 'panel_misc_inc_caller': {
      ++draft.panel.misc.counter.caller
      break
    }
    case 'panel_misc_inc_callee': {
      ++draft.panel.misc.counter.callee
      break
    }
    case 'flash_stacked': {
      draft.flash.stacked = !draft.flash.stacked
      break
    }
    case 'flash_set': {
      draft.flash.items = [...rest.items, ...draft.flash.items]
      break
    }
    case 'flash_unset': {
      draft.flash.items = draft.flash.items.filter(
        e => !rest.ids.includes(e.id)
      )
      break
    }
    case 'sidenav_set': {
      draft.sidenav.items = rest.items
      draft.sidenav.open = true
      break
    }
    case 'sidenav_toggle': {
      draft.sidenav.open = rest.open
      break
    }
  }
}
const reducer = create(next)

const GlobalProvider = ({children}) => {
  const [data, dispatch] = useReducer(reducer, base)

  return (
    <GlobalContext.Provider value={data}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalContext.Provider>
  )
}

const useGlobal = () => useContext(GlobalContext)
const useGlobalDispatch = () => useContext(GlobalDispatchContext)

export {
  useGlobal,
  useGlobalDispatch,
  GlobalProvider
}
