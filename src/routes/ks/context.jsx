import {create} from 'mutative'
import {createContext, useContext, useReducer} from 'react'

const BaseContext = createContext(null)
const BaseDispatchContext = createContext(null)

const base = {
  alert: true,
  expsec: false,
  modal: false,
  segcon: {
    name: 'size',
    options: {small: 's', medium: 'm', large: 'l', max: 'x'},
    selected: 'small'
  },
  progress: {
    status: 'in-progress'
  },
  flash: {
    autoclose: false
  },
  tokengroup: {
    items: [
      {
        label: 'Item 1',
        description: 'This is a description for item 1',
        labelTag: 'Label tag 1',
        tags: ['Tag 1', 'Tag 2'],
        dismissLabel: 'Remove item 1',
        iconName: 'share'
      },
      {
        label: 'Item 2',
        description: 'This is a description for item 2',
        labelTag: 'Label tag 2',
        tags: ['Tag 1', 'Tag 2'],
        dismissLabel: 'Remove item 2',
        iconName: 'settings'
      },
      {
        label: 'Item 3',
        description: 'This is a description for item 3',
        labelTag: 'Label tag 3',
        tags: ['Tag 1', 'Tag 2'],
        dismissLabel: 'Remove item 3',
        iconName: 'key'
      }
    ]
  }
}

const next = (draft, {action, ...rest}) => {
  switch (action) {
    case 'alert_toggle': {
      draft.alert = !draft.alert
      break
    }
    case 'expsec_toggle': {
      draft.expsec = !draft.expsec
      break
    }
    case 'modal_toggle': {
      draft.modal = !draft.modal
      break
    }
    case 'modal_size': {
      draft.segcon.selected = rest.size
      break
    }
    case 'progress_toggle': {
      break
    }
    case 'flash_autoclose': {
      draft.flash.autoclose = !draft.flash.autoclose
      break
    }
    case 'tokengroup_dismiss': {
      draft.tokengroup.items.splice(rest.index, 1)
      break
    }
    case 'tokengroup_reset': {
      draft.tokengroup.items = rest.items
      break
    }
  }
}
const reducer = create(next)

const BaseProvider = ({children}) => {
  const [data, dispatch] = useReducer(reducer, base)

  return (
    <BaseContext.Provider value={data}>
      <BaseDispatchContext.Provider value={dispatch}>
        {children}
      </BaseDispatchContext.Provider>
    </BaseContext.Provider>
  )
}

const useBase = () => useContext(BaseContext)
const useBaseDispatch = () => useContext(BaseDispatchContext)

export {
  useBase,
  useBaseDispatch,
  BaseProvider
}
