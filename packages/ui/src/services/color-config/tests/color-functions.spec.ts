import { setHSLAColor } from '../color-functions'

describe('ColorFunctions', () => {
  describe('setHSLAColor', () => {
    it('Changing hue of HEX color', () => {
      expect(setHSLAColor('#0000ff', { h: 100 }))
        .toEqual('hsla(100,100%,50%,1)')
    })
    it('Changing saturation of HEX color', () => {
      expect(setHSLAColor('#0000ff', { s: 50 }))
        .toEqual('hsla(240,50%,50%,1)')
    })
    it('Changing lightness of HEX color', () => {
      expect(setHSLAColor('#0000ff', { l: 10 }))
        .toEqual('hsla(240,100%,10%,1)')
    })
    it('Changing alpha of HEX color', () => {
      expect(setHSLAColor('#0000ff', { a: 0 }))
        .toEqual('hsla(240,100%,50%,0)')
    })
    it('Changing whole HSLA at once(using HEX color)', () => {
      expect(setHSLAColor('#0000ff', { h: 200, s: 34, l: 14, a: 0.7 }))
        .toEqual('hsla(200,34%,14%,0.7)')
    })
    it('Changing whole HSLA at once(using HSLA color)', () => {
      expect(setHSLAColor('hsla(25,30%,10%,0.5)', { h: 200, s: 34, l: 14, a: 0.7 }))
        .toEqual('hsla(200,34%,14%,0.7)')
    })
  })
})
