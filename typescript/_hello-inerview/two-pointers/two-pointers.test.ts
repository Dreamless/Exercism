import { describe, it, expect } from '@jest/globals'
import { twoSum } from "./two-sum.ts"
import { maxArea } from "./max-area.ts"
import { threeSum } from "./3-sum.ts"

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

