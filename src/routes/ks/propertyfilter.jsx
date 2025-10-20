import {memo, useState} from 'react'
import PropertyFilter from '~/components/property-filter'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  const [query, setQuery] = useState({
    tokens: [],
    operation: 'and'
  })

  const [filteringStatusType, setFilteringStatusType] = useState('loading')
  const [filteringOptions, setFilteringOptions] = useState([])

  const fo = [
    {propertyKey: 'color', value: 'red', label: 'RED'},
    {propertyKey: 'color', value: 'green', label: 'GREEN'},
    {propertyKey: 'color', value: 'blue', label: 'BLUE'}
  ]
  const fp = [
    {
      key: 'color',
      operators: ['=', '!=', ':', '!:', '^', '!^'],
      propertyLabel: 'RGB',
      groupValuesLabel: 'RGB values'
    }
  ]

  return (
    <SB title='Property filter'>
      <PropertyFilter
        query={query}
        onChange={o => {
          console.log('ks change', o)
          setQuery(o)
        }}
        onLoadItems={async ({
          filteringProperty,
          filteringOperator,
          filteringText,
          firstPage,
          samePage
        }) => {
          console.log('ks onLoadItems', {
            filteringProperty,
            filteringOperator,
            filteringText,
            firstPage,
            samePage
          })

          await new Promise(r => setTimeout(r, 10000))
          setFilteringOptions(fo)
          setFilteringStatusType('pending')
        }}
        filteringPlaceholder='filter ops'
        countText='xxx matches'
        asyncProperties={false}
        filteringLoadingText='loading'
        filteringStatusType={filteringStatusType}
        filteringOptions={filteringOptions}
        filteringProperties={fp}
      />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Property filter'}
}

export {
  handle,
  Z as default
}
