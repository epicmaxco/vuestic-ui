import { makeSuggestion } from './suggester'
import { parseToBlocks } from './mask-parser'
import { describe, it, expect } from 'vitest'

describe('suggester', () => {
  it('add text if no dynamic block', () => {
    // expect(makeSuggestion(parseToBlocks('', '123').tree)).toBe('123')
    // expect(makeSuggestion(parseToBlocks('1', '123').tree)).toBe('123')
    // expect(makeSuggestion(parseToBlocks('12', '123').tree)).toBe('123')
    // expect(makeSuggestion(parseToBlocks('123', '123').tree)).toBe('123')
  })

  // it('add text if dynamic block', () => {
  //   expect(makeSuggestion(parseToBlocks('1', /\d-\d-\d/).tree)).toBe('1-')
  //   expect(makeSuggestion(parseToBlocks('1-', /\d-\d-\d/).tree)).toBe('1-')
  //   expect(makeSuggestion(parseToBlocks('1-2', /\d-\d-\d/).tree)).toBe('1-2-')
  //   expect(makeSuggestion(parseToBlocks('1-2-', /\d-\d-\d/).tree)).toBe('1-2-')
  // })

  // it('adds long text after dynamic block', () => {
  //   expect(makeSuggestion(parseToBlocks('abc', /Hello \w\w\w welcome/).tree)).toBe('Hello ')
  //   expect(makeSuggestion(parseToBlocks('Hello abc', /Hello \w\w\w welcome/).tree)).toBe('Hello abc welcome')
  // })
})
