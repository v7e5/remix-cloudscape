import {memo, useState} from 'react'
import useBaseComponent from '../internal/hooks/use-base-component'
import InternalCalendar from './internal'

const nu = [null, undefined]
const not_nu = e => !nu.includes(e)

const Calendar = memo(
  ({
    isDateEnabled = () => true,
    granularity = 'day',
    value,
    name,
    ...props
  }) => {
    const [_value, _setValue] = useState(value ?? null)
    const baseComponentProps = useBaseComponent('Calendar')

    return (
      <>
        <InternalCalendar
          {...props}
          {...baseComponentProps}
          value={_value}
          setValue={_setValue}
          isDateEnabled={isDateEnabled}
          granularity={granularity}
        />
        {[name, _value].every(not_nu) && (
          <input type='hidden' name={name} value={_value} />
        )}
      </>
    )
  }
)

export {
  Calendar as default
}
