import {memo} from 'react'
import {Outlet} from 'react-router'
import {BaseProvider} from './context'
import Drawer from './drawer_comp'

const Z = memo(() => {
  return (
    <BaseProvider>
      <Outlet/>
    </BaseProvider>
  )
})

const handle = {
  crumb: {text: 'Components', to: '/ks'},
  contentType: 'dashboard',
  sidenav: {
    header: {to: '/ks', text: 'Components'},
    items: [
      {type: 'link', text: 'Alert', to: '/ks/alert'},
      {type: 'link', text: 'Autosuggest', to: '/ks/form#autosuggests'},
      {type: 'link', text: 'Badge', to: '/ks/badge'},
      {type: 'link', text: 'Box', to: '/ks/box'},
      {type: 'link', text: 'Breadcrumb group', to: '/ks/breadcrumb'},
      {type: 'link', text: 'Button', to: '/ks/form#selects'},
      {type: 'link', text: 'Button dropdown', to: '/ks/form#selects'},
      {type: 'link', text: 'Calendar', to: '/ks/form#datetimes'},
      {type: 'link', text: 'Cards', to: '/ks/cards'},
      {type: 'link', text: 'Checkbox', to: '/ks/form#checks'},
      {type: 'link', text: 'Column layout', to: '/ks/column-layout'},
      {type: 'link', text: 'Container', to: '/ks/container'},
      {type: 'link', text: 'Content layout', to: '/ks/content-layout'},
      {type: 'link', text: 'Date input', to: '/ks/form#datetimes'},
      {type: 'link', text: 'Date picker', to: '/ks/form#datetimes'},
      {type: 'link', text: 'Drawer', to: '/ks/drawer'},
      {type: 'link', text: 'Expandable section', to: '/ks/expandable-section'},
      {type: 'link', text: 'Flashbar', to: '/ks/flashbar'},
      {type: 'link', text: 'Form container (Form)', to: '/ks/form#texts'},
      {type: 'link', text: 'Form field', to: '/ks/form#texts'},
      {type: 'link', text: 'Grid', to: '/ks/grid'},
      {type: 'link', text: 'Header', to: '/ks/header'},
      {type: 'link', text: 'Icon', to: '/ks/icon'},
      {type: 'link', text: 'Input', to: '/ks/form#texts'},
      {type: 'link', text: 'Link', to: '/ks/link'},
      {type: 'link', text: 'Loading bar', to: '/ks/loading-bar'},
      {type: 'link', text: 'Modal', to: '/ks/modal'},
      {type: 'link', text: 'Multiselect', to: '/ks/form#selects'},
      {type: 'link', text: 'Pagination', to: '/ks/pagination'},
      {type: 'link', text: 'Popover', to: '/ks/form#selects'},
      {type: 'link', text: 'Progress bar', to: '/ks/progressbar'},
      {type: 'link', text: 'Property filter', to: '/ks/propertyfilter'},
      {type: 'link', text: 'Radio group', to: '/ks/form#checks'},
      {type: 'link', text: 'Segmented control', to: '/ks/seg-cont'},
      {type: 'link', text: 'Select', to: '/ks/form#selects'},
      {type: 'link', text: 'Side navigation', to: '/ks/sidenav'},
      {type: 'link', text: 'Space between', to: '/ks/space-between'},
      {type: 'link', text: 'Spinner', to: '/ks/spinner'},
      {type: 'link', text: 'Split panel', to: '/ks/split-panel'},
      {type: 'link', text: 'Status indicator', to: '/ks/status-indicator'},
      {type: 'link', text: 'Table', to: '/ks/table'},
      {type: 'link', text: 'Table (expanding rows)', to: '/ks/table-expan'},
      {type: 'link', text: 'Tabs', to: '/ks/tabs'},
      {type: 'link', text: 'Text area', to: '/ks/form#texts'},
      {type: 'link', text: 'Text content', to: '/ks/textcontent'},
      {type: 'link', text: 'Text filter', to: '/ks/textfilter'},
      {type: 'link', text: 'Tiles', to: '/ks/form#checks'},
      {type: 'link', text: 'Time input', to: '/ks/form#datetimes'},
      {type: 'link', text: 'Toggle', to: '/ks/form#checks'},
      {type: 'link', text: 'Token group', to: '/ks/tokengroup'},
      {type: 'link', text: 'Top navigation', to: '/ks/topnav'}
    ]
  },
  drawer: [
    {
      id: 'drawer_0',
      ariaLabels: {
        drawerName: 'drawer_0'
      },
      content: <Drawer title='drawer_0' />,
      resizable: true,
      onResize: (...a) => {
        console.log('resize', a)
      },
      trigger: {
        iconName: 'security'
      }
    },
    {
      id: 'drawer_1',
      ariaLabels: {
        drawerName: 'drawer_1'
      },
      content: <Drawer title='drawer_1' />,
      resizable: true,
      onResize: (...a) => {
        console.log('resize', a)
      },
      trigger: {
        iconName: 'share'
      }
    }
  ]
}

export {
  handle,
  Z as default
}
