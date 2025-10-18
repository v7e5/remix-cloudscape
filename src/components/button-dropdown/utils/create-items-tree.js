import {isItemGroup} from './utils'

const createItemsTree = items => {
  const itemToIndex = new Map()
  const indexToItem = new Map()
  const flatIndices = []
  traverseItems(items, (item, index) => {
    const indexKey = stringifyIndex(index)
    itemToIndex.set(item, indexKey)
    indexToItem.set(indexKey, item)
    flatIndices.push(indexKey)
  })
  return {
    getItem: index => {
      const indexKey = stringifyIndex(index)
      return indexToItem.get(indexKey) || null
    },
    getItemIndex: item => {
      const indexKey = itemToIndex.get(item)
      if (!indexKey) {
        throw new Error('Invariant violation: item is not found.')
      }
      return parseIndex(indexKey)
    },
    getSequentialIndex: (index, direction) => {
      const indexKey = stringifyIndex(index)
      const position = flatIndices.indexOf(indexKey)
      const nextIndexKey = flatIndices[position + direction]
      if (!nextIndexKey) {
        return null
      }
      return parseIndex(nextIndexKey)
    },
    getParentIndex: item => {
      const indexKey = itemToIndex.get(item)
      if (!indexKey) {
        throw new Error('Invariant violation: item is not found.')
      }
      const index = parseIndex(indexKey)
      if (index.length === 1) {
        return null
      }
      return index.slice(0, index.length - 1)
    }
  }
}
const traverseItems = (items, act, parentIndex = []) => {
  items.forEach((item, index) => {
    const itemIndex = [...parentIndex, index]
    act(item, itemIndex)
    if (isItemGroup(item)) {
      traverseItems(item.items, act, itemIndex)
    }
  })
}
const stringifyIndex = index => {
  return index.join('-')
}
const parseIndex = index => {
  return index.split('-').map(it => parseInt(it))
}

export {
  createItemsTree as default
}
