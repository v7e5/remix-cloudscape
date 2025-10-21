import {memo} from 'react'
import Link from '~/components/link'
import Tabs from '~/components/tabs'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Tabs'>
      <Tabs
        disableContentPaddings={false}
        fitHeight={true}
        variant={['default', 'container', 'stacked'][0]}
        onChange={(...a) => {
          console.log('onChange', a)
        }}
        tabs={[
          {
            label: 'First tab label',
            id: 'first',
            content: (
              <div>
                <p>First tab content area</p>
                <Link
                  to='./'
                  variant={
                    ['primary', 'secondary', 'info', 'awsui-value-large'][3]
                  }
                  onClick={event => {
                    event.preventDefault()
                    console.log('click', event)
                  }}>
                  link
                </Link>
              </div>
            )
          },
          {
            label: 'Second tab label',
            id: 'second',
            content: 'Second tab content area'
          },
          {
            label: 'Third tab label',
            id: 'third',
            content: 'Third tab content area',
            disabled: false
          }
        ]}
      />
    </SB>
  )
})

const handle = {
  crumb: {text: 'Tabs'}
}

export {
  handle,
  Z as default
}
