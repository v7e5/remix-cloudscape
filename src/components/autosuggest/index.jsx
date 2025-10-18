import {forwardRef, memo, useCallback, useState} from 'react'

import InternalAutosuggest from './internal'
import {getExternalProps} from '../internal/utils/external-props'
import useBaseComponent from '../internal/hooks/use-base-component'

const Autosuggest = memo(
  forwardRef(
    (
      {
        filteringType = 'auto',
        statusType = 'finished',
        disableBrowserAutocorrect = true,
        value,
        onChange,
        ...props
      },
      ref
    ) => {
      const [_value, _setValue] = useState(value ?? '')

      const _onChange = useCallback(o => {
        _setValue(o.value)
        onChange?.(o)
      }, [])

      const baseComponentProps = useBaseComponent('Autosuggest', {
        props: {
          autoFocus: props.autoFocus,
          disableBrowserAutocorrect,
          expandToViewport: props.expandToViewport,
          filteringType,
          readOnly: props.readOnly,
          virtualScroll: props.virtualScroll
        }
      })
      const externalProps = getExternalProps(props)
      return (
        <InternalAutosuggest
          filteringType={filteringType}
          statusType={statusType}
          disableBrowserAutocorrect={disableBrowserAutocorrect}
          {...externalProps}
          {...baseComponentProps}
          value={_value}
          onChange={_onChange}
          ref={ref}
        />
      )
    }
  )
)

export {
  Autosuggest as default
}
