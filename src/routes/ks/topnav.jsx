import {memo} from 'react'
import Input from '~/components/input'
import TopNavigation from '~/components/top-navigation'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Top navigation'>
      <TopNavigation
        identity={{
          to: '/',
          title: 'Title',
          logo: {
            src: '/logo-small-top-navigation.svg',
            alt: '~/'
          }
        }}
        utilities={[
          {
            type: 'button',
            text: 'Link',
            href: 'https://example.com/',
            external: true,
            externalIconAriaLabel: ' (opens in a new tab)'
          },
          {
            type: 'button',
            iconName: 'notification',
            title: 'Notifications',
            ariaLabel: 'Notifications (unread)',
            badge: true,
            disableUtilityCollapse: false
          },
          {
            type: 'menu-dropdown',
            iconName: 'settings',
            ariaLabel: 'Settings',
            title: 'Settings',
            items: [
              {
                id: 'settings-org',
                text: 'Organizational settings'
              },
              {
                id: 'settings-project',
                text: 'Project settings'
              }
            ]
          },
          {
            type: 'menu-dropdown',
            text: 'Customer Name',
            description: 'email@example.com',
            iconName: 'user-profile',
            items: [
              {id: 'profile', text: 'Profile'},
              {id: 'preferences', text: 'Preferences'},
              {id: 'security', text: 'Security'},
              {
                id: 'support-group',
                text: 'Support',
                items: [
                  {
                    id: 'documentation',
                    text: 'Documentation',
                    href: '#',
                    external: true,
                    externalIconAriaLabel: ' (opens in new tab)'
                  },
                  {id: 'support', text: 'Support'},
                  {
                    id: 'feedback',
                    text: 'Feedback',
                    href: '#',
                    external: true,
                    externalIconAriaLabel: ' (opens in new tab)'
                  }
                ]
              },
              {id: 'signout', text: 'Sign out'}
            ]
          }
        ]}
        search={
          <Input type='search' placeholder='Search' ariaLabel='Search' />
        }
      />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Top navigation'}
}

export {
  handle,
  Z as default
}
