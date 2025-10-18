import {reactRouter} from '@react-router/dev/vite'
import {defineConfig} from 'vite'
import {resolve} from 'path'

const config = defineConfig({
  plugins: [reactRouter()],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src')
    }
  },
  server: {
    allowedHosts: true
  }
})

export {
  config as default
}
