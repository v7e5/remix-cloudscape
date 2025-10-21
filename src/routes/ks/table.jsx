import {memo, useCallback, useEffect} from 'react'
import {useFetcher} from 'react-router'
import Badge from '~/components/badge'
import Header from '~/components/header'
import Input from '~/components/input'
import Table from '~/components/table'
import {delay} from '~/util'
import colordb from '~/util/colordb'

const action = async ({request}) => delay(colordb, 0)

const columnDefinitions = [
  {
    id: 'id',
    cell: e => e.id,
    visible: false
  },
  {
    id: 'color',
    header: 'Color',
    isRowHeader: true,
    cell: e => (
      <span
        style={{
          backgroundColor: '#' + e.hex,
          width: '100%',
          display: 'inline-block'
        }}>
        &nbsp;
      </span>
    ),
    width: 90
  },
  {
    id: 'token',
    header: 'Token',
    cell: e => (
      <Badge color='grey'>
        {e.group.replaceAll(' ', '-') + (e.vivid ? '-vivid' : '')}
      </Badge>
    ),
    sortingField: 'group'
  },
  {
    id: 'family',
    header: 'Family',
    cell: e => e.group.replaceAll(' ', '-'),
    editConfig: {
      ariaLabel: 'ariaLabel token',
      errorIconAriaLabel: 'errorIconAriaLabel token',
      editIconAriaLabel: 'editIconAriaLabel token',
      disabledReason: item => {
        return
      },
      editingCell: (item, {currentValue, setValue}) => {
        return (
          <Input
            type='text'
            autoFocus={true}
            value={currentValue ?? item.group.replaceAll(' ', '-')}
            onChange={event => setValue(event.target.value)}
          />
        )
      },
      validation: (item, value) => {
        console.log('validation', item, value)
        return value === 'xxx' ? 'na' : undefined
      }
    }
  },
  {
    id: 'grade',
    header: 'Grade',
    cell: e => <code>{e.grade}</code>,
    width: 90
  },
  {
    id: 'variant',
    header: 'Variant',
    cell: e => (e.vivid ? 'vivid' : ''),
    width: 90
  },
  {
    id: 'hex',
    header: 'Hex',
    cell: e => <code>{'#' + e.hex}</code>,
    width: 100
  }
]

const _vc = e => (({id, visible = true}) => ({id, visible}))(e)
const columnDisplay = columnDefinitions.map(_vc)

const TableHeader = memo(() => {
  const fetcher = useFetcher({key: 'table-colors'})
  const len = fetcher.data?.length

  return (
    <Header variant='awsui-h1-sticky' counter={len && '[' + len + ']'}>
      USWDS system colors
    </Header>
  )
})

const props = {
  columnDefinitions,
  columnDisplay,
  contentDensity: 'compact',
  enableKeyboardNavigation: false,
  loadingText: 'artificially slowed loading',
  resizableColumns: true,
  sortingDisabled: false,
  sortingDescending: false,
  sortingColumn: columnDefinitions.find(e => e.id === 'token'),
  stickyColumns: {first: 1, last: 0},
  stickyHeader: true,
  stripedRows: true,
  trackBy: 'id',
  variant: 'full-page',
  wrapLines: true,
  header: <TableHeader/>
}

const voids = Object.fromEntries(
  [
    'ariaLabels',
    'empty',
    'expandableRows',
    'filter',
    'firstIndex',
    'footer',
    'getLoadingStatus',
    'pagination',
    'preferences',
    'renderAriaLive',
    'renderLoaderError',
    'renderLoaderLoading',
    'renderLoaderPending',
    'stickyHeaderVerticalOffset',
    'totalItemsCount',
    'visibleColumns',
    'selectionType'
  ].map(e => [e])
)

const Z = memo(() => {
  const fetcher = useFetcher({key: 'table-colors'})

  useEffect(() => {
    fetcher.submit(null, {method: 'POST'})
  }, [])

  const handlers = {
    onColumnWidthsChange: useCallback(({widths}) => {
      console.log('onColumnWidthsChange', widths)
    }, []),

    onRowClick: useCallback(({rowIndex, item}) => {
      console.log('onRowClick', rowIndex, item)
    }, []),

    onRowContextMenu: useCallback(
      ({rowIndex, item, clientX, clientY, event}) => {
        console.log('onRowContextMenu', {
          rowIndex,
          item,
          clientX,
          clientY,
          event
        })
      },
      []
    ),

    onEditCancel: useCallback((...a) => {
      console.log('onEditCancel', a)
    }, []),

    submitEdit: useCallback((...a) => {
      console.log('submitEdit', a)
      return new Promise(r => setTimeout(r, 3000, 'ya'))
    }, []),

    onSelectionChange: useCallback(({selectedItems}) => {
      console.log(
        'onSelectionChange',
        selectedItems.map(e => e.id)
      )
    }, []),

    isItemDisabled: useCallback(item => {
      return
    }, []),

    onSortingChange: useCallback(({sortingColumn, isDescending}) => {
      console.log('onSortingChange', sortingColumn, isDescending)
    }, [])
  }

  return (
    <Table
      items={fetcher.data}
      loading={fetcher.state !== 'idle'}
      selectedItems={[{id: 2}, {id: 3}, {id: 4}]}
      {...props}
      {...handlers}
      {...voids}
    />
  )
})

const handle = {
  crumb: {text: 'Table'},
  contentType: 'table'
}

export {
  action,
  handle,
  Z as default
}
