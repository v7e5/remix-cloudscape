import {memo, useState} from 'react'
import Calendar from '~/components/calendar'
import ColumnLayout from '~/components/column-layout'
import Container from '~/components/container'
import DateInput from '~/components/date-input'
import DatePicker from '~/components/date-picker'
import FormField from '~/components/form-field'
import Header from '~/components/header'
import SpaceBetween from '~/components/space-between'
import TimeInput from '~/components/time-input'

const Z = memo(({cal_date, date_input, time_input, date_picker}) => {
  const [value, setValue] = useState('')

  return (
    <Container
      fitHeight={false}
      disableContentPaddings={false}
      disableHeaderPaddings={false}
      header={
        <Header variant='h2' id='datetimes'>
          Dates &amp; Times
        </Header>
      }>
      <ColumnLayout columns={2} borders='all'>
        <SpaceBetween size='xxl'>
          <FormField label='date picker' stretch={true}>
            <DatePicker
              name='date_picker'
              value={date_picker}
              onChange={(...a) => {
                console.log('-0-onchange', a)
              }}
            />
          </FormField>

          <FormField label='time input' stretch={true}>
            <TimeInput name='time_input' value={time_input} />
          </FormField>

          <FormField label='date input' stretch={true}>
            <DateInput
              name='date_input'
              value={date_input}
              onChange={({value}) => {
                console.log('-0-onchange', value)
              }}
              onBlur={(...a) => {
                console.log('-0-onblur', a)
              }}
              onFocus={(...a) => {
                console.log('-0-onfocus', a)
              }}
            />
          </FormField>
        </SpaceBetween>

        <SpaceBetween size='s' alignItems='center'>
          <FormField label='calendar' stretch={true}>
            <Calendar
              name='cal_date'
              value={cal_date}
              granularity='day'
              onChange={(...a) => {
                console.log('onchange')
                console.log(a)
              }}
            />
          </FormField>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  )
})

export {
  Z as default
}
