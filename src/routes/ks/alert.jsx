import {memo, useCallback} from 'react'
import Alert from '~/components/alert'
import Button from '~/components/button'
import {SB} from '~/shell/cont'
import {useBase, useBaseDispatch} from './context'

const Z = memo(() => {
  const data = useBase()
  const dispatch = useBaseDispatch()

  const diss = useCallback(ev => {
    dispatch({action: 'alert_toggle'})
  }, [])

  return (
    <SB
      title='Alert'
      actions={
        <Button name='xxx' onClick={diss}>
          {data.alert ? 'hide' : 'show'}
        </Button>
      }>
      {data.alert && (
        <Alert
          dismissible
          onDismiss={diss}
          type='success'
          statusIconAriaLabel='Info'
          action={<Button>Enable versioning</Button>}
          header='Versioning is not enabled'>
          Versioning is not enabled for objects in bucket [IAM-user].
        </Alert>
      )}
    </SB>
  )
})

const handle = {
  crumb: {text: 'Alert'}
}

export {
  handle,
  Z as default
}
