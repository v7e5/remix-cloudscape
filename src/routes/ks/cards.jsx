import {memo, useEffect} from 'react'
import {useFetcher} from 'react-router'
import Badge from '~/components/badge'
import Cards from '~/components/cards'
import Header from '~/components/header'
import {delay} from '~/util'
import colordb from '~/util/colordb'

const action = async ({request}) => delay(colordb, 0)

const cardDefinition = {
  sections: [
    {
      id: 'id',
      content: e => e.id
    },
    {
      id: 'color',
      header: 'Color',
      content: e => (
        <span
          style={{
            backgroundColor: '#' + e.hex,
            width: '100%',
            display: 'inline-block'
          }}>
          &nbsp;
        </span>
      )
    },
    {
      id: 'token',
      header: 'Token',
      content: e => (
        <Badge color='grey'>
          {e.group.replaceAll(' ', '-') + (e.vivid ? '-vivid' : '')}
        </Badge>
      )
    },
    {
      id: 'family',
      header: 'Family',
      content: e => e.group.replaceAll(' ', '-')
    },
    {
      id: 'grade',
      header: 'Grade',
      content: e => e.grade
    },
    {
      id: 'variant',
      header: 'Variant',
      content: e => (e.vivid ? 'vivid' : 'standard')
    },
    {
      id: 'hex',
      header: 'Hex',
      content: e => '#' + e.hex
    }
  ]
}

const ex = ['id']
const _fl = e => !ex.includes(e.id)
const _mp = e => e.id

const visibleSections = cardDefinition.sections.filter(_fl).map(_mp)

const CardHeader = memo(() => {
  const fetcher = useFetcher({key: 'card-colors'})
  const len = fetcher.data?.length

  return (
    <Header variant='awsui-h1-sticky' counter={len && '[' + len + ']'}>
      USWDS system colors
    </Header>
  )
})

const props = {
  cardDefinition,
  cardsPerRow: [
    {cards: 1},
    {
      minWidth: 648,
      cards: 5
    }
  ],
  loadingText: 'artificially slowed loading',
  header: <CardHeader/>,
  stickyHeader: true,
  trackBy: 'id',
  variant: 'full-page',
  visibleSections
}

const voids = Object.fromEntries(
  [
    'ariaLabels',
    'className',
    'empty',
    'entireCardClickable',
    'filter',
    'firstIndex',
    'id',
    'isItemDisabled',
    'onSelectionChange',
    'pagination',
    'preferences',
    'renderAriaLive',
    'selectedItems',
    'selectionType',
    'stickyHeaderVerticalOffset',
    'totalItemsCount'
  ].map(e => [e])
)

const Z = memo(() => {
  const fetcher = useFetcher({key: 'card-colors'})

  useEffect(() => {
    fetcher.submit(null, {method: 'POST'})
  }, [])

  return (
    <Cards
      items={fetcher.data}
      loading={fetcher.state !== 'idle'}
      {...props}
      {...voids}
    />
  )
})

const handle = {
  crumb: {text: 'cards'},
  contentType: 'cards'
}

export {
  action,
  handle,
  Z as default
}
