import {memo, useEffect} from 'react'
import {useFetcher, useLocation} from 'react-router'
import Button from '~/components/button'
import ButtonDropdown from '~/components/button-dropdown'
import FormContainer from '~/components/form'
import Header from '~/components/header'
import Popover from '~/components/popover'
import SpaceBetween from '~/components/space-between'
import StatusIndicator from '~/components/status-indicator'
import {delay, fdo} from '~/util'
import colordb from '~/util/colordb'
import Autosuggests from './autosuggests'
import Checks from './checks'
import DateTimes from './datetimes'
import Inputs from './inputs'
import Selects from './selects'

const limit = 10

const _rg_f = e => e.length !== 0
const _s_a = (a, b) => b.matches - a.matches
const _f_b = e => e.matches !== undefined
const _f_a = v => v !== false
const _m_b = v => (v === true ? 'vivid' : v)

const action = async ({request}) => {
  if (request.headers.get('content-type') === 'application/json') {
    const {action, ...opts} = await request.json()

    try {
      switch (action) {
        case 'color': {
          let {firstPage, filteringText, offset} = opts

          if (firstPage || offset === undefined) {
            offset = 0
          }
          filteringText = filteringText.trim()

          let out
          if (filteringText.length !== 0) {
            const rg = new RegExp(
              filteringText.split(' ').filter(_rg_f).join('|'),
              'gi'
            )
            const _m_a = e => ({
              ...e,
              matches: Object.values(e)
                .map(_m_b)
                .filter(_f_a)
                .join(' ')
                .match(rg)?.length
            })

            out = colordb.map(_m_a).filter(_f_b).sort(_s_a)
          } else {
            out = colordb
          }
          const tp = Math.ceil(out.length / limit)
          out = out.slice(0, offset++ * limit + limit)

          if (out.length !== 0) {
            if (offset >= tp) {
              out.at(-1).eof = true
            }
            out.at(-1).offset = offset
          }

          return delay(out, 0)
          break
        }
      }
    } catch (err) {
      return {error: err.message}
    }

    return null
  }

  return fdo(await request.formData())
}

const Z = memo(() => {
  const fetcher = useFetcher()
  const bool = Math.abs(+(fetcher.data?.bool ?? 1) - 1)

  const loc = useLocation()

  useEffect(() => {
    document.getElementById(loc.hash.slice(1))?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    })
  }, [loc.hash])

  return (
    <fetcher.Form method='POST' action='/ks/form/' key={bool}>
      <FormContainer
        header={
          <Header variant='h1' description='sator arepo tenet opera rotas'>
            Form components
          </Header>
        }
        actions={
          <SpaceBetween direction='horizontal' size='xs'>
            <ButtonDropdown
              items={[
                {id: 'ab', text: 'submit'},
                {id: 'cd', text: 'submit'},
                {
                  id: 'ef',
                  text: 'submit',
                  items: [
                    {id: 'gh', text: 'submit'},
                    {id: 'ij', text: 'submit'},
                    {id: 'kl', text: 'submit'},
                    {id: 'mn', text: 'submit'}
                  ]
                }
              ]}
              mainAction={{id: 'vwx', text: 'submit', to: '/ks'}}
              variant='primary'
              expandableGroups
            />
            <Popover
              dismissButton={false}
              position='top'
              size='small'
              triggerType='custom'
              content={
                <StatusIndicator type='success'>
                  Code snippet copied
                </StatusIndicator>
              }>
              <ButtonDropdown
                onItemClick={(ev, o) => {
                  console.log('xxx', this)
                  console.log('route', ev, o)
                }}
                items={[
                  {
                    id: 'op',
                    text: 'group',
                    items: [
                      {
                        id: 'qr',
                        text: 'submit',
                        itemType: 'checkbox',
                        checked: true,
                        disabled: false
                      },
                      {
                        id: 'st',
                        text: 'submit',
                        itemType: 'checkbox',
                        checked: true,
                        disabled: true
                      }
                    ]
                  },
                  {text: 'submit', disabled: false}
                ]}>
                submit
              </ButtonDropdown>
            </Popover>
            <Button variant='primary'>submit</Button>
          </SpaceBetween>
        }>
        <input name='hidden' type='hidden' value={'hidden'} />
        <input name='hidden' type='hidden' value={'hidden again'} />
        <input name='bool' type='hidden' value={bool} />

        {fetcher.data && (
          <pre
            style={{
              backgroundColor: 'var(--gray-90)',
              color: 'var(--blue-20v)',
              padding: '1em',
              overflowY: 'scroll',
              fontSize: '1.5em'
            }}>
            {JSON.stringify(fetcher.data, null, 2)}
          </pre>
        )}

        <SpaceBetween size='xxl'>
          <Inputs {...fetcher.data} />
          <Autosuggests {...fetcher.data} />
          <Checks {...fetcher.data} />
          <DateTimes {...fetcher.data} />
          <Selects {...fetcher.data} />
        </SpaceBetween>
      </FormContainer>
    </fetcher.Form>
  )
})

const handle = {
  crumb: {text: 'Form components'},
  contentType: 'form'
}

export {
  action,
  handle,
  Z as default
}
