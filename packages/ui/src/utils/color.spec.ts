import { hslToString, parseColorToHSL, parseColorToRGB, rgbToString, rgbaToHsla, hslaToRgba } from './color'
import { describe, it, expect } from 'vitest'

describe('colors', () => {
  describe('parseColorToHSL', () => {
    it('hex', () => {
      expect(parseColorToHSL('#ff0000')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('#f00')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
    })

    it('rgb', () => {
      expect(parseColorToHSL('rgb(255, 0, 0)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('rgba(255, 0, 0, 0.5)')).toEqual({ h: 0, s: 100, l: 50, a: 1 / 2 })
    })

    it('hsl', () => {
      expect(parseColorToHSL('hsl(0 100% 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0deg 100% 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0grad 100% 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0rad 100% 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0turn 100% 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0 100% 50% / 0.5)')).toEqual({ h: 0, s: 100, l: 50, a: 1 / 2 })
      expect(parseColorToHSL('hsl(0 100% 50% / 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 / 2 })
      expect(parseColorToHSL('hsl(0, 100%, 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0deg, 100%, 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0grad, 100%, 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0rad, 100%, 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsl(0turn, 100%, 50%)')).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(parseColorToHSL('hsla(0, 100%, 50%, 0.5)')).toEqual({ h: 0, s: 100, l: 50, a: 1 / 2 })
    })
  })

  describe('parseColorToRGB', () => {
    it('hex', () => {
      expect(parseColorToRGB('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    })

    it('rgb', () => {
      expect(parseColorToRGB('rgb(255, 0, 0)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('rgba(255, 0, 0, 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 1 / 2 })
    })

    it('hsl', () => {
      expect(parseColorToRGB('hsl(0 100% 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0deg 100% 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0grad 100% 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0rad 100% 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0turn 100% 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0 100% 50% / 0.5)')).toEqual({ r: 255, g: 0, b: 0, a: 1 / 2 })
      expect(parseColorToRGB('hsl(0 100% 50% / 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 / 2 })
      expect(parseColorToRGB('hsl(0, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0deg, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0grad, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0rad, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(parseColorToRGB('hsl(0turn, 100%, 50%)')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    })
  })

  describe('to hsl string', () => {
    it('hslToString', () => {
      expect(hslToString({ h: 0, s: 100, l: 50, a: 1 })).toEqual('hsla(0,100%,50%,1)')
      expect(hslToString({ h: 0, s: 100, l: 50, a: 1 / 2 })).toEqual('hsla(0,100%,50%,0.5)')
    })
  })

  describe('to rgb string', () => {
    it('rgbToString', () => {
      expect(rgbToString({ r: 255, g: 0, b: 0, a: 1 })).toEqual('rgb(255,0,0)')
      expect(rgbToString({ r: 255, g: 0, b: 0, a: 1 / 2 })).toEqual('rgba(255,0,0,0.5)')
    })
  })

  describe('hsl to rgb', () => {
    it('hslaToRgba', () => {
      expect(hslaToRgba({ h: 0, s: 100, l: 50, a: 1 })).toEqual({ r: 255, g: 0, b: 0, a: 1 })
      expect(hslaToRgba({ h: 0, s: 100, l: 50, a: 1 / 2 })).toEqual({ r: 255, g: 0, b: 0, a: 1 / 2 })
      expect(hslaToRgba({ h: 100, s: 80, l: 60, a: 1 })).toEqual({ r: 126, g: 235, b: 71, a: 1 })
    })

    it('rgbaToHsla', () => {
      expect(rgbaToHsla({ r: 255, g: 0, b: 0, a: 1 })).toEqual({ h: 0, s: 100, l: 50, a: 1 })
      expect(rgbaToHsla({ r: 255, g: 0, b: 0, a: 1 / 2 })).toEqual({ h: 0, s: 100, l: 50, a: 1 / 2 })
      expect(rgbaToHsla({ r: 126, g: 235, b: 71, a: 1 })).toEqual({ h: 100, s: 80, l: 60, a: 1 })
    })
  })

  describe('from string to string', () => {
    it('rgb to rgb', () => {
      const rgbString = 'rgba(255,0,0,0.5)'

      expect(rgbToString(parseColorToRGB(rgbString))).toEqual(rgbString)
    })

    it('hsl to hsl', () => {
      const hslString = 'hsla(0,100%,50%,0.5)'

      expect(hslToString(parseColorToHSL(hslString))).toEqual(hslString)
    })

    it('hsl to rgb to hsl', () => {
      const hslObject = { h: 0, s: 100, l: 50, a: 1 }

      expect(rgbaToHsla(hslaToRgba(hslObject))).toEqual(hslObject)
    })

    it('rgb to hsl to rgb', () => {
      const rgbObject = { r: 255, g: 0, b: 0, a: 1 }

      expect(hslaToRgba(rgbaToHsla(rgbObject))).toEqual(rgbObject)
    })
  })
})
