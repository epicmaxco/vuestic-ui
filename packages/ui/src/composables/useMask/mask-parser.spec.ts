import { expect, describe, it } from 'vitest'
import { parseToBlocks } from './mask-parser'

describe('parseToBlocks', () => {
  // it('should parse strings', () => {
  //   expect(parseToBlocks('123', '123')).toEqual({
  //     type: 'group',
  //     value: '123',
  //     expected: /123/,
  //     tree: [
  //       { type: 'simple char', value: '1', expected: '1', tree: null },
  //       { type: 'simple char', value: '2', expected: '2', tree: null },
  //       { type: 'simple char', value: '3', expected: '3', tree: null }
  //     ]
  //   })
  //   expect(parseToBlocks('11', '12')).toEqual({
  //     type: 'group',
  //     value: '1',
  //     expected: /12/,
  //     tree: [
  //       { type: 'simple char', value: '1', expected: '1', tree: null },
  //       { type: 'simple char', value: '', expected: '2', tree: null },
  //     ]
  //   })
  // })

  // it('should parse regex ("\\d", ".", "[0-9]. "4", "\\w"")', () => {
  //   expect(parseToBlocks('1234f', /\d.[0-9]4\w/)).toEqual({
  //     type: 'group',
  //     value: '1234f',
  //     expected: /\d.[0-9]4\w/,
  //     tree: [
  //       { type: 'regex', value: '1', expected: /^\d/, tree: null },
  //       { type: 'any char', value: '2', expected: /./, tree: null },
  //       { type: 'regex', value: '3', expected: /^[0-9]/, tree: null },
  //       { type: 'simple char', value: '4', expected: '4', tree: null },
  //       { type: 'regex', value: 'f', expected: /^\w/, tree: null },
  //     ]
  //   })
  //   expect(parseToBlocks('not valid', /\d.[0-9]4\w/)).toEqual({
  //     type: 'group',
  //     value: '',
  //     expected: /\d.[0-9]4\w/,
  //     tree: [
  //       { type: 'regex', value: '', expected: /^\d/, tree: null },
  //       { type: 'any char', value: 'n', expected: /./, tree: null },
  //       { type: 'regex', value: '', expected: /^[0-9]/, tree: null },
  //       { type: 'simple char', value: '', expected: '4', tree: null },
  //       { type: 'regex', value: 't', expected: /^\w/, tree: null },
  //     ]
  //   })
  //   expect(parseToBlocks('not valid', /\w\w\w \d.[0-9]4\w/)).toEqual({
  //     type: 'group',
  //     value: 'not ',
  //     expected: /\w\w\w \d.[0-9]4\w/,
  //     tree: [
  //       { type: 'regex', value: 'n', expected: /^\w/, tree: null },
  //       { type: 'regex', value: 'o', expected: /^\w/, tree: null },
  //       { type: 'regex', value: 't', expected: /^\w/, tree: null },
  //       { type: 'simple char', value: ' ', expected: ' ', tree: null },
  //       { type: 'regex', value: '', expected: /^\d/, tree: null },
  //       { type: 'any char', value: 'v', expected: /./, tree: null },
  //       { type: 'regex', value: '', expected: /^[0-9]/, tree: null },
  //       { type: 'simple char', value: '', expected: '4', tree: null },
  //       { type: 'regex', value: 'l', expected: /^\w/, tree: null },
  //     ]
  //   })
  // })

  // it('should parse regex (with repeat "{1}", "{1,2}")', () => {
  //   expect(parseToBlocks('1a', /\d{1}\w{1,2}/).value).toBe('1a')
  //   expect(parseToBlocks('1ab', /\d{1}\w{1,2}/).value).toBe('1ab')
  //   expect(parseToBlocks('112233ab', /\d{1,}\w{1,2}/).value).toBe('112233ab')
  // })


  // it('should parse regex (with repeat "*", "?", "+")', () => {
  //   expect(parseToBlocks('1f', /\d?\w/)).toEqual({
  //     type: 'group',
  //     value: '1f',
  //     expected: /\d?\w/,
  //     tree: [
  //       {
  //         type: "regex",
  //         value: "1",
  //         expected: /^\d?/,
  //         tree: null,
  //       },
  //       {
  //         type: "regex",
  //         value: "f",
  //         expected: /^\w/,
  //         tree: null,
  //       },
  //     ]
  //   })

  //   expect(parseToBlocks('12f', /\d*\w/)).toEqual({
  //     type: 'group',
  //     value: '12f',
  //     expected: /\d*\w/,
  //     tree: [
  //       {
  //         type: "regex",
  //         value: "12",
  //         expected: /^\d*/,
  //         tree: null,
  //       },
  //       {
  //         type: "regex",
  //         value: "f",
  //         expected: /^\w/,
  //         tree: null,
  //       },
  //     ]
  //   })

  //   expect(parseToBlocks('1f', /\d+\w/)).toEqual({
  //     type: 'group',
  //     value: '1f',
  //     expected: /\d+\w/,
  //     tree: [
  //       {
  //         type: "regex",
  //         value: "1",
  //         expected: /^\d+/,
  //         tree: null,
  //       },
  //       {
  //         type: "regex",
  //         value: "f",
  //         expected: /^\w/,
  //         tree: null,
  //       },
  //     ]
  //   })
  // })

  // it('should parse regex (with or |)', () => {
  //   expect(parseToBlocks('1', /\d{1,2}|[a-z]{2}/).value).toEqual('1')
  //   expect(parseToBlocks('12', /\d{1,2}|[a-z]{2}/).value).toEqual('12')
  //   expect(parseToBlocks('a', /\d{1,2}|[a-z]{2}/).value).toEqual('a')
  //   expect(parseToBlocks('ab', /\d{1,2}|[a-z]{2}/).value).toEqual('ab')
  //   expect(parseToBlocks('%%', /\d{1,2}|[a-z]{2}/).value).toEqual('')
  // })

  // it('should respect reserved characters like "^", "$"', () => {
  //   expect(parseToBlocks('12', /^\d\d$/)).toEqual({
  //     type: 'group',
  //     value: '12',
  //     expected: /^\d\d$/,
  //     tree: [
  //       { type: 'regex', value: '1', expected: /^\d/, tree: null },
  //       { type: 'regex', value: '2', expected: /^\d/, tree: null },
  //     ]
  //   })
  // })

  // it('should parse nested groups', () => {
  //   expect(parseToBlocks('a', /((a|b)|c)/).value).toEqual('a')
  //   expect(parseToBlocks('b', /((a|b)|c)/).value).toEqual('b')
  //   expect(parseToBlocks('c', /((a|b)|c)/).value).toEqual('c')

  //   expect(parseToBlocks('12text3', /((.)|(.)){2}text(.)/).value).toBe('12text3')
  // })

  // it('should parse nested groups with repeat and or', () => {
  //   // Digit 2 and 3 times
  //   expect(parseToBlocks('12text', /(\d|\w){2,3}text/).value).toBe('12text')
  //   expect(parseToBlocks('123text', /(\d|\w){2,3}text/).value).toBe('123text')

  //   // // Any char 2 and 3 times
  //   expect(parseToBlocks('abtext', /(\d|\w){2,3}text/).value).toBe('abtext')
  //   expect(parseToBlocks('abctext', /(\d|\w){2,3}text/).value).toBe('abctext')
  // })

  // it('Handle repeated group', () => {
  //   expect(parseToBlocks('12', /(\d){2}/).value).toBe('12')
  //   expect(parseToBlocks('1234', /(\d){2}/).value).toBe('12')
  // })

  // it('Handle repeated group with or', () => {
  //   expect(parseToBlocks('12', /(\d|a){2}/).value).toBe('12')
  //   expect(parseToBlocks('1234', /(\d|a){2}/).value).toBe('12')
  //   expect(parseToBlocks('aa', /(\d|a){2}/).value).toBe('aa')
  //   expect(parseToBlocks('aa11', /(\d|a){2}/).value).toBe('aa')
  // })

  // it('Handle group modifiers', () => {
  //   expect(parseToBlocks('12', /(?:\d){1,2}/).value).toBe('12')
  // })

  // it('Handle char', () => {
  //   expect(parseToBlocks('abc', /\(\d\)/).value).toBe('')
  //   expect(parseToBlocks('(1)', /\(\d\)/).value).toBe('(1)')
  // })

  // it('should correctly generate value for complex regex', () => {
  //   const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/

  //   expect(parseToBlocks('1234:56ab:', ipv6Regex).value).toBe('1234:56ab:')
  //   expect(parseToBlocks('2001:0db8:85a3:0000:0000:8a2e:0370:7334', ipv6Regex).value).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
  //   expect(parseToBlocks('2001:0db8:85a3:0000:', ipv6Regex).value).toEqual('2001:0db8:85a3:0000:') // Unfinished, but valid
  //   expect(parseToBlocks('2001::0db8', ipv6Regex).value).toEqual('2001::0db8') // Unfinished, but valid
  //   expect(parseToBlocks('::0db8', ipv6Regex).value).toEqual('::0db8') // Unfinished, but valid
  // })

  describe('Replaces value if needed', () => {
    // it('add text if dynamic block', () => {
    //   const phoneRegex = /38 \(\d\d\d\) \d\d\d \d\d \d\d/

    //   expect(parseToBlocks('38 (093) 000 00 00', phoneRegex, true).value).toBe('38 (093) 000 00 00')
    //   expect(parseToBlocks('0930000000', phoneRegex, true).value).toBe('38 (093) 000 00 00')
    // })

    it('add text if dynamic block with groups or or', () => {
      const phoneRegex = /38 \(\d{3}\) \d{3} \d{2} \d{2}/

      // expect(parseToBlocks('38 (093) 000 00 00', phoneRegex).value).toBe('38 (093) 000 00 00')
      expect(parseToBlocks('0930000000', phoneRegex, true).value).toBe('38 (093) 000 00 00')
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
})
