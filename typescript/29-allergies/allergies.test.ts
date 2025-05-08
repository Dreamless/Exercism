import { describe, it, expect } from '@jest/globals'
import {Allergies, calculateScore, commonAllergies, Allergen} from './allergies.ts'

describe('allergicTo', () => {
  it('no allergies means not allergic', () => {
    const allergies = new Allergies(0)

    expect(allergies.allergicTo('peanuts')).toBeFalsy()
    expect(allergies.allergicTo('cats')).toBeFalsy()
    expect(allergies.allergicTo('strawberries')).toBeFalsy()
  })

  it('is allergic to eggs', () => {
    const allergies = new Allergies(1)

    expect(allergies.allergicTo('eggs')).toBeTruthy()
  })

  it('allergic to eggs in addition to other stuff', () => {
    const allergies = new Allergies(5)

    expect(allergies.allergicTo('eggs')).toBeTruthy()
    expect(allergies.allergicTo('shellfish')).toBeTruthy()
    expect(allergies.allergicTo('strawberries')).toBeFalsy()
  })
})

describe('list', () => {
  it('no allergies at all', () => {
    const allergies = new Allergies(0)
    const expected: string[] = []

    expect(allergies.list()).toEqual(expected)
  })

  it('allergic to just eggs', () => {
    const allergies = new Allergies(1)
    const expected = ['eggs']

    expect(allergies.list()).toEqual(expected)
  })

  it('allergic to just peanuts', () => {
    const allergies = new Allergies(2)
    const expected = ['peanuts']

    expect(allergies.list()).toEqual(expected)
  })

  it('allergic to just strawberries', () => {
    const allergies = new Allergies(8)
    const expected = ['strawberries']

    expect(allergies.list()).toEqual(expected)
  })

  it('allergic to eggs and peanuts', () => {
    const allergies = new Allergies(3)
    const expected = ['eggs', 'peanuts']

    expect(allergies.list()).toEqual(expected)
  })

  it('allergic to more than eggs but not peanuts', () => {
    const allergies = new Allergies(5)
    const expected = ['eggs', 'shellfish']

    expect(allergies.list()).toEqual(expected)
  })

  it('allergic to lots of stuff', () => {
    const allergies = new Allergies(248)
    const expected = ['strawberries', 'tomatoes', 'chocolate', 'pollen', 'cats']

    expect(allergies.list()).toEqual(expected)
  })

  it('allergic to everything', () => {
    const allergies = new Allergies(255)
    const expected = [
      'eggs',
      'peanuts',
      'shellfish',
      'strawberries',
      'tomatoes',
      'chocolate',
      'pollen',
      'cats',
    ]

    expect(allergies.list()).toEqual(expected)
  })

  it('ignore non allergen score parts', () => {
    const allergies = new Allergies(509)
    const expected = [
      'eggs',
      'shellfish',
      'strawberries',
      'tomatoes',
      'chocolate',
      'pollen',
      'cats',
    ]

    expect(allergies.list()).toEqual(expected)
  })

  it('ignore non allergen score parts, without highest valid score', () => {
    const allergies = new Allergies(257)
    const expected = ['eggs']

    expect(allergies.list()).toEqual(expected)
  })
})

describe('Allergens score', () => {
  it('allergies at all score', () => {
    expect(calculateScore(new Set([
      'eggs',
      'peanuts',
      'shellfish',
      'strawberries',
      'tomatoes',
      'chocolate',
      'pollen',
      'cats',
    ]))).toEqual(255)
  })

  it('allergy only for eggs', () => {
    expect(calculateScore(new Set([
      'eggs',
      'eggs',
    ]))).toEqual(1)
  })

  it('allergy for eggs and peanuts', () => {
    expect(calculateScore(new Set(['eggs', 'peanuts']))).toEqual(3)
  })

  it('allergy for shellfish and chocolate', () => {
    expect(calculateScore(new Set(['shellfish', 'chocolate']))).toEqual(36)
  })

  it('combination of multiple allergens', () => {
    expect(calculateScore(new Set(['eggs', 'shellfish', 'pollen']))).toEqual(69)
  })
})

describe('Shared allergies', () => {
  function sharedAllergiesHelper(aliceAllergies: Allergen[], bobAllergies: Allergen[], expectedAllergies: Allergen[]): void {
    const aliceScore = calculateScore(new Set(aliceAllergies))
    const bobScore = calculateScore(new Set(bobAllergies))
    const expectedScore = calculateScore(new Set(expectedAllergies))

    const aliceAllergy = new Allergies(aliceScore)
    const bobAllergy = new Allergies(bobScore)
    const expected = new Allergies(expectedScore)

    return expect(commonAllergies(aliceAllergy, bobAllergy)).toEqual(expected)
  }

  it('allergies to eggs and pollen', ()=> {
    const aliceAllergies: Allergen[] = ['eggs', 'shellfish', 'pollen']
    const bobAllergies: Allergen[] = ['eggs', 'pollen']
    const expectedAllergies: Allergen[] = ['eggs', 'pollen']

    sharedAllergiesHelper(aliceAllergies, bobAllergies, expectedAllergies)
  })

  it('only pollen allergy in common', ()=> {
    const aliceAllergies: Allergen[] = ['shellfish', 'pollen']
    const bobAllergies: Allergen[] = ['eggs', 'pollen']
    const expectedAllergies: Allergen[] = ['pollen']

    sharedAllergiesHelper(aliceAllergies, bobAllergies, expectedAllergies)
  })

  it('no allergy in common', ()=> {
    const aliceAllergies: Allergen[] = ['shellfish', 'pollen']
    const bobAllergies: Allergen[] = ['eggs', 'chocolate']
    const expectedAllergies: Allergen[] = []

    sharedAllergiesHelper(aliceAllergies, bobAllergies, expectedAllergies)
  })

  it('allergy to chocolate and peanuts', ()=> {
    const aliceAllergies: Allergen[] = ['chocolate', 'peanuts']
    const bobAllergies: Allergen[] = [
      'eggs',
      'peanuts',
      'shellfish',
      'strawberries',
      'tomatoes',
      'chocolate',
      'pollen',
      'cats',
    ]
    const expectedAllergies: Allergen[] = ['chocolate', 'peanuts']

    sharedAllergiesHelper(aliceAllergies, bobAllergies, expectedAllergies)
  })

  it('bob and alice have the same allergy', ()=> {
    const allergies: Allergen[] = [
      'eggs',
      'peanuts',
      'shellfish',
      'strawberries',
    ]

    sharedAllergiesHelper(allergies, allergies, allergies)
  })

  it('no input allergies', ()=> {
    const allergies: Allergen[] = []

    sharedAllergiesHelper(allergies, allergies, allergies)
  })
})
