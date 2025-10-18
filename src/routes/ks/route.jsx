import {memo} from 'react'
import {Outlet} from 'react-router'
import {BaseProvider} from './context'

import Drawer from './drawer'

const Z = memo(() => (
  <BaseProvider>
    <Outlet/>
  </BaseProvider>
))

const handle = {
  crumb: {text: 'ks', to: '/ks'},
  contentType: 'dashboard',
  sidenav: {
    header: {to: '/ks', text: 'elements'},
    items: [
      {
        type: 'section',
        text: 'form',
        defaultExpanded: true,
        items: [
          {type: 'link', text: '_index', to: '/ks/form'},
          {type: 'link', text: 'autosuggest', to: '/ks/form#autosuggests'},
          {type: 'link', text: 'button', to: '/ks/form#selects'},
          {type: 'link', text: 'button dropdown', to: '/ks/form#selects'},
          {type: 'link', text: 'calendar', to: '/ks/form#datetimes'},
          {type: 'link', text: 'checkbox', to: '/ks/form#checks'},
          {type: 'link', text: 'date input', to: '/ks/form#datetimes'},
          {type: 'link', text: 'date picker', to: '/ks/form#datetimes'},
          {type: 'link', text: 'form container', to: '/ks/form#texts'},
          {type: 'link', text: 'form field', to: '/ks/form#texts'},
          {type: 'link', text: 'input', to: '/ks/form#texts'},
          {type: 'link', text: 'multiselect', to: '/ks/form#selects'},
          {type: 'link', text: 'popover', to: '/ks/form#selects'},
          {type: 'link', text: 'radio group', to: '/ks/form#checks'},
          {type: 'link', text: 'select', to: '/ks/form#selects'},
          {type: 'link', text: 'text area', to: '/ks/form#texts'},
          {type: 'link', text: 'tiles', to: '/ks/form#checks'},
          {type: 'link', text: 'time input', to: '/ks/form#datetimes'},
          {type: 'link', text: 'toggle', to: '/ks/form#checks'}
        ]
      },

      {type: 'divider'},

      {
        type: 'section',
        text: '...rest',
        defaultExpanded: true,
        items: [
          {type: 'link', text: 'alert', to: '/ks/alert'},
          {type: 'link', text: 'badge', to: '/ks/badge'},
          {type: 'link', text: 'box', to: '/ks/box'},
          {type: 'link', text: 'cards', to: '/ks/cards'},
          {type: 'link', text: 'drawer', to: '/ks/drawer'},
          {
            type: 'link',
            text: 'expandable section',
            to: '/ks/expandablesection'
          },
          {type: 'link', text: 'flashbar', to: '/ks/flashbar'},
          {type: 'link', text: 'grid', to: '/ks/grid'},
          {type: 'link', text: 'icon', to: '/ks/icon'},
          {
            type: 'link',
            text: 'modal / segmented control',
            to: '/ks/modal_segmentedcontrol'
          },
          {type: 'link', text: 'pagination', to: '/ks/pagination'},
          {type: 'link', text: 'progress bar', to: '/ks/progressbar'},
          {type: 'link', text: 'property filter', to: '/ks/propertyfilter'},
          {type: 'link', text: 'side navigation', to: '/ks/sidenav'},
          {type: 'link', text: 'spinner', to: '/ks/spinner'},
          {type: 'link', text: 'split panel', to: '/ks/split_panel'},
          {type: 'link', text: 'status indicator', to: '/ks/statusindicator'},
          {
            type: 'expandable-link-group',
            text: 'table',
            to: '/ks/table',
            items: [
              {type: 'link', text: 'expanding rows', to: '/ks/table/expan'}
            ]
          },

          {type: 'link', text: 'tabs', to: '/ks/tabs'},
          {type: 'link', text: 'text content', to: '/ks/textcontent'},
          {type: 'link', text: 'text filter', to: '/ks/textfilter'},
          {type: 'link', text: 'token group', to: '/ks/tokengroup'}
        ]
      },

      {type: 'divider'},

      {type: 'link', text: 'raw form', to: '/ks/form_raw'},
      {type: 'link', text: 'xxx', to: '/ks/xxx'}
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
