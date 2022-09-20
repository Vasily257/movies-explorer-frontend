function calcuateCards() {
  const viewportWidth = document.documentElement.clientWidth;

  let cardCount;
  let addingCard;

  if (viewportWidth < 600) {
    cardCount = 5;
    addingCard = 2;
    return { cardCount, addingCard };
  }

  if (viewportWidth < 900) {
    cardCount = 8;
    addingCard = 2;
    return { cardCount, addingCard };
  }

  cardCount = 16;
  addingCard = 4;

  return { cardCount, addingCard };
}

export default calcuateCards;
