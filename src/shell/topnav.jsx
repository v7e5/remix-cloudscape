import {memo} from 'react'
import Toggle from '~/components/toggle'
import TopNavigation from '~/components/top-navigation'

const utilities = [
  {
    type: 'button',
    to: '/ks',
    variant: 'link',
    text: 'Kitchen Sink',
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
