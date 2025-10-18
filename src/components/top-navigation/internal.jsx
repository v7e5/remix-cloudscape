import {memo} from 'react'
import {Link} from 'react-router'
import clsx from 'clsx'
import {getBaseProps} from '../internal/base-component'
import VisualContext from '../internal/components/visual-context'
import {useTopNavigation} from './use-top-navigation'
import Utility from './utility'
import styles from './styles.css.js'
import {useInternalI18n} from '../i18n/context'

const InternalTopNavigation = memo(
  ({
    __internalRootRef,
    identity,
    i18nStrings,
    utilities,
    search,
    ...restProps
  }) => {
    const baseProps = getBaseProps(restProps)
    const {
      mainRef,
      breakpoint,
      responsiveState,
      isSearchExpanded,
      onSearchUtilityClick
    } = useTopNavigation({identity, search, utilities})

    const isNarrowViewport = breakpoint === 'default'
    const isMediumViewport = breakpoint === 'xxs'
    const isLargeViewport = breakpoint === 's'
    const i18n = useInternalI18n('top-navigation')
    const menuTriggerVisible =
      !isSearchExpanded && responsiveState.hideUtilities
    const showIdentity = !isSearchExpanded
    const showTitle = !responsiveState.hideTitle
    const showSearchSlot =
      search && (!responsiveState.hideSearch || isSearchExpanded)
    const showSearchUtility = search && responsiveState.hideSearch
    const showUtilities = !isSearchExpanded
    const showMenuTrigger = menuTriggerVisible

    return (
      <div {...baseProps} ref={__internalRootRef}>
        <VisualContext contextName='top-navigation'>
          <header
            ref={mainRef}
            aria-hidden={void 0}
            className={clsx(styles['top-navigation'], {
              [styles.virtual]: false,
              [styles.hidden]: false,
              [styles.narrow]: isNarrowViewport,
              [styles.medium]: isMediumViewport
            })}>
            <div className={styles['padding-box']}>
              {showIdentity && (
                <div
                  className={clsx(
                    styles.identity,
                    !identity.logo && styles['no-logo']
                  )}>
                  <Link className={styles['identity-link']} to={identity.to}>
                    {identity.logo && (
                      <img
                        role='img'
                        src={identity.logo?.src}
                        alt={identity.logo?.alt}
                        className={clsx(styles.logo, {
                          [styles.narrow]: isNarrowViewport
                        })}
                      />
                    )}
                    {showTitle && (
                      <span className={styles.title}>{identity.title}</span>
                    )}
                  </Link>
                </div>
              )}
              {showSearchSlot && (
                <div className={styles.inputs}>
                  <div
                    className={clsx(
                      styles.search,
                      isSearchExpanded && styles['search-expanded']
                    )}>
                    {search}
                  </div>
                </div>
              )}
              <div className={styles.utilities}>
                {showSearchUtility && (
                  <div
                    className={clsx(
                      styles['utility-wrapper'],
                      styles['utility-type-button'],
                      styles['utility-type-button-link'],
                      {
                        [styles.narrow]: isNarrowViewport,
                        [styles.medium]: isMediumViewport
                      }
                    )}
                    data-utility-special='search'>
                    <Utility
                      hideText={true}
                      definition={{
                        type: 'button',
                        iconName: isSearchExpanded ? 'close' : 'search',
                        ariaLabel: isSearchExpanded
                          ? i18n(
                              'i18nStrings.searchDismissIconAriaLabel',
                              i18nStrings?.searchDismissIconAriaLabel
                            )
                          : i18n(
                              'i18nStrings.searchIconAriaLabel',
                              i18nStrings?.searchIconAriaLabel
                            ),
                        onClick: onSearchUtilityClick
                      }}
                    />
                  </div>
                )}
                {showUtilities &&
                  utilities
                    .filter(
                      (_utility, i) =>
                        !responsiveState.hideUtilities ||
                        responsiveState.hideUtilities.indexOf(i) === -1
                    )
                    .map((utility, i) => {
                      const hideText = !!responsiveState.hideUtilityText
                      const isLast =
                        !showMenuTrigger && i === utilities.length - 1
                      const offsetRight =
                        isLast && isLargeViewport
                          ? 'xxl'
                          : isLast
                            ? 'l'
                            : void 0
                      return (
                        <div
                          key={i}
                          className={clsx(
                            styles['utility-wrapper'],
                            styles[`utility-type-${utility.type}`],
                            utility.type === 'button' &&
                              styles[
                                `utility-type-button-${
                                  utility.variant ?? 'link'
                                }`
                              ],
                            {
                              [styles.narrow]: isNarrowViewport,
                              [styles.medium]: isMediumViewport
                            }
                          )}
                          data-utility-index={i}
                          data-utility-hide={`${hideText}`}>
                          <Utility
                            hideText={hideText}
                            definition={utility}
                            offsetRight={offsetRight}
                          />
                        </div>
                      )
                    })}
              </div>
            </div>
          </header>
        </VisualContext>
      </div>
    )
  }
)

export {
  InternalTopNavigation as default
}
