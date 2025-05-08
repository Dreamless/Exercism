/**
 * Given a sorted array of integers nums,
 * determine if there exists a pair of numbers that sum to a given target.
 */

export function twoSum(nums: number[], target: number): boolean {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const currentSum = nums[left] + nums[right];
    if (currentSum === target) {
      return true;
    }

    if (currentSum < target) {
      left++;
    } else {
      right--;
    }
  }

  return false;
}
