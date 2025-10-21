import {memo} from 'react'

import {useGlobal, useGlobalDispatch} from '~/context'

import Button from '~/components/button'
import Header from '~/components/header'
import Container from '~/components/container'
import SplitPanel from '~/components/split-panel'
import ColumnLayout from '~/components/column-layout'

const Z = memo(({id}) => {
  const data = useGlobal()
  const dispatch = useGlobalDispatch()

  return (
    <SplitPanel header='panel 0' hidePreferencesButton={true}>
      <Container
        fitHeight={true}
        disableContentPaddings={false}
        disableHeaderPaddings={false}
        header={<Header variant='h3'>dispatch to caller</Header>}>
        <ColumnLayout columns={2} borders='all'>
          <Button
            onClick={() => {
              dispatch({action: 'panel_misc_inc_callee'})
            }}
            variant='normal'
            formAction='none'
            fullWidth={true}
            style={{
              fontFamily: 'monospace',
              fontSize: '1.5em',
              backgroundColor: 'gold',
              color: 'black',
              borderColor: 'black'
            }}>
            {data.panel.misc.counter.callee}++
          </Button>

          <div
            style={{
              display: 'grid',
              placeContent: 'center',
              height: '100%',
              fontFamily: 'monospace',
              fontSize: '1.5em',
              fontWeight: '700',
              backgroundColor: 'lightblue',
              color: 'black'
            }}>
            {data.panel.misc.counter.caller}
          </div>
        </ColumnLayout>
      </Container>
    </SplitPanel>
  )
})

export {
  Z as default
}
