import { dynamicSegments, isMatchDynamicSegments } from '../../utils/dynamic-segment'

describe('IconsConfig', () => {
  it('dynamicSegments', () => {
    expect(dynamicSegments('fa-phone', 'fa-{code}')).toEqual({ code: 'phone' })
    expect(dynamicSegments('fa-phone', 'fa-{}')).toEqual({ '': 'phone' })
    expect(dynamicSegments('fa-', 'fa-{code}')).toEqual({ code: '' })
    expect(dynamicSegments('fa-', 'fa-')).toEqual({ })
    expect(dynamicSegments('all string', '{any}')).toEqual({ any: 'all string' })
    expect(dynamicSegments('all string and spaces', 'all {any}')).toEqual({ any: 'string and spaces' })
    expect(dynamicSegments('cucumbers and tomato salad ', '{1} and {2} salad')).toEqual({ 1: 'cucumbers', 2: 'tomato' })
    expect(dynamicSegments('abs abs', '{1} {2}')).toEqual({ 1: 'abs', 2: 'abs' })
    expect(dynamicSegments('abs ', ' {2}')).toEqual({ 2: '' })
    expect(dynamicSegments('fa-clock', 'fa-{long param}')).toEqual({ 'long param': 'clock' })
  })
  it('isMatchDynamicSegments', () => {
    expect(isMatchDynamicSegments('fa-phone', 'fa-{code}')).toBeTruthy()
    expect(isMatchDynamicSegments('fa-phone-f', 'fa-{code}-f')).toBeTruthy()
    expect(isMatchDynamicSegments('fa-phone', 'fa-{code}-f')).toBeFalsy()
    expect(isMatchDynamicSegments('fa-phone-f', 'fa-{code}')).toBeTruthy() // phone-f
    expect(isMatchDynamicSegments('fa-phone-f', 'fa-{code}-{suffix}')).toBeTruthy()
  })
})
