import {forwardRef, useRef, memo} from 'react'
import {useStickyScrollbar} from './use-sticky-scrollbar'
import {useMergeRefs} from '../../internal/hooks/use-merge-refs'
import clsx from 'clsx'
import styles from './styles.css.js'
import {useBrowserScrollbarSize} from '../../internal/utils/browser-scrollbar-size'

const StickyScrollbar = memo(
  forwardRef(({wrapperRef, tableRef, onScroll, hasStickyColumns}, ref) => {
    const scrollbarRef = useRef(null)
    const scrollbarContentRef = useRef(null)
    const mergedRef = useMergeRefs(ref, scrollbarRef)
    const offsetScrollbar =
      hasStickyColumns || useBrowserScrollbarSize().height === 0

    useStickyScrollbar(
      scrollbarRef,
      scrollbarContentRef,
      tableRef,
      wrapperRef,
      offsetScrollbar
    )
    return (
      <div
        ref={mergedRef}
        className={clsx(
          styles['sticky-scrollbar'],
          offsetScrollbar && styles['sticky-scrollbar-offset'],
          styles['is-visual-refresh']
        )}
        onScroll={onScroll}>
        <div
          ref={scrollbarContentRef}
          className={styles['sticky-scrollbar-content']}
        />
      </div>
    )
  })
)

export {
  StickyScrollbar as default
}
