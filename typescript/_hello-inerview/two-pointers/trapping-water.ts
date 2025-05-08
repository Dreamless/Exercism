export function trappingWater(heights: number[]): number {
  let left = 0;
  let right = heights.length - 1;
  let leftMax = heights[left];
  let rightMax = heights[right];
  let count = 0;

  while (left + 1 < right) {
    if (rightMax > leftMax) {
      left++;
      if (heights[left] > leftMax) {
        leftMax = heights[left];
      } else {
        count += leftMax - heights[left];
      }
    } else {
      right--;
      if (heights[right] > rightMax) {
        rightMax = heights[right];
      } else {
        count += rightMax - heights[right];
      }
    }
  }

  return count;
}
