import { describe, it, expect } from 'vitest'
import { createAccent, createNeutral } from '../themeColors'

describe('themeColors generator', () => {
  describe('accent palettes (exact Figma values)', () => {
    it('red', () => {
      const red = createAccent({ base: '#C51818' }, 'red')
      expect(red).toMatchObject({
        red: '#c51818',
        redDark: '#ab1515',
        redLight: '#cb2f2f',

        redSoft: '#f67d73',
        redSoftDark: '#d66d64',
        redSoftLight: '#f78a81',

        red7: '#c5181812',
        red10: '#c518181a',
        red13: '#c5181821',
        red20: '#c5181833',

        redSoft7: '#f67d7312',
        redSoft10: '#f67d731a',
        redSoft13: '#f67d7321',
        redSoft20: '#f67d7333',
      })
    })

    it('green', () => {
      const green = createAccent({ base: '#1F7500' }, 'green')
      expect(green).toMatchObject({
        green: '#1f7500',
        greenLight: '#35831a',
        greenDark: '#1b6600',

        greenSoft: '#66be33',
        greenSoftLight: '#75c447',
        greenSoftDark: '#59a52c',

        green7: '#1f750012',
        green10: '#1f75001a',
        green13: '#1f750021',
        green20: '#1f750033',

        greenSoft7: '#66be3312',
        greenSoft10: '#66be331a',
        greenSoft13: '#66be3321',
        greenSoft20: '#66be3333',
      })
    })

    it('blue', () => {
      const sky = createAccent({ base: '#154EC1' }, 'blue')
      expect(sky).toMatchObject({
        blue: '#154ec1',
        blueLight: '#2c5fc7',
        blueDark: '#1244a8',

        blueSoft: '#60ace2',
        blueSoftLight: '#70b4e5',
        blueSoftDark: '#5496c5',

        blue7: '#154ec112',
        blue10: '#154ec11a',
        blue13: '#154ec121',
        blue20: '#154ec133',

        blueSoft7: '#60ace212',
        blueSoft10: '#60ace21a',
        blueSoft13: '#60ace221',
        blueSoft20: '#60ace233',
      })
    })

    it('sky', () => {
      const blue = createAccent({ base: '#0b6aae' }, 'sky')
      expect(blue).toMatchObject({
        sky7: '#0b6aae12',
        sky10: '#0b6aae1a',
        sky13: '#0b6aae21',
        skySoft7: '#56aeff12',
        skySoft10: '#56aeff1a',
        skySoft13: '#56aeff21',
        sky20: '#0b6aae33',
        skySoft20: '#56aeff33',
        sky: '#0b6aae',
        skySoft: '#56aeff',
        skySoftLight: '#67b6ff',
        skySoftDark: '#4b97de',
        skyLight: '#2379b6',
        skyDark: '#0a5c97',
      })
    })
  })

  describe('neutral palette (special pattern, exact Figma values)', () => {
    it('neutral primary/soft and secondary families with alpha', () => {
      // ✅ pass alphaBase so neutralPrimary_* uses #191d1fxx as in Figma
      const neutral = createNeutral({
        primary: '#141D26',
      })

      expect(neutral).toMatchObject({
        // constants
        white: '#ffffff',
        black: '#000000',

        // primary ladder
        neutralPrimary: '#141d26',
        neutralPrimaryLight: '#2c343c',
        neutralPrimaryDark: '#111921',

        neutralPrimarySoft: '#ecf0f1',
        neutralPrimarySoftLight: '#eef1f2',
        neutralPrimarySoftDark: '#cdd1d2',

        // alpha for primary uses #191d1f per Figma
        neutralPrimary7: '#191d1f12',
        neutralPrimary10: '#191d1f1a',
        neutralPrimary13: '#191d1f21',
        neutralPrimary20: '#191d1f33',

        neutralPrimarySoft7: '#ecf0f112',
        neutralPrimarySoft10: '#ecf0f11a',
        neutralPrimarySoft13: '#ecf0f121',
        neutralPrimarySoft20: '#ecf0f133',

        // secondary ladder
        neutralSecondaryLight: '#6c7178',
        neutralSecondary: '#5c6169',
        neutralSecondaryDark: '#50545b',

        neutralSecondarySoftLight: '#b4bbc9',
        neutralSecondarySoft: '#acb4c3',
        neutralSecondarySoftDark: '#969daa',
      })
    })
  })

  describe('naming & alpha suffixes', () => {
    it('creates *7/*10/*13/*20 for base and Soft variants', () => {
      const sky = createAccent({ base: '#0B6AAE', soft: '#56AEFF' }, 'sky')
      ;['7', '10', '13', '20'].forEach(s => {
        expect(sky).toHaveProperty(`sky${s}`)
        expect(sky).toHaveProperty(`skySoft${s}`)
      })
    })
  })
})
