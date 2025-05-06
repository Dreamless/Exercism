import { describe, it, expect } from '@jest/globals'
import { twoSum } from "./two-sum.js"

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
