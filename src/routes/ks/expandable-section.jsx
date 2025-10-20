import {memo} from 'react'
import Button from '~/components/button'
import ExpandableSection from '~/components/expandable-section'
import Link from '~/components/link'
import {SB} from '~/shell/cont'
import {useBase, useBaseDispatch} from './context'

const Z = memo(() => {
  const data = useBase()
  const dispatch = useBaseDispatch()

  return (
    <SB
      title='Expandable section'
      actions={
        <Button
          name='expsec'
          onClick={ev => {
            dispatch({action: 'expsec_toggle'})
          }}>
          {data.expsec ? 'contract' : 'expand'}
        </Button>
      }>
      <ExpandableSection
        expanded={data.expsec}
        onChange={({expanded}) => {
          console.log(expanded)
          dispatch({action: 'expsec_toggle'})
        }}
        headerCounter='123'
        headerDescription='secondary desc'
        variant='container'
        headerInfo={<Link variant='info'>Info</Link>}
        headerText='Header'>
        sator arepo tenet opera rotas
      </ExpandableSection>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Expandable section'}
}

export {
  handle,
  Z as default
}
