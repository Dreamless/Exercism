import { describe, it, expect } from '@jest/globals'

describe('Logic expression', () => {
  describe('exp1', () => {
    it('always false', () => {
      for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 7; j++) {
          const exp1: boolean = !(i > 10 || j < 5) && !(i <= 10 && j >= 5)
          expect(exp1).toBe(false)
        }
      }
    })
    it('xor', () => {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          const A = Boolean(i)
          const B = Boolean(j)
          const exp1 = (A && !B) || (!A && B)
          const exp2 = A !== B
          expect(exp1).toBe(exp2)
        }
      }
    })
    it('should return true when not P', () => {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
          const A = Boolean(i)
          const B = Boolean(j)
          const exp1 = !(A && B) && (!A || B)
          const exp2 = !A
          expect(exp1).toBe(exp2)
        }
      }
    })
  })
  it('negation elimination', () => {
    for (let x = 0; x < 11; x++) {
      const exp1 = !((x > 5 && x < 10) || (x === 7))
      const exp2 = (x <= 5 || x >= 10) && (x !== 7)
      expect(exp1).toBe(exp2)
    }
  })
  it('always true', () => {
    for (let a = 0; a < 2; a++) {
      for (let b = 0; b < 2; b++) {
        for (let c = 0; c < 2; c++) {
          const exp1: boolean = ((a + b) < c) || !((a < c - b) || (b < c - a))
          expect(exp1).toBe(true)
        }
      }
    }
  })
})
