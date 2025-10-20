import {memo} from 'react'
import Icon from '~/components/icon'
import SpaceBetween from '~/components/space-between'
import {SB} from '~/shell/cont'

const icons = [
  'add-plus',
  'anchor-link',
  'angle-left-double',
  'angle-left',
  'angle-right-double',
  'angle-right',
  'angle-up',
  'angle-down',
  'arrow-left',
  'arrow-right',
  'audio-full',
  'audio-half',
  'audio-off',
  'bug',
  'call',
  'calendar',
  'caret-down-filled',
  'caret-down',
  'caret-left-filled',
  'caret-right-filled',
  'caret-up-filled',
  'caret-up',
  'check',
  'contact',
  'close',
  'copy',
  'delete-marker',
  'download',
  'drag-indicator',
  'edit',
  'ellipsis',
  'envelope',
  'expand',
  'external',
  'file-open',
  'file',
  'filter',
  'flag',
  'folder-open',
  'folder',
  'gen-ai',
  'group-active',
  'group',
  'heart',
  'heart-filled',
  'insert-row',
  'key',
  'keyboard',
  'lock-private',
  'menu',
  'microphone',
  'microphone-off',
  'multiscreen',
  'notification',
  'redo',
  'refresh',
  'remove',
  'resize-area',
  'script',
  'search',
  'security',
  'settings',
  'share',
  'shrink',
  'star-filled',
  'star-half',
  'star',
  'status-in-progress',
  'status-info',
  'status-negative',
  'status-pending',
  'status-positive',
  'status-stopped',
  'status-warning',
  'subtract-minus',
  'suggestions',
  'thumbs-down-filled',
  'thumbs-down',
  'thumbs-up-filled',
  'thumbs-up',
  'ticket',
  'treeview-collapse',
  'treeview-expand',
  'undo',
  'unlocked',
  'upload-download',
  'upload',
  'user-profile-active',
  'user-profile',
  'video-off',
  'video-on',
  'video-unavailable',
  'view-full',
  'view-horizontal',
  'view-vertical',
  'zoom-in',
  'zoom-out',
  'zoom-to-fit'
]

const Z = memo(() => {
  return (
    <SB title='Icon'>
      <SpaceBetween size='s' direction='horizontal'>
        {icons
          .flatMap(n =>
            [
              'normal',
              'disabled',
              'error',
              'inverted',
              'link',
              'subtle',
              'success',
              'warning'
            ].flatMap(v =>
              ['small', 'normal', 'medium', 'big', 'large', 'inherit'].map(
                s => [n, v, s]
              )
            )
          )
          .map((e, i) => (
            <Icon key={i} name={e[0]} size={e[2]} variant={e[1]} />
          ))}
      </SpaceBetween>
    </SB>
  )
})

const handle = {
  crumb: {text: 'Icon'}
}

export {
  handle,
  Z as default
}
