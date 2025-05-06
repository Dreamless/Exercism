import { describe, it, expect } from '@jest/globals'
import { twoSum } from "./two-sum.ts"
import { maxArea } from "./max-area.ts"

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
