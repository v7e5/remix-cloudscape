const defaultContentTypeState = {
  navigationOpen: true,
  minContentWidth: 280,
  maxContentWidth: void 0
}
const defaults = {
  default: {
    ...defaultContentTypeState
  },
  dashboard: {
    ...defaultContentTypeState
  },
  cards: {
    navigationOpen: true,
    minContentWidth: 280,
    maxContentWidth: void 0
  },
  form: {
    navigationOpen: false,
    minContentWidth: 280,
    maxContentWidth: 800
  },
  table: {
    navigationOpen: true,
    minContentWidth: 280,
    maxContentWidth: void 0
  },
  wizard: {
    navigationOpen: false,
    minContentWidth: 280,
    maxContentWidth: 1080
  }
}
const applyDefaults = (contentType, stateFromProps) => {
  const contentTypeDefaults = {
    ...defaults[contentType],
    maxContentWidth: void 0
  }
  return {
    maxContentWidth:
      stateFromProps.maxContentWidth ?? contentTypeDefaults.maxContentWidth,
    minContentWidth:
      stateFromProps.minContentWidth ?? contentTypeDefaults.minContentWidth,
    navigationOpen:
      stateFromProps.navigationOpen ?? contentTypeDefaults.navigationOpen
  }
}

export {
  applyDefaults
}
