/**
 * Triangle Numbers
 * Write a function to count the number of triplets in an integer array nums
 * that could form the sides of a triangle. The triplets do not need to be unique.
 */
export function triangleNumber(nums: number[]): number {
  let count = 0;

  nums.sort((a, b) => a - b);

  for (let i = nums.length - 1; i >= 2; i--) {
    let left = 0;
    let right = i - 1;

    while (left < right) {
      if (nums[left] + nums[right] > nums[i]) {
        count += right - left;
        right--;
      } else {
        left++;
      }
    }
  }

  return count;
}
