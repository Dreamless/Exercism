import {describe, it, expect} from '@jest/globals'
import {fruitIntoBaskets} from "./fruit-into-basket.ts"
import {longestSubstringWithoutRepeat} from "./longest-substring.ts"
import {characterReplacement} from "./character-replacment.ts"
import {maxSubarraySum} from "./sum-of-subarrays.ts"
import {maxScore} from "./max-score.ts"
import {maxUniqueWindowSum} from "./max-sum.ts"

describe('Fruit into basket', () => {
  it('case 1', () => {
    const fruits = [1, 2, 1]
    expect(fruitIntoBaskets(fruits)).toBe(3)
  })

  it('case 2', () => {
    const fruits = [0, 1, 2, 2]
    expect(fruitIntoBaskets(fruits)).toBe(3)
  })
})

describe('Longest Substring Without Repeating Characters', () => {
  it('case 1)', () => {
    expect(longestSubstringWithoutRepeat("abcabcbb")).toBe(3)
  })

  it('case 2', () => {
    expect(longestSubstringWithoutRepeat("substring")).toBe(8)
  })
})

describe('Longest Repeating Character Replacement', () => {
  it('example case 1: ABAB with k = 2', () => {
    expect(characterReplacement("ABAB", 2)).toBe(4)
  })

  it('example case 2: AABABBA with k = 1', () => {
    expect(characterReplacement("AABABBA", 1)).toBe(4)
  })
})

describe('Maximum Sum of Subarrays of Size K', () => {
  it('case 1)', () => {
    const nums = [1, 2, 3, 4, 5]
    const k = 2
    expect(maxSubarraySum(nums, k)).toBe(9)
  })

  it('case 2)', () => {
    const nums = [2, 1, 5, 1, 3, 2]
    const k = 3
    expect(maxSubarraySum(nums, k)).toBe(9)
  })
})


describe('Max Points You Can Obtain From Cards', () => {
  it('base case)', () => {
    const cards = [1, 2, 3, 4, 5, 6, 1]
    const k = 3
    expect(maxScore(cards, k)).toBe(12)
  })

  it('return the total when k equals array length', () => {
    const cards = [2, 2, 2]
    const k = 3
    expect(maxScore(cards, k)).toBe(6)
  })
})

describe('Max Sum of Distinct Subarrays Length k', () => {
  it('base case)', () => {
    const nums = [3, 2, 2, 3, 4, 6, 7, 7, -1]
    const k = 4
    expect(maxUniqueWindowSum(nums, k)).toBe(20)
  })
})
