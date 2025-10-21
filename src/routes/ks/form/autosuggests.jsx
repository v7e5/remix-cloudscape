import {memo} from 'react'
import Autosuggest from '~/components/autosuggest'
import ColumnLayout from '~/components/column-layout'
import Container from '~/components/container'
import FormField from '~/components/form-field'
import Header from '~/components/header'
import AutoSuggestAsync from './autosuggest_async'
import Blue from './blue'
import ColorBox from './colorbox'
import Green from './green'
import Red from './red'

const Z = memo(({autosuggest_static, autosuggest_async}) => {
  return (
    <Container
      fitHeight={false}
      disableContentPaddings={false}
      disableHeaderPaddings={false}
      header={
        <Header variant='h2' id='autosuggests'>
          Auto-suggests
        </Header>
      }>
      <ColumnLayout columns={2} borders='all'>
        <FormField label='static' stretch={true}>
          <Autosuggest
            name='autosuggest_static'
            value={autosuggest_static}
            placeholder='add or pick a color'
            filteringType='auto'
            onBlur={event => {
              console.log('onBlur', event)
            }}
            onChange={({value}) => {
              console.log('onChange', value)
            }}
            onFocus={event => {
              console.log('onFocus', event)
            }}
            onKeyDown={event => {
              console.log('onKeyDown', event)
            }}
            onKeyUp={event => {
              console.log('onKeyUp', event)
            }}
            onLoadItems={({filteringText, firstPage, samePage}) => {
              console.log('onLoadItems', {filteringText, firstPage, samePage})
            }}
            onSelect={({value, selectedOption}) => {
              console.log('onSelect', value, selectedOption)
            }}
            options={[
              {
                label: 'mint cool 50',
                value: '#008480',
                description: '#008480',
                labelTag: 'vivid',
                tags: [+'0x00', +'0x84', +'0x80'].map(e => e.toString()),
                filteringTags: ['mint', 'cool', '50', '#008480', 'vivid'],
                iconSvg: <ColorBox color={'#008480'} />
              },
              {
                label: 'red',
                value: 'red',
                description: 'rgb(255, 0, 0)',
                labelTag: 'rgb(255, 0, 0)',
                tags: ['rojo', 'rot', 'rouge'],
                filteringTags: ['xxx'],
                iconSvg: <Red/>
              },
              {
                label: 'green',
                value: 'green',
                description: 'rgb(0, 255, 0)',
                labelTag: 'rgb(0, 255, 0)',
                tags: ['verde', 'grun', 'vert'],
                filteringTags: ['yyy'],
                iconSvg: <Green/>
              },
              {
                label: 'blue',
                value: 'blue',
                description: 'rgb(0, 0, 255)',
                labelTag: 'rgb(0, 0, 255)',
                tags: ['azul', 'blau', 'bleu'],
                filteringTags: ['zzz'],
                iconSvg: <Blue/>
              }
            ]}
          />
        </FormField>

        <FormField label='async' stretch={true}>
          <AutoSuggestAsync value={autosuggest_async} />
        </FormField>
      </ColumnLayout>
    </Container>
  )
})

export {
  Z as default
}
