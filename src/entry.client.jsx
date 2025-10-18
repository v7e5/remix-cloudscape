import {startTransition} from 'react'
import {hydrateRoot} from 'react-dom/client'
import {HydratedRouter} from 'react-router/dom'

const f = () => {
  hydrateRoot(document, <HydratedRouter/>)
}

startTransition(f)
