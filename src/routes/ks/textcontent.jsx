import {memo} from 'react'
import TextContent from '~/components/text-content'
import {SB} from '~/shell/cont'

const Z = memo(() => {
  return (
    <SB title='Text content'>
      <TextContent>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <p>Paragraph</p>
        <p>
          <strong>Strong text</strong>
        </p>
        <p>
          <small>
            Small text with a <a href='#'>link</a>
          </small>
        </p>
        <p>
          <a href='#'>Link</a>
        </p>
        <p>
          <code>Code</code>
        </p>

        <ul>
          <li>item of unordered list</li>
          <li>item of unordered list</li>
        </ul>

        <ol>
          <li>item of ordered list</li>
          <li>item of ordered list</li>
        </ol>
      </TextContent>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Text content'}
}

export {
  handle,
  Z as default
}
