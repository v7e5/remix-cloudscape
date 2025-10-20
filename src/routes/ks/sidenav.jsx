import {memo, useCallback, useEffect} from 'react'
import Badge from '~/components/badge'
import Tiles from '~/components/tiles'
import {useGlobalDispatch} from '~/context'
import {SB} from '~/shell/cont'

const items = {
  simple: [
    {type: 'link', text: 'Page 1', to: '#/'},
    {type: 'link', text: 'Page 2', to: '#/'},
    {type: 'link', text: 'Page 3', to: '#/'},
    {type: 'link', text: 'Page 4', to: '#/'},
    {type: 'divider'},
    {
      type: 'link',
      text: 'Notifications',
      to: '#/',
      info: <Badge color='red'>23</Badge>
    },
    {
      type: 'link',
      text: 'Documentation',
      to: 'https://example.com',
      external: true
    }
  ],
  sections: [
    {type: 'link', text: 'Page 1', to: '#/'},
    {type: 'link', text: 'Page 2', to: '#/'},
    {
      type: 'section',
      text: 'Section 1',
      items: [
        {
          type: 'link',
          text: 'Page 4',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Page 5',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Page 6',
          to: '#/'
        }
      ]
    },
    {
      type: 'section',
      defaultExpanded: true,
      text: 'Section 2',
      items: [
        {
          type: 'link',
          text: 'Page 7',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Page 8',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Page 9',
          to: '#/'
        }
      ]
    }
  ],
  section_groups: [
    {type: 'link', text: 'Page 1', to: '#/'},
    {type: 'divider'},
    {
      type: 'section-group',
      title: 'Section group',
      items: [
        {
          type: 'link',
          text: 'Page 2',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Page 3',
          to: '#/'
        }
      ]
    },
    {type: 'divider'},
    {
      type: 'section-group',
      title: 'Section group',
      items: [
        {
          type: 'link',
          text: 'Page 4',
          to: '#/'
        },
        {
          type: 'section',
          text: 'Section',
          items: [
            {
              type: 'link',
              text: 'Page 5',
              to: '#/'
            },
            {
              type: 'link',
              text: 'Page 6',
              to: '#/'
            }
          ]
        },
        {
          type: 'link',
          text: 'Page 7',
          to: '#/'
        },
        {
          type: 'expandable-link-group',
          text: 'Expandable link group',
          to: '#/-link-group',
          items: [
            {
              type: 'link',
              text: 'Page 8',
              to: '#/'
            },
            {
              type: 'link',
              text: 'Page 9',
              to: '#/'
            }
          ]
        },
        {
          type: 'link',
          text: 'Page 10',
          to: '#/'
        },
        {
          type: 'link-group',
          text: 'Link group',
          to: '#/-group',
          items: [
            {
              type: 'link',
              text: 'Page 11',
              to: '#/'
            },
            {
              type: 'link',
              text: 'Page 12',
              to: '#/'
            }
          ]
        },
        {
          type: 'link',
          text: 'Page 13',
          to: '#/'
        }
      ]
    },
    {type: 'divider'},
    {
      type: 'section-group',
      title: 'Section group',
      items: [
        {
          type: 'link',
          text: 'Page',
          to: '#/'
        },
        {
          type: 'section',
          text: 'Section',
          items: [
            {
              type: 'link',
              text: 'Page 15',
              to: '#/'
            },
            {
              type: 'link',
              text: 'Page 16',
              to: '#/'
            }
          ]
        }
      ]
    },
    {
      type: 'link',
      text: 'Notifications',
      to: '#/',
      info: <Badge color='red'>23</Badge>
    },
    {
      type: 'link',
      text: 'External Link',
      to: '#/',
      external: true,
      externalIconAriaLabel: 'Opens in a new tab'
    }
  ],
  expandable_link_groups: [
    {type: 'link', text: 'Page 1', to: '#/'},
    {type: 'link', text: 'Page 2', to: '#/'},
    {
      type: 'expandable-link-group',
      text: 'Parent page',
      to: '#/',
      items: [
        {
          type: 'link',
          text: 'Child page 1',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Child page 2',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Child page 3',
          to: '#/'
        }
      ]
    },
    {type: 'link', text: 'Page 4', to: '#/'},
    {type: 'link', text: 'Page 5', to: '#/'}
  ],
  link_groups: [
    {
      type: 'link-group',
      text: 'View resources page',
      to: '#/',
      items: [
        {
          type: 'link',
          text: 'Resource page 1',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Resource page 2',
          to: '#/'
        },
        {
          type: 'link',
          text: 'Resource page 3',
          to: '#/'
        }
      ]
    },
    {type: 'link', text: 'Page 1', to: '#/'},
    {type: 'link', text: 'Page 2', to: '#/'},
    {type: 'link', text: 'Page 3', to: '#/'}
  ]
}

const Z = memo(() => {
  const globalDispatch = useGlobalDispatch()

  useEffect(() => {
    return () => {
      globalDispatch({
        action: 'sidenav_set',
        items: []
      })
    }
  }, [])

  const setNav = useCallback(({value}) => {
    globalDispatch({
      action: 'sidenav_set',
      items: items[value] ?? []
    })
  }, [])

  return (
    <SB title='Side navigation'>
      <Tiles
        onChange={setNav}
        value={''}
        items={[
          {
            label: 'Reset',
            value: undefined
          },
          {
            label: 'Simple',
            value: 'simple'
          },
          {
            label: 'Sections',
            value: 'sections'
          },
          {
            label: 'Section groups',
            value: 'section_groups'
          },
          {
            label: 'Expandable link groups',
            value: 'expandable_link_groups'
          },
          {
            label: 'Link groups',
            value: 'link_groups'
          }
        ]}
      />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Side navigation'}
}

export {
  handle,
  Z as default
}
