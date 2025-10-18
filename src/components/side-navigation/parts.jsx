import clsx from 'clsx'
import {memo, useCallback, useEffect, useMemo, useState} from 'react'
import {Link} from 'react-router'
import InternalBox from '../box/internal'
import InternalExpandableSection from '../expandable-section/internal'
import InternalIcon from '../icon/internal'
import styles from './styles.css.js'
import {hasActiveLink} from './util'

const Header = memo(({definition, activeHref}) => (
  <>
    <h2 className={styles.header}>
      <Link
        to={definition.to}
        className={clsx(styles['header-link'], {
          [styles['header-link--has-logo']]: !!definition.logo
        })}
        aria-current={definition.to === activeHref ? 'page' : void 0}>
        {definition.logo && (
          <img
            className={clsx(styles['header-logo'], {
              [styles['header-logo--stretched']]: !definition.text
            })}
            {...definition.logo}
          />
        )}
        <span className={styles['header-link-text']}>{definition.text}</span>
      </Link>
    </h2>
    <Divider isPresentational={true} variant='header' />
  </>
))

const NavigationItemsList = memo(({items, variant, activeHref}) => {
  const lists = []
  let currentListIndex = 0
  lists[currentListIndex] = {
    listVariant: variant,
    items: []
  }
  items.forEach((item, index) => {
    const itemid = index + 1
    switch (item.type) {
      case 'divider': {
        const dividerIndex = lists.length
        lists[dividerIndex] = {
          element: (
            <div data-itemid={`item-${itemid}`}>
              <Divider variant='default' />
            </div>
          )
        }
        currentListIndex = lists.length
        lists[currentListIndex] = {
          listVariant: variant,
          items: []
        }
        return
      }
      case 'link': {
        lists[currentListIndex].items?.push({
          element: (
            <li
              key={index}
              data-itemid={`item-${itemid}`}
              className={styles['list-item']}>
              <XinK definition={item} activeHref={activeHref} />
            </li>
          )
        })
        return
      }
      case 'section': {
        lists[currentListIndex].items?.push({
          element: (
            <li
              key={index}
              data-itemid={`item-${itemid}`}
              className={styles['list-item']}>
              <Section
                definition={item}
                activeHref={activeHref}
                variant={variant}
              />
            </li>
          )
        })
        return
      }
      case 'section-group': {
        lists[currentListIndex].items?.push({
          element: (
            <li
              key={index}
              data-itemid={`item-${itemid}`}
              className={styles['list-item']}>
              <SectionGroup definition={item} activeHref={activeHref} />
            </li>
          )
        })
        return
      }
      case 'link-group': {
        lists[currentListIndex].items?.push({
          element: (
            <li
              key={index}
              data-itemid={`item-${itemid}`}
              className={styles['list-item']}>
              <LinkGroup definition={item} activeHref={activeHref} />
            </li>
          )
        })
        return
      }
      case 'expandable-link-group': {
        lists[currentListIndex].items?.push({
          element: (
            <li
              key={index}
              data-itemid={`item-${itemid}`}
              className={styles['list-item']}>
              <ExpandableLinkGroup
                definition={item}
                activeHref={activeHref}
                variant={variant}
              />
            </li>
          )
        })
        return
      }
    }
  })
  const lastListIndex = lists.length - 1
  return (
    <>
      {lists.map((list, index) => {
        if (!list.items || list.items.length === 0) {
          return (
            <div
              key={`hr-${index}`}
              className={clsx(styles.list, styles[`list-variant-${variant}`], {
                [styles['list-variant-root--last']]:
                  list.listVariant === 'root' && index === lastListIndex
              })}>
              {list.element}
            </div>
          )
        } else {
          return (
            <ul
              key={`list-${index}`}
              className={clsx(
                styles.list,
                styles[`list-variant-${list.listVariant}`],
                {
                  [styles['list-variant-root--last']]:
                    list.listVariant === 'root' && index === lastListIndex
                }
              )}>
              {list.items.map(item => item.element)}
            </ul>
          )
        }
      })}
    </>
  )
})

const Divider = memo(({variant = 'default', isPresentational = false}) => {
  return (
    <hr
      className={clsx(styles.divider, styles[`divider-${variant}`])}
      role={isPresentational ? 'presentation' : void 0}
    />
  )
})

const XinK = memo(({definition, expanded, activeHref}) => (
  <>
    <Link
      to={definition.to}
      className={clsx(styles.link, {
        [styles['link-active']]: definition.to === activeHref
      })}
      target={definition.external ? '_blank' : void 0}
      rel={definition.external ? 'noopener noreferrer' : void 0}
      aria-expanded={expanded}
      aria-current={definition.to === activeHref ? 'page' : void 0}>
      {definition.text}
      {definition.external && (
        <span
          aria-label={definition.externalIconAriaLabel}
          role={definition.externalIconAriaLabel ? 'img' : void 0}>
          <InternalIcon name='external' className={styles['external-icon']} />
        </span>
      )}
    </Link>
    {definition.info && <span className={styles.info}>{definition.info}</span>}
  </>
))

const Section = memo(({definition, activeHref, variant}) => {
  const [expanded, setExpanded] = useState(definition.defaultExpanded ?? false)
  const onExpandedChange = useCallback(
    ({expanded}) => {
      setExpanded(expanded)
    },
    [definition]
  )
  useEffect(() => {
    setExpanded(definition.defaultExpanded ?? false)
  }, [definition])
  return (
    <InternalExpandableSection
      variant='footer'
      expanded={expanded}
      onChange={onExpandedChange}
      className={clsx(
        styles.section,
        variant === 'section-group' && styles['section--no-ident'],
        styles.refresh
      )}
      headerText={definition.text}>
      <NavigationItemsList
        variant='section'
        items={definition.items}
        activeHref={activeHref}
      />
    </InternalExpandableSection>
  )
})

const SectionGroup = memo(({definition, activeHref}) => {
  return (
    <div className={styles['section-group']}>
      <InternalBox className={styles['section-group-title']} variant='h3'>
        {definition.title}
      </InternalBox>
      <NavigationItemsList
        variant='section-group'
        items={definition.items}
        activeHref={activeHref}
      />
    </div>
  )
})

const LinkGroup = memo(({definition, activeHref}) => {
  return (
    <>
      <XinK
        definition={{
          type: 'link',
          to: definition.to,
          text: definition.text,
          info: definition.info
        }}
        activeHref={activeHref}
      />
      <NavigationItemsList
        variant='link-group'
        items={definition.items}
        activeHref={activeHref}
      />
    </>
  )
})

const ExpandableLinkGroup = memo(({definition, activeHref, variant}) => {
  const containsActiveLink = useMemo(() => {
    return activeHref ? hasActiveLink(definition.items, activeHref) : false
  }, [activeHref, definition.items])
  const [expanded, setExpanded] = useState(() => {
    return (
      definition.defaultExpanded ??
      (definition.to === activeHref || containsActiveLink)
    )
  })
  const [userExpanded, setUserExpanded] = useState()
  useEffect(() => setUserExpanded(void 0), [definition])
  useEffect(() => {
    setExpanded(definition.to === activeHref || containsActiveLink)
  }, [definition.to, containsActiveLink, activeHref])
  useEffect(() => {
    if (definition.defaultExpanded !== void 0) {
      setExpanded(definition.defaultExpanded)
    }
  }, [definition])
  const onExpandedChange = useCallback(
    ({expanded}) => {
      setUserExpanded(expanded)
    },
    [definition]
  )

  return (
    <InternalExpandableSection
      className={clsx(
        styles['expandable-link-group'],
        variant === 'section-group' &&
          styles['expandable-link-group--no-ident']
      )}
      variant='navigation'
      expanded={userExpanded ?? expanded}
      onChange={onExpandedChange}
      headerText={
        <XinK
          definition={{
            type: 'link',
            to: definition.to,
            text: definition.text
          }}
          expanded={userExpanded ?? expanded}
          activeHref={activeHref}
        />
      }>
      <NavigationItemsList
        variant='expandable-link-group'
        items={definition.items}
        activeHref={activeHref}
      />
    </InternalExpandableSection>
  )
})

export {
  Header,
  NavigationItemsList
}
