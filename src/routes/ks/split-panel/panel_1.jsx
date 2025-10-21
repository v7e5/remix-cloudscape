import {memo} from 'react'

import SplitPanel from '~/components/split-panel'

const Z = memo(({id}) => {
  return (
    <SplitPanel header='panel 1' hidePreferencesButton={true}>
      <div
        className='gridbg'
        style={{
          '--bg': 'var(--red-50v)',
          padding: '1em'
        }}>
        <div
          className='gridbg'
          style={{
            '--bg': 'var(--orange-30v)',
            padding: '1em'
          }}>
          <div
            className='gridbg'
            style={{
              '--bg': 'var(--yellow-20v)',
              padding: '1em'
            }}>
            <div
              className='gridbg'
              style={{
                '--bg': 'var(--green-cool-20v)',
                padding: '1em'
              }}>
              <div
                className='gridbg'
                style={{
                  '--bg': 'var(--blue-cool-50v)',
                  padding: '1em'
                }}>
                <div
                  className='gridbg'
                  style={{
                    '--bg': 'var(--indigo-30v)',
                    padding: '1em'
                  }}>
                  <div
                    className='gridbg'
                    style={{
                      '--bg': 'var(--violet-50v)',
                      padding: '1em'
                    }}>
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SplitPanel>
  )
})

export {
  Z as default
}
