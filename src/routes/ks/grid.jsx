import {memo} from 'react'
import Grid from '~/components/grid'
import {SB} from '~/shell/cont'

const X = memo(({children}) => (
  <div
    style={{
      backgroundColor: 'var(--gray-5)',
      border: '3px solid var(--blue-50v)',
      fontFamily: 'monospace',
      color: 'var(--gray-90)',
      padding: '1.5rem'
    }}>
    {children}
  </div>
))

const gridDefinition = [
  {colspan: 2},
  {colspan: 10},
  {colspan: {default: 3, xxs: 9}},
  {colspan: {default: 9, xxs: 3}},
  {colspan: {default: 12, xxs: 6}},
  {colspan: {default: 12, xxs: 6}},
  {colspan: 4},
  {colspan: 4},
  {colspan: 4},
  {colspan: 4},
  {colspan: 4},
  {colspan: 4},
  {colspan: 4, offset: {xxs: 2}},
  {colspan: 4, offset: {xxs: 2, default: 4}},
  {colspan: 9, push: {xxs: 3}},
  {colspan: 3, pull: {xxs: 9}}
]

const Z = memo(() => {
  return (
    <SB title='Grid'>
      <Grid disableGutters={false} gridDefinition={gridDefinition}>
        {gridDefinition.map((e, i) => (
          <X key={i}>{JSON.stringify(e, null, 0)}</X>
        ))}
      </Grid>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Grid'}
}

export {
  handle,
  Z as default
}
