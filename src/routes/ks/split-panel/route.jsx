import {memo, useCallback, useEffect} from 'react'
import Button from '~/components/button'
import ColumnLayout from '~/components/column-layout'
import Container from '~/components/container'
import FormField from '~/components/form-field'
import Grid from '~/components/grid'
import Header from '~/components/header'
import Input from '~/components/input'
import RadioGroup from '~/components/radio-group'
import SpaceBetween from '~/components/space-between'
import Tiles from '~/components/tiles'
import Toggle from '~/components/toggle'
import {useGlobal, useGlobalDispatch} from '~/context'
import {SB} from '~/shell/cont'
import Panel from './panel'

const Z = memo(() => {
  const globalData = useGlobal()
  const globalDispatch = useGlobalDispatch()

  useEffect(() => {
    globalDispatch({
      action: 'panel_size',
      size: 187
    })
  }, [])

  const selectPanel = useCallback(v => {
    globalDispatch({
      action: 'panel_select',
      id: v.value.length !== 0 ? v.value : undefined
    })
  }, [])

  const setPanelData = useCallback(ev => {
    const o = {}

    switch (ev.target.name) {
      case 'splitPanelOpen': {
        o.action = 'panel_toggle'
        o.open = ev.target.checked
        break
      }
      case 'position': {
        o.action = 'panel_position'
        o.position = ev.target.value
        break
      }
      case 'splitPanelSize': {
        o.action = 'panel_size'
        o.size = Math.abs(+ev.target.value)
        break
      }
    }

    globalDispatch(o)
  }, [])
  return (
    <SB title='Split panel'>
      <Grid
        disableGutters={false}
        gridDefinition={[{colspan: {s: 2, xs: 4}}, {colspan: {s: 10, xs: 8}}]}>
        <FormField label='panel' stretch={false}>
          <Tiles
            onChange={selectPanel}
            value={''}
            items={[
              {
                label: '',
                value: ''
              },
              {
                label: 'panel 0',
                value: 'panel_0'
              },
              {
                label: 'panel 1',
                value: 'panel_1'
              }
            ]}
          />
        </FormField>

        <form
          onChange={setPanelData}
          style={{opacity: !globalData.panel.id ? '0.5' : '1'}}>
          <SpaceBetween size='xxl' direction='vertical'>
            <ColumnLayout columns={3} borders='all' xminColumnWidth={100}>
              <FormField label='open' stretch={true}>
                <Toggle
                  name='splitPanelOpen'
                  disabled={!globalData.panel.id}
                  checked={globalData.panel.open}
                />
              </FormField>

              <FormField label='position' stretch={true}>
                <RadioGroup
                  data-layout='horizontal'
                  name='position'
                  value={globalData.panel.position}
                  items={[
                    {
                      label: 'bottom',
                      value: 'bottom',
                      disabled: !globalData.panel.id
                    },
                    {
                      label: 'side',
                      value: 'side',
                      disabled: !globalData.panel.id
                    }
                  ]}
                  disabled={!globalData.panel.id}
                />
              </FormField>

              <FormField label='size' stretch={true}>
                <Input
                  name='splitPanelSize'
                  type='number'
                  value={globalData.panel.size}
                  disabled={!globalData.panel.id}
                />
              </FormField>
            </ColumnLayout>

            <Container
              fitHeight={true}
              disableContentPaddings={false}
              disableHeaderPaddings={false}
              header={<Header variant='h3'>dispatch to panel </Header>}>
              <ColumnLayout columns={2} borders='all'>
                <Button
                  onClick={() => {
                    globalDispatch({action: 'panel_misc_inc_caller'})
                  }}
                  disabled={!globalData.panel.id}
                  variant='normal'
                  formAction='none'
                  fullWidth={true}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '1.5em',
                    backgroundColor: 'lightblue',
                    color: 'black'
                  }}>
                  {globalData.panel.misc.counter.caller}++
                </Button>

                <div
                  style={{
                    display: 'grid',
                    placeContent: 'center',
                    height: '100%',
                    fontFamily: 'monospace',
                    fontSize: '1.5em',
                    fontWeight: '700',
                    backgroundColor: 'gold',
                    color: 'black'
                  }}>
                  {globalData.panel.misc.counter.callee}
                </div>
              </ColumnLayout>
            </Container>
          </SpaceBetween>
        </form>
      </Grid>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Split panel'},
  panel: <Panel/>
}

export {
  handle,
  Z as default
}
