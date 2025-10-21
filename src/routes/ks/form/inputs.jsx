import {memo} from 'react'
import ColumnLayout from '~/components/column-layout'
import Container from '~/components/container'
import FormField from '~/components/form-field'
import Header from '~/components/header'
import Input from '~/components/input'
import SpaceBetween from '~/components/space-between'
import Textarea from '~/components/textarea'

const Z = memo(({text, password, search, number, email, url, textarea}) => {
  return (
    <Container
      fitHeight={false}
      disableContentPaddings={false}
      disableHeaderPaddings={false}
      header={
        <Header variant='h2' id='texts'>
          Texts
        </Header>
      }>
      <SpaceBetween size='m'>
        <ColumnLayout columns={3} borders='all'>
          <FormField label='text' stretch={true}>
            <Input
              name='text'
              type='text'
              defaultValue={text}
              onBlur={ev => {
                console.log('onBlur', ev.target)
              }}
              onChange={ev => {
                console.log('onChange', ev.target)
              }}
              onFocus={ev => {
                console.log('onFocus', ev.target)
              }}
              onKeyDown={ev => {
                console.log('onKeyDown', ev.target)
              }}
              onKeyUp={ev => {
                console.log('onKeyUp', ev.target)
              }}
            />
          </FormField>
          <FormField label='password' stretch={true}>
            <Input name='password' type='password' defaultValue={password} />
          </FormField>
          <FormField label='search' stretch={true}>
            <Input
              name='search'
              type='search'
              defaultValue={search}
              onBlur={(...a) => {
                console.log('onBlur', a)
              }}
              onChange={(...a) => {
                console.log('onChange', a)
              }}
              onFocus={(...a) => {
                console.log('onFocus', a)
              }}
              onKeyDown={(...a) => {
                console.log('onKeyDown', a)
              }}
              onKeyUp={(...a) => {
                console.log('onKeyUp', a)
              }}
            />
          </FormField>
          <FormField label='number' stretch={true}>
            <Input name='number' type='number' defaultValue={number} />
          </FormField>
          <FormField label='email' stretch={true}>
            <Input name='email' type='email' defaultValue={email} />
          </FormField>
          <FormField label='url' stretch={true}>
            <Input name='url' type='url' defaultValue={url} />
          </FormField>
        </ColumnLayout>

        <FormField label='textarea' stretch={true}>
          <Textarea
            name='textarea'
            defaultValue={textarea?.toUpperCase()}
            onBlur={(...a) => {
              console.log('onBlur', a)
            }}
            onChange={(...a) => {
              console.log('onChange', a)
            }}
            onFocus={(...a) => {
              console.log('onFocus', a)
            }}
            onKeyDown={(...a) => {
              console.log('onKeyDown', a)
            }}
            onKeyUp={(...a) => {
              console.log('onKeyUp', a)
            }}
          />
        </FormField>
      </SpaceBetween>
    </Container>
  )
})

export {
  Z as default
}
