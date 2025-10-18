const hasActiveLink = (items, activeHref) => {
  for (const item of items) {
    if (
      (item.type === 'link' ||
        item.type === 'link-group' ||
        item.type === 'expandable-link-group') &&
      item.to === activeHref
    ) {
      return true
    }
    if (
      (item.type === 'section' ||
        item.type === 'link-group' ||
        item.type === 'expandable-link-group') &&
      hasActiveLink(item.items, activeHref)
    ) {
      return true
    }
  }
  return false
}

export {
  hasActiveLink
}
