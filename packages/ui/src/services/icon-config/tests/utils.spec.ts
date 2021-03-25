import { getRegexGroups } from '../utils'

describe('IconsConfg', () => {
  describe('utils', () => {
    describe('getRegexGroups', () => {
      it('default regex', () => {
        expect(getRegexGroups('a b', /(.*) (.*)/)).toEqual(['a', 'b'])
        expect(getRegexGroups('fa-color', /(.*)-(.*)/)).toEqual([
          'fa',
          'color',
        ])
        expect(getRegexGroups('any string', /(.*)/)).toEqual(['any string'])
        expect(getRegexGroups('nothing', /hello/)).toEqual([])
      })

      it('global regex', () => {
        expect(
          getRegexGroups('global regex test', /global (regex) (test)/g),
        ).toEqual([['regex', 'test']])
        expect(
          getRegexGroups('global regex test', /global (.*) (.*)/g),
        ).toEqual([['regex', 'test']])
      })

      it('global regex (without group)', () => {
        expect(
          getRegexGroups('{cucumber} and {tomato} salad', /{[^}]*}/g),
        ).toEqual([[], []])
      })

      it('global regex (multiple group match)', () => {
        expect(
          getRegexGroups('{cucumber} and {tomato} salad', /{([^}]*)}/g),
        ).toEqual([['cucumber'], ['tomato']])
      })
    })
  })
})
