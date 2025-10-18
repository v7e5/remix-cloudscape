import {memo} from 'react'
import clsx from 'clsx'
import {renderDayName} from '../utils/intl'
import styles from '../styles.css.js'

const CalendarGridHeader = memo(({locale, rows}) => {
  return (
    <thead>
      <tr>
        {rows[0]
          .map(date => date.getDay())
          .map(dayIndex => (
            <th
              key={dayIndex}
              scope='col'
              className={clsx(
                styles['calendar-grid-cell'],
                styles['calendar-date-header']
              )}>
              <span aria-hidden='true'>
                {renderDayName(locale, dayIndex, 'short')}
              </span>
            </th>
          ))}
      </tr>
    </thead>
  )
})

export {
  CalendarGridHeader as default
}
