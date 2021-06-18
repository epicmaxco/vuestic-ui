import { setHSLAColor } from '../color-functions'

describe('ColorFunctions', () => {
  describe('setHSLAColor', () => {
    it('changeHEXhue', () => {
      expect(setHSLAColor('#0000ff', { h: 100 }))
        .toEqual('hsla(100,100%,50%,1)')
    })
    it('changeHEXsaturation', () => {
      expect(setHSLAColor('#0000ff', { s: 50 }))
        .toEqual('hsla(240,50%,50%,1)')
    })
    it('changeHEXlightness', () => {
      expect(setHSLAColor('#0000ff', { l: 10 }))
        .toEqual('hsla(240,100%,10%,1)')
    })
    it('changeHEXalpha', () => {
      expect(setHSLAColor('#0000ff', { a: 0 }))
        .toEqual('hsla(240,100%,50%,0)')
    })
    it('setHEX', () => {
      expect(setHSLAColor('#0000ff', { h: 200, s: 34, l: 14, a: 0.7 }))
        .toEqual('hsla(200,34%,14%,0.7)')
    })
    it('setHSLA', () => {
      expect(setHSLAColor('hsla(25,30%,10%,0.5)', { h: 200, s: 34, l: 14, a: 0.7 }))
        .toEqual('hsla(200,34%,14%,0.7)')
    })
  })
})
