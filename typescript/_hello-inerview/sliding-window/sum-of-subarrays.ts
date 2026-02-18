/**
 * Maximum Sum of Subarrays of Size K
 * Given an array of integers nums and an integer k,
 * find the maximum sum of any contiguous subarray of size k.
 */
export function maxSubarraySum(nums: number[], k: number): number {
  let maxSum = 0;
  let state = 0;
  let start = 0;

  for (let end = 0; end < nums.length; end++) {
    state += nums[end];
    if (end - start + 1 === k) {
      maxSum = Math.max(maxSum, state);
      state -= nums[start];
      start++;
    }
  }

  return maxSum;
}
