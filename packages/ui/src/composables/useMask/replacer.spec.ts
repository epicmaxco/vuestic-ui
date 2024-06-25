import { parseToBlocks } from "./mask-parser"
import { replaceWithMask } from "./replacer"
import { describe, it, expect } from 'vitest'

describe('suggester', () => {
  it('add text if dynamic block', () => {
    const phoneRegex = /38 \(\d\d\d\) \d\d\d \d\d \d\d/

    // console.log(parseToBlocks('38 (093) 000 00 00', phoneRegex).tree)
    // console.log(parseToBlocks('', phoneRegex).tree)

    // expect(replaceWithMask(parseToBlocks('38 (093) 000 00 00', phoneRegex).tree)).toBe('38 (093) 000 00 00')
    // expect(parseToBlocks('0930000000', phoneRegex).value).toBe('38 (093) 000 00 00')
  })

  // it('add text if no dynamic block', () => {
  //   expect(parseToBlocks('', '123').value).toBe('123')
  //   expect(parseToBlocks('1', '123').value).toBe('123')
  //   expect(parseToBlocks('12', '123').value).toBe('123')
  //   expect(parseToBlocks('123', '123').value).toBe('123')
  // })

  // it('add text if dynamic block', () => {
  //   expect(parseToBlocks('1', /\d-\d-\d/).value).toBe('1-')
  //   expect(parseToBlocks('1-', /\d-\d-\d/).value).toBe('1-')
  //   expect(parseToBlocks('1-2', /\d-\d-\d/).value).toBe('1-2-')
  //   expect(parseToBlocks('1-2-', /\d-\d-\d/).value).toBe('1-2-')
  // })

  // it('adds long text after dynamic block', () => {
  //   expect(parseToBlocks('abc', /Hello \w\w\w welcome/).value).toBe('Hello abc welcome')
  //   expect(parseToBlocks('Hello abc', /Hello \w\w\w welcome/).value).toBe('Hello abc welcome')
  // })
})
