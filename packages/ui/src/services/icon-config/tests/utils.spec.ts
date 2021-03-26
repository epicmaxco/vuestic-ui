import { getRegexGroupValues } from '../utils'

describe('IconsConfg', () => {
  describe('utils', () => {
    describe('getRegexGroupValues', () => {
      it('default regex', () => {
        expect(getRegexGroupValues('a b', /(.*) (.*)/)).toEqual(['a', 'b'])
        expect(getRegexGroupValues('fa-color', /(.*)-(.*)/)).toEqual([
          'fa',
          'color',
        ])
        expect(getRegexGroupValues('any string', /(.*)/)).toEqual(['any string'])
        expect(getRegexGroupValues('nothing', /hello/)).toEqual([])
      })

      it('global regex', () => {
        expect(
          getRegexGroupValues('global regex test', /global (regex) (test)/g),
        ).toEqual([['regex', 'test']])
        expect(
          getRegexGroupValues('global regex test', /global (.*) (.*)/g),
        ).toEqual([['regex', 'test']])
      })

      it('global regex (without group)', () => {
        expect(
          getRegexGroupValues('{cucumber} and {tomato} salad', /{[^}]*}/g),
        ).toEqual([[], []])
      })

      it('global regex (multiple group match)', () => {
        expect(
          getRegexGroupValues('{cucumber} and {tomato} salad', /{([^}]*)}/g),
        ).toEqual([['cucumber'], ['tomato']])
      })
    })
  })
})
