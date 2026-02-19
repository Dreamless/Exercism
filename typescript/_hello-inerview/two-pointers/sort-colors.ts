/**
 * Sort Colors
 * Write a function to sort a given integer array nums in-place
 * (and without the built-in sort function), where the array contains n integers
 * that are either 0, 1, and 2 and represent the colors red, white, and blue.
 * Arrange the objects so that same-colored ones are adjacent, in the order of red,
 * white, and blue (0, 1, 2).
 */
export function sortColors(nums: number[]): number[] {
  let left = 0;
  let right = nums.length - 1;
  let i = 0;

  while (i <= right) {
    if (nums[i] === 0) {
      [nums[i], nums[left]] = [nums[left], nums[i]];
      left++;
      i++;
    } else if (nums[i] === 2) {
      [nums[i], nums[right]] = [nums[right], nums[i]];
      right--;
    } else {
      i++;
    }
  }

  return nums;
}
