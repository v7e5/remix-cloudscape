const defaultCardsPerRow = [
  {
    minWidth: 1920,
    cards: 6
  },
  {
    minWidth: 1400,
    cards: 5
  },
  {
    minWidth: 1200,
    cards: 4
  },
  {
    minWidth: 992,
    cards: 3
  },
  {
    minWidth: 768,
    cards: 2
  }
]

const getCardsPerRow = (width, config) => {
  if (config.length === 0) {
    config = defaultCardsPerRow
  }
  let cardsPerRow = 1
  const sortedConfig = config
    .slice()
    .map(value => ({
      minWidth: value.minWidth || 0,
      cards: value.cards
    }))
    .sort((a, b) => b.minWidth - a.minWidth)
  sortedConfig.some(layout => {
    if (width >= layout.minWidth) {
      cardsPerRow = layout.cards
      return true
    }
  })
  return cardsPerRow
}

export {
  getCardsPerRow
}
