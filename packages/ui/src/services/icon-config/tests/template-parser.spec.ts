import { paramsFromString, matchTemplate } from '../template-parser'

describe('IconsConfig', () => {
  describe('paramsFromString', () => {
    it('default', () => {
      expect(paramsFromString('fa-phone', 'fa-{code}')).toEqual({ code: 'phone' })
      expect(paramsFromString('fa-phone', 'fa-{}')).toEqual({ '': 'phone' })
      expect(paramsFromString('fa-', 'fa-{code}')).toEqual({ code: '' })
      expect(paramsFromString('fa-', 'fa-')).toEqual({ })
      expect(paramsFromString('all string', '{any}')).toEqual({ any: 'all string' })
      expect(paramsFromString('all string and spaces', 'all {any}')).toEqual({ any: 'string and spaces' })
      expect(paramsFromString('cucumbers and tomato salad ', '{1} and {2} salad')).toEqual({ 1: 'cucumbers', 2: 'tomato' })
      expect(paramsFromString('abs abs', '{1} {2}')).toEqual({ 1: 'abs', 2: 'abs' })
      expect(paramsFromString('abs ', ' {2}')).toEqual({ 2: '' })
      expect(paramsFromString('fa-clock', 'fa-{long param}')).toEqual({ 'long param': 'clock' })
    })
  })
  describe('matchTemplate', () => {
    it('match', () => {
      expect(matchTemplate('fa-phone', 'fa-{code}')).toBeTruthy()
      expect(matchTemplate('fa-phone-f', 'fa-{code}-f')).toBeTruthy()
      expect(matchTemplate('fa-phone', 'fa-{code}-f')).toBeFalsy()
      expect(matchTemplate('fa-phone-f', 'fa-{code}')).toBeTruthy() // phone-f
      expect(matchTemplate('fa-phone-f', 'fa-{code}-{suffix}')).toBeTruthy()
    })
  })
})
