import {memo, useCallback, useState} from 'react'
import Box from '~/components/box'
import ColumnLayout from '~/components/column-layout'
import FormField from '~/components/form-field'
import RadioGroup from '~/components/radio-group'
import SpaceBetween from '~/components/space-between'
import {SB} from '~/shell/cont'

const X = memo(({children}) => (
  <div
    style={{
      backgroundColor: 'var(--gray-5)',
      border: '3px solid var(--blue-50v)',
      fontFamily: 'monospace',
      fontSize: '2em',
      color: 'var(--gray-90)',
      padding: '0.5em'
    }}>
    {children}
  </div>
))

const _base = {
  direction: '',
  size: '',
  alignItems: ''
}

const Z = memo(() => {
  const [SBProps, setSBProps] = useState(_base)

  const onChange = useCallback(ev => {
    const fd = new FormData(ev.currentTarget)
    setSBProps({..._base, ...Object.fromEntries([...fd.entries()])})
  }, [])

  return (
    <SB title='Space between'>
      <SpaceBetween size='l'>
        <form onChange={onChange}>
          <ColumnLayout columns={3} borders='vertical'>
            <FormField label='direction' stretch={true}>
              <RadioGroup
                data-layout='horizontal'
                name='direction'
                items={[
                  {
                    label: '\u200B',
                    value: ''
                  },
                  {
                    label: 'vertical',
                    value: 'vertical'
                  },
                  {
                    label: 'horizontal',
                    value: 'horizontal'
                  }
                ]}
              />
            </FormField>

            <FormField label='size' stretch={true}>
              <RadioGroup
                data-layout='horizontal'
                name='size'
                items={[
                  {
                    label: '\u200B',
                    value: ''
                  },
                  {label: 'xxxs', value: 'xxxs'},
                  {label: 'xxs', value: 'xxs'},
                  {label: 'xs', value: 'xs'},
                  {label: 's', value: 's'},
                  {label: 'm', value: 'm'},
                  {label: 'l', value: 'l'},
                  {label: 'xl', value: 'xl'},
                  {label: 'xxl', value: 'xxl'}
                ]}
              />
            </FormField>

            <FormField label='alignItems' stretch={true}>
              <RadioGroup
                data-layout='horizontal'
                name='alignItems'
                items={[
                  {
                    label: '\u200B',
                    value: ''
                  },
                  {label: 'center', value: 'center'},
                  {label: 'start', value: 'start'},
                  {label: 'end', value: 'end'}
                ]}
              />
            </FormField>
          </ColumnLayout>
        </form>

        <SpaceBetween {...SBProps}>
          {'ABCDEFG'.split('').map(e => (
            <X key={e}>{e}</X>
          ))}
        </SpaceBetween>
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Space between'}
}

export {
  handle,
  Z as default
}
