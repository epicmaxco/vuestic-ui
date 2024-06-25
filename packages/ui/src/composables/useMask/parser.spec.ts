import { describe, expect, it } from "vitest";
import { parseTokens } from './parser'

describe("regex token parser", () => {
  describe('string comparator', () => {
    it('should compare strings', () => {
      const original = 'abcde'

      expect(compareStrings(original, 'abc')).toBeGreaterThan(compareStrings(original, ''))
      expect(compareStrings(original, 'abc')).toBeGreaterThan(compareStrings(original, 'ab'))

      expect(compareStrings(original, 'abc') < compareStrings(original, 'abcde')).toBe(true)
    })

    it('should compare strings', () => {
      const original = 'abcde'

      expect(compareStrings(original, 'abcdefg')).toBeGreaterThan(compareStrings(original, 'abcde'))
      expect(compareStrings(original, 'abc:d::')).not.toBeGreaterThan(compareStrings(original, 'abcd'))
    })


    it('should compare strings', () => {
      const original = 'b'

      expect(compareStrings(original, 'b')).toBeGreaterThan(compareStrings(original, ''))
      expect(compareStrings(original, 'abc:d::')).not.toBeGreaterThan(compareStrings(original, 'abcd'))
    })

    it('should compare strings', () => {
      const original = '20010db885a3000000008a2e03707334'

      expect(compareStrings(original, '2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeGreaterThan(compareStrings(original, '2001:0db8:85a3:0000:0000:8a2e::0370'))
    })


    it('should compare strings', () => {
      const original = '2001:0db8:'

      expect(compareStrings(original, '2001:0db8:')).toBeGreaterThan(compareStrings(original, '2:001:0db8::'))
    })
  })

  it("should parse simple char", () => {
    const tokens = parseTokens(/^38 \(\d{1,3}\) \d\d\d \d\d \d\d$/.source)

    expect(formatValue('093012', tokens)).toBe('38 (0) 930 12 ')
    expect(formatValue('0930123456', tokens)).toBe('38 (093) 012 34 56')
    expect(formatValue('093 0123456', tokens)).toBe('38 (093) 012 34 56')
    expect(formatValue('44 0123456', tokens)).toBe('38 (44) 012 34 56')
  })

  it('should parse regex (with or |)', () => {
    const tokens = parseTokens(/^Hello (world|universe)!$/.source)

    expect(formatValue('Hello world', tokens)).toBe('Hello world!')
    expect(formatValue('Hello universe', tokens)).toBe('Hello universe!')
    expect(formatValue('world', tokens)).toBe('Hello world!')
    expect(formatValue('universe', tokens)).toBe('Hello universe!')
  })

  it('should parse regex (with or |) with dynamic content', () => {
    const tokens = parseTokens(/Test (\d\d age|\w\w\w\w name)!$/.source)

    expect(formatValue('Test 12', tokens)).toBe('Test 12 age!')
    expect(formatValue('Test abcd', tokens)).toBe('Test abcd name!')
  })

  it('should parse regex with repeated content', () => {
    const tokens = parseTokens(/^Hello \w{3} welcome$/.source)

    expect(formatValue('Hello abc welcome', tokens)).toBe('Hello abc welcome')
    expect(formatValue('Hello ab welcome', tokens)).toBe('Hello ab')
  })

  it('should parse regex with repeated content and optional', () => {
    const tokens = parseTokens(/^Hello \w{3,} welcome$/.source)

    expect(formatValue('Hello abc welcome', tokens)).toBe('Hello abc welcome')
    expect(formatValue('Hello abcdefg welcome', tokens)).toBe('Hello abcdefg welcome')
  })

  it('should parse regex with repeated content and optional', () => {
    const tokens = parseTokens(/^Hello (\w|\d){3,5} welcome$/.source)

    expect(formatValue('a', tokens)).toBe('Hello a')
    expect(formatValue('abc', tokens)).toBe('Hello abc welcome')
    expect(formatValue('Hello abc welcome', tokens)).toBe('Hello abc welcome')
    expect(formatValue('Hello abcde welcome', tokens)).toBe('Hello abcde welcome')
    expect(formatValue('Hello abcdef welcome', tokens)).toBe('Hello abcde welcome')
  })

  it('should repeat single char', () => {
    const tokens = parseTokens(/^o{3}!$/.source)

    expect(formatValue('o', tokens)).toBe('ooo!')
    expect(formatValue('oo', tokens)).toBe('ooo!')
  })

  it('should repeat single group', () => {
    const tokens = parseTokens(/(o|b){3}!$/.source)

    expect(formatValue('o', tokens)).toBe('ooo!')
    expect(formatValue('ob', tokens)).toBe('obo!')
  })

  it('should repeat in repeat group', () => {
    const tokens = parseTokens(/((\d\d\d\d:){7,7})/.source)
    expect(formatValue('1234:5678:', tokens)).toBe('1234:5678:')
  })

  it('should correctly generate value for complex regex', () => {
    const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))/

    const tokens = parseTokens(ipv6Regex.source)

    expect(formatValue('1234:5678:', tokens)).toBe('1234:5678::')
    expect(formatValue('2001:0db8:85a3:0000:0000:8a2e:0370:7334', tokens)).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
    expect(formatValue('20010db885a3000000008a2e03707334', tokens)).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
    expect(formatValue('2001:0db8:85a3:0000:', tokens)).toEqual('2001:0db8:85a3:0000::') // Unfinished, but valid
    expect(formatValue('2001:0db8', tokens)).toEqual('2001:0db8::') // Unfinished, but valid
    expect(formatValue('::0db8', tokens)).toEqual('::0db8') // Unfinished, but valid
  })

  describe('unformat', () => {
    it('should unformat simple char', () => {
      const tokens = parseTokens(/^38 \(\d{1,3}\) \d\d\d \d\d \d\d$/.source)

      expect(unFormatValue('38 (0) 123 45 67', tokens)).toBe('01234567')
      expect(unFormatValue('38 (093) 123 45 67', tokens)).toBe('0931234567')
    })

    it('should unformat simple char', () => {
      const tokens = parseTokens(/(\d\d \d\d)/.source)

      expect(unFormatValue('1234 5678', tokens)).toBe('12345678')
      expect(unFormatValue('1234', tokens)).toBe('1234')
      expect(unFormatValue('1 234', tokens)).toBe('1234')
      expect(unFormatValue('123 4', tokens)).toBe('1234')
      expect(unFormatValue('123    as4', tokens)).toBe('1234')
      expect(unFormatValue('1', tokens)).toBe('1')
    })

    it('should unformat with repeat', () => {
      const tokens = parseTokens(/(\d{2} \d\d)/.source)

      expect(unFormatValue('1234 5678', tokens)).toBe('12345678')
      expect(unFormatValue('1234', tokens)).toBe('1234')
      expect(unFormatValue('1 234', tokens)).toBe('1234')
      expect(unFormatValue('123 4', tokens)).toBe('1234')
      expect(unFormatValue('123    fsas4', tokens)).toBe('1234')
      expect(unFormatValue('1', tokens)).toBe('1')
    })

    it('should unformat with group', () => {
      const tokens = parseTokens(/test (\d){3}!$/.source)

      expect(unFormatValue('test 123!', tokens)).toBe('123')
      expect(unFormatValue('test junk', tokens)).toBe('')
      expect(unFormatValue('test t12', tokens)).toBe('12')
    })

    // it('should unformat complex regex', () => {
    //   const ipv6Regex = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))/

    //   const tokens = parseTokens(ipv6Regex.source)

    //   expect(unFormatValue('2001:0db8:85a3:0000:0000:8a2e:0370:7334', tokens)).toBe('20010db885a3000000008a2e03707334')
    // })
  })
})
