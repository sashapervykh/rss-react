import type { SearchResultType } from '../api/utils/types';

export function createFileContent(cards: SearchResultType[]) {
  const cardsStringArray = cards.map((card) => {
    const cardArray = [];
    for (const key in card) {
      if (Object.hasOwn(card, key)) {
        const keyValue = `"${card[key].replaceAll(`\n`, ' ')}"`;
        cardArray.push(keyValue);
      }
    }
    return cardArray.join(',');
  });
  return cardsStringArray.join(`\n`);
}
