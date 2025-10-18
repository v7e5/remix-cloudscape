import {memo, useCallback} from 'react'
import Alert from '~/components/alert'
import Button from '~/components/button'
import {CL} from '~/shell/cont'
import {useBase, useBaseDispatch} from './context'

const Z = memo(() => {
  const data = useBase()
  const dispatch = useBaseDispatch()

  const diss = useCallback(ev => {
    console.log(ev)
    dispatch({action: 'alert_toggle'})
  }, [])

  return (
    <CL
      title='alert'
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
    </CL>
  )
})

const handle = {
  crumb: {text: 'alert'}
}

export {
  handle,
  Z as default
}
