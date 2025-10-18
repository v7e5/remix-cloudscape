import {PassThrough} from 'node:stream'
import {createReadableStreamFromReadable} from '@react-router/node'
import {isbot} from 'isbot'
import {renderToPipeableStream} from 'react-dom/server'
import {ServerRouter} from 'react-router'

const streamTimeout = 5000

const handleRequest = (
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
  loadContext
) =>
  new Promise((resolve, reject) => {
    let shellRendered = false
    let userAgent = request.headers.get('user-agent')

    let readyOption =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? 'onAllReady'
        : 'onShellReady'

    let timeoutId = setTimeout(() => abort(), streamTimeout + 1000)

    const {pipe, abort} = renderToPipeableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [readyOption]() {
          shellRendered = true
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId)
              timeoutId = undefined
              callback()
            }
          })
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          pipe(body)

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          )
        },
        onShellError(error) {
          reject(error)
        },
        onError(error) {
          responseStatusCode = 500

          if (shellRendered) {
            console.error(error)
          }
        }
      }
    )
  })

export {
  streamTimeout,
  handleRequest as default
}
