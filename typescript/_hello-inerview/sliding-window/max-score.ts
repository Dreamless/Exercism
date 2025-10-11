/**
 * Max Points You Can Obtain From Cards
 * Given an array of integers representing the value of cards, write a function to calculate the maximum score you can achieve by selecting exactly k cards from either the beginning or the end of the array.
 *
 * For example, if k = 3, then you have the option to select:
 *
 * the first three cards,
 * the last three cards,
 * the first card and the last two cards
 * the first two cards and the last card
 */

export function maxScore(cards: number[], k: number): number {
  const total = cards.reduce((acc, val) => acc + val, 0);

  if (k >= cards.length) {
    return total;
  }

  let state = 0;
  let maxPoints = 0;
  let start = 0;

  for (let end = 0; end < cards.length; end++) {
    state += cards[end];

    if (end - start + 1 === cards.length - k) {
      maxPoints = Math.max(total - state, maxPoints);
      state -= cards[start];
      start++;
    }
  }

  return maxPoints;
}
