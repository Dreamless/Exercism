/**
 * Given an integer input array heights representing the heights of vertical lines,
 * write a function that returns the maximum area of water that can be contained by two of the lines
 * (and the x-axis). The function should take in an array of integers and return an integer.
 */

export function maxArea(heights: number[]): number {
  let left = 0;
  let right = heights.length - 1;
  let currentMax = 0;

  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    const currentArea = width * height;

    currentMax = Math.max(currentMax, currentArea);

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return currentMax;
}
