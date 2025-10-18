import {memo} from 'react'
import TopNavigation from '~/components/top-navigation'

const utilities = [
  {
    type: 'button',
    to: '/ks',
    variant: 'link',
    text: 'kitchen sink',
    iconName: 'gen-ai'
  }
]

const Z = memo(() => {
  return (
    <div id='topnav'>
      <TopNavigation
        identity={{
          to: '/',
          title: '~/',
          logo: {src: '/logo.svg', alt: '~/'}
        }}
        utilities={utilities}
      />
    </div>
  )
})

export {
  Z as default
}
