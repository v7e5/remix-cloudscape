import {memo, useCallback, useMemo} from 'react'
import {useFetcher} from 'react-router'
import Multiselect from '~/components/multiselect'
import ColorBox from './colorbox'

const _state_status = {
  idle: 'pending',
  submitting: 'loading',
  loading: 'loading'
}

const Z = memo(() => {
  const fetcher = useFetcher()

  const [options, statusType, offset, errorText] = useMemo(() => {
    if (fetcher.data?.error !== undefined) {
      return [, 'error', , fetcher.data.error]
    }

    return [
      Object.entries(Object.groupBy(fetcher.data ?? [], e => e.group)).map(
        e => ({
          label: e[0],
          options: e[1].map(o => ({
            label: `${o.group} ${o.grade}`,
            value: `#${o.hex}`,
            description: `#${o.hex}`,
            labelTag: o.vivid ? 'vivid' : '',
            tags: [
              +`0x${o.hex[0]}${o.hex[1]}` + '',
              +`0x${o.hex[2]}${o.hex[3]}` + '',
              +`0x${o.hex[4]}${o.hex[5]}` + ''
            ],
            filteringTags: [
              ...o.group.split(' '),
              `${o.grade}`,
              o.hex,
              ...(o.vivid ? ['vivid'] : [])
            ],
            iconSvg: <ColorBox color={'#' + o.hex} />
          }))
        })
      ),

      fetcher.data?.length === 0 || fetcher.data?.at(-1).eof
        ? 'finished'
        : _state_status[fetcher.state],

      fetcher.data?.at(-1)?.offset
    ]
  }, [fetcher.data, fetcher.state])

  const load = useCallback(
    o => {
      fetcher.submit(
        {action: 'color', offset, ...o},
        {method: 'POST', encType: 'application/json'}
      )
    },
    [offset]
  )

  return (
    <Multiselect
      name='rgb_multiselect_async'
      errorText={errorText}
      filteringPlaceholder='filtering placeholder'
      filteringType='manual'
      finishedText='this is the end'
      loadingText='loading'
      options={options}
      placeholder='pick colors'
      recoveryText='recover'
      statusType={statusType}
      empty={'nothingness'}
      onBlur={(...a) => {
        console.log('-0-blur', a)
      }}
      onChange={(...a) => {
        console.log('-0-chan', a)
      }}
      onFocus={(...a) => {
        console.log('-0-focus', a)
      }}
      onLoadItems={load}
    />
  )
})

export {
  Z as default
}
