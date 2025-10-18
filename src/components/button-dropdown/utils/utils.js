const isItemGroup = item => !!item?.items

const indexIncludes = (source, target) => {
  for (let index = 0; index < source.length; index++) {
    if (source[index] !== target[index]) {
      return false
    }
  }
  return true
}

const indexEquals = (left, right) => {
  if (left.length !== right.length) {
    return false
  }
  for (let index = 0; index < left.length; index++) {
    if (left[index] !== right[index]) {
      return false
    }
  }
  return true
}

export {
  indexEquals,
  indexIncludes,
  isItemGroup
}
