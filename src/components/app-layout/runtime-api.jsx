import {RuntimeContentWrapper} from '../internal/plugins/helpers'
import {sortByPriority} from '../internal/plugins/helpers/utils'

const convertRuntimeDrawers = drawers => {
  const converted = drawers.map(
    ({mountContent, unmountContent, trigger, ...runtimeDrawer}) => ({
      ...runtimeDrawer,
      ariaLabels: {
        drawerName: runtimeDrawer.ariaLabels.content ?? '',
        ...runtimeDrawer.ariaLabels
      },
      trigger: {
        iconSvg: <span dangerouslySetInnerHTML={{__html: trigger.iconSvg}} />
      },
      content: (
        <RuntimeContentWrapper
          key={runtimeDrawer.id}
          mountContent={mountContent}
          unmountContent={unmountContent}
        />
      ),
      onResize: ({size}) => {
        runtimeDrawer?.onResize?.({
          size: size,
          id: runtimeDrawer.id
        })
      }
    })
  )
  const sorted = sortByPriority(converted)
  return {
    before: sorted.filter(item => (item.orderPriority ?? 0) > 0),
    after: sorted.filter(item => (item.orderPriority ?? 0) <= 0)
  }
}

export {
  convertRuntimeDrawers
}
