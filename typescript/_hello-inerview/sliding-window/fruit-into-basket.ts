/**
 * Fruit Into Baskets
 * Write a function to calculate the maximum number of fruits you can collect
 * from an integer array fruits, where each element represents a type of fruit.
 * You can start collecting fruits from any position in the array,
 * but you must stop once you encounter a third distinct type of fruit.
 * The goal is to find the longest subarray where at most two different types of fruits are collected.
 */

export function fruitIntoBaskets(fruits: number[]): number {
  let start = 0;
  const state: Record<number, number> = {};
  let maxFruit = 0;

  for (let end = 0; end < fruits.length; end++) {
    const fruit = fruits[end];
    state[fruit] = (state[fruit] || 0) + 1;

    while (Object.keys(state).length > 2) {
      const leftFruit = fruits[start];
      state[leftFruit] -= 1;
      if (state[leftFruit] === 0) {
        delete state[leftFruit];
      }
      start += 1;
    }

    maxFruit = Math.max(maxFruit, end - start + 1);
  }

  return maxFruit;
}
