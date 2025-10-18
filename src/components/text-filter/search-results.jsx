import {memo} from 'react'
import styles from './styles.css.js'

const SearchResults = memo(({id, children}) => {
  return (
    <span className={styles.results}>
      <span>
        <span id={id}>{children}</span>
      </span>
    </span>
  )
})

export {
  SearchResults
}
