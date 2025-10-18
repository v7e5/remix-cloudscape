import {memo} from 'react'
import styles from './styles.css.js'
import {applyTrackBy} from '../utils'

const ItemsLoader = memo(
  ({
    item,
    loadingStatus,
    renderLoaderPending,
    renderLoaderLoading,
    renderLoaderError,
    trackBy
  }) => {
    let content = null
    if (loadingStatus === 'pending' && renderLoaderPending) {
      content = renderLoaderPending({item})
    } else if (loadingStatus === 'loading' && renderLoaderLoading) {
      content = <span>{renderLoaderLoading({item})}</span>
    } else if (loadingStatus === 'error' && renderLoaderError) {
      content = <span>{renderLoaderError({item})}</span>
    }
    let parentTrackId = item && trackBy ? applyTrackBy(trackBy, item) : void 0
    parentTrackId = typeof parentTrackId === 'string' ? parentTrackId : void 0
    return (
      <div
        data-root={item ? 'false' : 'true'}
        data-parentrow={parentTrackId}
        className={styles['items-loader']}>
        {content}
      </div>
    )
  }
)

export {
  ItemsLoader
}
