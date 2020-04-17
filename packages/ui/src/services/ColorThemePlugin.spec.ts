import { isCssColor } from './ColorThemePlugin'

describe('ColorThemePlugin', () => {
  it('isCssColor', () => {
    expect(isCssColor('tomato')).toBe(true)
    expect(isCssColor('#123')).toBe(true)
    expect(isCssColor('#123FFF')).toBe(true)
    expect(isCssColor('not-css-color')).toBe(false)
  })
})

//
