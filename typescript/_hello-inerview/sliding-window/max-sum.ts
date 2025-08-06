/**
 * Max Sum of Distinct Subarrays Length k
 * Given an integer array nums and an integer k, write a function to identify
 * the highest possible sum of a subarray within nums, where the subarray
 * meets the following criteria: its length is k, and all of its elements are unique.
 */
export function maxUniqueWindowSum(nums: number[], k: number): number {
  let maxSum = 0;
  let start = 0;
  const state = new Map<number, number>();
  let currSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    currSum += num;

    state.set(num, (state.get(num) ?? 0) + 1);

    if (i - start + 1 === k) {
      if (state.size === k) {
        maxSum = Math.max(maxSum, currSum);
      }

      const startNum = nums[start];
      currSum -= startNum;

      const count = state.get(startNum)! - 1;
      if (count === 0) {
        state.delete(startNum);
      } else {
        state.set(startNum, count);
      }

      start++;
    }
  }

  return maxSum;
}
