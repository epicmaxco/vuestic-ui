import { regexGroupsValues } from '../../utils/regex'

describe('IconsConfg', () => {
  describe('utils', () => {
    describe('regexGroupsValues', () => {
      it('default regex', () => {
        expect(regexGroupsValues('a b', /(.*) (.*)/)).toEqual(['a', 'b'])
        expect(regexGroupsValues('fa-color', /(.*)-(.*)/)).toEqual([
          'fa',
          'color',
        ])
        expect(regexGroupsValues('any string', /(.*)/)).toEqual(['any string'])
        expect(regexGroupsValues('nothing', /hello/)).toEqual([])
      })

      it('global regex', () => {
        expect(
          regexGroupsValues('global regex test', /global (regex) (test)/g),
        ).toEqual([['regex', 'test']])
        expect(
          regexGroupsValues('global regex test', /global (.*) (.*)/g),
        ).toEqual([['regex', 'test']])
      })

      it('global regex (without group)', () => {
        expect(
          regexGroupsValues('{cucumber} and {tomato} salad', /{[^}]*}/g),
        ).toEqual([[], []])
      })

      it('global regex (multiple group match)', () => {
        expect(
          regexGroupsValues('{cucumber} and {tomato} salad', /{([^}]*)}/g),
        ).toEqual([['cucumber'], ['tomato']])
      })
    })
  })
})
