import { describe, it, expect } from '@jest/globals'
import { twoSum } from "./two-sum.ts"
import { maxArea } from "./max-area.ts"
import { threeSum } from "./3-sum.ts"
import { triangleNumber } from "./triangle-numbers.js"
import { moveZeroes } from "./move-zeroes.ts"
import { sortColors } from "./sort-colors.ts"

describe('Two sum', () => {
  it('valid pair exists', () => {
    const nums = [1, 2, 3, 4, 5]
    const target = 9

    expect(twoSum(nums, target)).toBe(true)
  })

  it('no valid pair exists', () => {
    const nums = [1, 2, 3, 4, 5]
    const target = 10

    expect(twoSum(nums, target)).toBe(false)
  })
})

describe('Container With Most Water', () => {
  it('should calculate the maximum area', () => {
    const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    expect(maxArea(heights)).toBe(49)
  })

  it('should handle a small input array', () => {
    const heights = [1, 1]
    expect(maxArea(heights)).toBe(1)
  })
})

describe('3-Sum', () => {
  it('all unique triplets that sum to zero', () => {
    const nums = [-1, 0, 1, 2, -1, -4]
    expect(threeSum(nums)).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ])
  })

  it('empty array when no triplets sum to zero', () => {
    const nums = [1, 2, 3, 4, 5]
    expect(threeSum(nums)).toEqual([])
  })
})

describe('Triangle Numbers', () => {
  //  2 + 2 > 3
  //  2 + 3 > 4
  // 2 + 2 > 4 (invalid)
  it('base case', () => {
    expect(triangleNumber([2, 2, 3, 4])).toBe(3)
  })

  it('return 0 for arrays with less than 3 elements', () => {
    expect(triangleNumber([1])).toBe(0)
    expect(triangleNumber([1, 2])).toBe(0)
  })

  it('return 0 for invalid combinations', () => {
    expect(triangleNumber([1, 2, 5, 10])).toBe(0)
  })

  it('return 10 for [4, 5, 6, 7, 8]', () => {
    expect(triangleNumber([4, 5, 6, 7, 8])).toBe(10)
  })
})

describe('sortColors', () => {
  it('base case', () => {
    const nums = [2, 0, 2, 1, 1, 0]
    sortColors(nums)
    expect(nums).toEqual([0, 0, 1, 1, 2, 2])
  })

  it('already sorted input', () => {
    const nums = [0, 0, 1, 1, 2, 2]
    sortColors(nums)
    expect(nums).toEqual([0, 0, 1, 1, 2, 2])
  })

  it('same elements', () => {
    const nums = [1, 1, 1]
    sortColors(nums)
    expect(nums).toEqual([1, 1, 1])
  })
})

describe('move zeroes', () => {
  it('moves zeros to the end (basic case)', () => {
    const nums = [0, 1, 0, 3, 12]
    moveZeroes(nums)
    expect(nums).toEqual([1, 3, 12, 0, 0])
  })

  it('no zeros array', () => {
    const nums = [1, 2, 3]
    moveZeroes(nums)
    expect(nums).toEqual([1, 2, 3])
  })
})
