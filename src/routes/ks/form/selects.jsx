import {memo} from 'react'
import Badge from '~/components/badge'
import ColumnLayout from '~/components/column-layout'
import Container from '~/components/container'
import FormField from '~/components/form-field'
import Header from '~/components/header'
import Multiselect from '~/components/multiselect'
import Select from '~/components/select'
import SpaceBetween from '~/components/space-between'
import Blue from './blue'
import ColorBox from './colorbox'
import Green from './green'
import MultiselectAsync from './multiselect_async'
import Red from './red'
import SelectAsync from './select_async'

const Z = memo(
  ({rgb_select, rgb_multiselect, rgb_select_async, rgb_multiselect_async}) => {
    return (
      <Container
        fitHeight={false}
        disableContentPaddings={false}
        disableHeaderPaddings={false}
        header={
          <Header variant='h2' id='selects'>
            Selects
          </Header>
        }>
        <ColumnLayout columns={2} borders='all'>
          <FormField label='select' stretch={true}>
            <Select
              name='rgb_select'
              value={rgb_select}
              placeholder='pick a color'
              filteringType='auto'
              onChange={(...a) => {
                console.log('-0-chan', a)
              }}
              onBlur={(...a) => {
                console.log('-0-blur', a)
              }}
              onFocus={(...a) => {
                console.log('-0-focus', a)
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

          <FormField label='multiselect' stretch={true}>
            <Multiselect
              name='rgb_multiselect'
              value={[rgb_multiselect].flat()}
              placeholder='pick colors'
              filteringType='auto'
              onChange={(...a) => {
                console.log('-0-chan', a)
              }}
              onBlur={(...a) => {
                console.log('-0-blur', a)
              }}
              onFocus={(...a) => {
                console.log('-0-focus', a)
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

          <FormField
            label={
              <>
                <span>select async </span>
                {!!rgb_select_async && <Badge>{rgb_select_async}</Badge>}
              </>
            }
            stretch={true}>
            <SelectAsync/>
          </FormField>

          <FormField
            label={
              <>
                <span>multiselect async </span>
                {!!rgb_multiselect_async && (
                  <SpaceBetween direction='horizontal' size='xxs'>
                    {[rgb_multiselect_async].flat().map((e, i) => (
                      <Badge key={i}>{e}</Badge>
                    ))}
                  </SpaceBetween>
                )}
              </>
            }
            stretch={true}>
            <MultiselectAsync/>
          </FormField>
        </ColumnLayout>
      </Container>
    )
  }
)

export {
  Z as default
}
