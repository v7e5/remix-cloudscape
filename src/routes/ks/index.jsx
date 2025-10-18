import {memo} from 'react'
import {useMatches} from 'react-router'
import Badge from '~/components/badge'
import ColumnLayout from '~/components/column-layout'
import Container from '~/components/container'
import Header from '~/components/header'
import Link from '~/components/link'
import SpaceBetween from '~/components/space-between'

import {CLWrap} from './x'

const el = {
  alert: true,
  applayout: true,
  autosuggest: true,
  badge: true,
  box: true,
  breadcrumbgroup: true,
  button: true,
  buttondropdown: true,
  calendar: true,
  cards: true,
  checkbox: true,
  columnlayout: true,
  container: true,
  contentlayout: true,
  dateinput: true,
  datepicker: true,
  drawer: true,
  expandablesection: true,
  fileupload: true,
  flashbar: true,
  formcontainer: true,
  formfield: true,
  grid: true,
  header: true,
  icon: true,
  input: true,
  link: true,
  modal: true,
  multiselect: true,
  pagination: true,
  popover: true,
  progressbar: true,
  propertyfilter: true,
  radiogroup: true,
  segmentedcontrol: true,
  select: true,
  sidenavigation: true,
  spacebetween: true,
  spinner: true,
  splitpanel: true,
  statusindicator: true,
  table: true,
  tabs: true,
  textarea: true,
  textcontent: true,
  textfilter: true,
  tiles: true,
  timeinput: true,
  toggle: true,
  tokengroup: true,
  topnavigation: true
}

const X = memo(() => {
  const nav = useMatches()?.find(e => e.id === 'routes/ks/route')?.handle
    .sidenav.items
  console.log(nav)

  return (
    <CLWrap title='elements' count={Object.keys(el).length}>
      <ColumnLayout columns={4} borders='all'>
        {Object.entries(el).map((e, i) => (
          <Link key={i} to={'./' + e.token}>
            {e[0]}
          </Link>
        ))}
      </ColumnLayout>
    </CLWrap>
  )
})

const Z = memo(() => {
  return (
    <ol>
      <li>alert</li>
      <li>app-layout</li>
      <li>autosuggest</li>
      <li>badge</li>
      <li>box</li>
      <li>breadcrumb-group</li>
      <li>button</li>
      <li>button-dropdown</li>
      <li>calendar</li>
      <li>cards</li>
      <li>checkbox</li>
      <li>column-layout</li>
      <li>container</li>
      <li>content-layout</li>
      <li>date-input</li>
      <li>date-picker</li>
      <li>drawer</li>
      <li>expandable-section</li>
      <li>file-upload</li>
      <li>flashbar</li>
      <li>form</li>
      <li>form-field</li>
      <li>grid</li>
      <li>header</li>
      <li>icon</li>
      <li>input</li>
      <li>link</li>
      <li>loading-bar</li>
      <li>modal</li>
      <li>multiselect</li>
      <li>pagination</li>
      <li>popover</li>
      <li>progress-bar</li>
      <li>property-filter</li>
      <li>radio-group</li>
      <li>segmented-control</li>
      <li>select</li>
      <li>side-navigation</li>
      <li>space-between</li>
      <li>spinner</li>
      <li>split-panel</li>
      <li>status-indicator</li>
      <li>table</li>
      <li>tabs</li>
      <li>textarea</li>
      <li>text-content</li>
      <li>text-filter</li>
      <li>tiles</li>
      <li>time-input</li>
      <li>toggle</li>
      <li>token-group</li>
      <li>top-navigation</li>
    </ol>
  )
})

const handle = {
  crumb: {text: '_index'}
}

export {
  handle,
  Z as default
}
