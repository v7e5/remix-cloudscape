import {memo, useCallback, useState} from 'react'
import Checkbox from '~/components/checkbox'
import Container from '~/components/container'
import FormField from '~/components/form-field'
import Grid from '~/components/grid'
import Header from '~/components/header'
import RadioGroup from '~/components/radio-group'
import SpaceBetween from '~/components/space-between'
import Tiles from '~/components/tiles'
import Toggle from '~/components/toggle'

const gridDefinition = [
  {colspan: 6},
  {colspan: 6},
  {colspan: 1},
  {colspan: 11}
]

const Z = memo(({rgb_check, rgb_toggle, rgb_radio, rgb_tiles}) => {
  rgb_check = [rgb_check].flat()
  rgb_toggle = [rgb_toggle].flat()

  const [rgb, setRGB] = useState({r: false, g: false, b: false})

  const [rad, setRad] = useState(null)

  const blur = useCallback((...a) => {
    console.log('blur', a)
  }, [])

  const chang = useCallback(({name, value, checked}) => {
    console.log('change', name, value, checked)
  }, [])

  const foc = useCallback((...a) => {
    console.log('foc', a)
  }, [])

  const rchang = useCallback(({value}) => {
    console.log('rchange')
    setRad(value)
  }, [])

  return (
    <Container
      fitHeight={false}
      disableContentPaddings={false}
      disableHeaderPaddings={false}
      header={
        <Header variant='h2' id='checks'>
          Checks &amp; Radios
        </Header>
      }>
      <Grid
        data-grid-border
        disableGutters={false}
        gridDefinition={gridDefinition}>
        <FormField label='checkbox' stretch={true}>
          <SpaceBetween size='s' direction='horizontal'>
            <Checkbox
              name='rgb_check'
              value='red'
              checked={rgb_check.includes('red')}
              onChange={chang}>
              red
            </Checkbox>
            <Checkbox
              name='rgb_check'
              value='green'
              checked={rgb_check.includes('green')}>
              green
            </Checkbox>
            <Checkbox
              name='rgb_check'
              value='blue'
              checked={rgb_check.includes('blue')}>
              blue
            </Checkbox>
          </SpaceBetween>
        </FormField>

        <FormField label='toggle' stretch={true}>
          <SpaceBetween size='s' direction='horizontal'>
            <Toggle
              name='rgb_toggle'
              value='red'
              checked={rgb_toggle.includes('red')}>
              red
            </Toggle>
            <Toggle
              name='rgb_toggle'
              value='green'
              checked={rgb_toggle.includes('green')}>
              green
            </Toggle>
            <Toggle
              name='rgb_toggle'
              value='blue'
              checked={rgb_toggle.includes('blue')}>
              blue
            </Toggle>
          </SpaceBetween>
        </FormField>

        <FormField label='radio group' stretch={false}>
          <RadioGroup
            data-layout='horizontal'
            name='rgb_radio'
            value={rgb_radio}
            onChange={(...a) => {
              console.log(a)
            }}
            items={[
              {
                value: 'red',
                label: 'red',
                description: 'rojo'
              },
              {
                value: 'green',
                label: 'green',
                description: 'verde'
              },
              {
                value: 'blue',
                label: 'blue',
                description: 'azul'
              }
            ]}
          />
        </FormField>

        <FormField label='tiles' stretch={true}>
          <Tiles
            name='rgb_tiles'
            value={rgb_tiles}
            columns={3}
            xonChange={(...a) => {
              console.log(a)
            }}
            items={[
              {
                value: 'red',
                label: 'red',
                description: 'rojo',
                image: (
                  <img
                    src='/r.svg'
                    decoding='async'
                    style={{width: '250px', height: '250px'}}
                  />
                )
              },
              {
                value: 'green',
                label: 'green',
                description: 'verde',

                image: (
                  <img
                    src='/g.svg'
                    decoding='async'
                    style={{width: '250px', height: '250px'}}
                  />
                )
              },
              {
                value: 'blue',
                label: 'blue',
                description: 'azul',
                image: (
                  <img
                    src='/b.svg'
                    decoding='async'
                    style={{width: '250px', height: '250px'}}
                  />
                )
              }
            ]}
          />
        </FormField>
      </Grid>
    </Container>
  )
})

export {
  Z as default
}
