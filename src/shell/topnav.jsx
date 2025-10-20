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

      <div>
        <Toggle/>
        <img
          width='16'
          height='16'
          decoding='async'
          src='/dark-mode.svg'
          style={{color: 'transparent', marginTop: '3px'}}
        />
      </div>
    </div>
  )
})

export {
  Z as default
}
