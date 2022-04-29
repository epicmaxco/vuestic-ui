import { useColors } from '../color-config'
const {
  setColors,
  getColors,
  getColor,
  getBoxShadowColor,
  getHoverColor,
  getFocusColor,
  getGradientBackground,
  getTextColor,
  shiftHSLAColor,
  setHSLAColor,
  colorsToCSSVariable,
} = useColors()

describe('useColors', () => {
  const ignoreWarnings = () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  }

  it.each`
    getColorArgs                                  | expected
    ${['primary', undefined, false]}              | ${'#2C82E0'}
    ${['#000', undefined, false]}                 | ${'#000'}
    ${['var(--va-primary)', undefined, false]}    | ${'#2C82E0'}
    ${['bad-color', '#000', false]}               | ${'#000'}
    ${['secondary', undefined, true]}             | ${'var(--va-secondary)'}
  `(
    'getColorArgs $getColorArgs should be $expected',
    ({ getColorArgs, expected }) => {
      ignoreWarnings()

      expect(getColor(...(getColorArgs as [string, string | undefined, boolean]))).toBe(expected)
    },
  )

  it.each`
    colorToCssVariableArgs                            | expected
    ${[{ color: '#000' }, 'va-test']}                 | ${{ '--va-test-color': '#000' }}
    ${[{ color: 'secondary' }, 'va-test']}            | ${{ '--va-test-color': 'var(--va-secondary)' }}
    ${[{ color: 'var(--va-primary)' }, 'va-test']}    | ${{ '--va-test-color': '#2C82E0' }}
    ${[{ color: 'bad-color' }, 'va-test']}            | ${{ '--va-test-color': '#2C82E0' }}
    ${[{}, 'va-test']}                                | ${{}}
  `(
    'colorToCssVariableArgs $colorToCssVariableArgs should be $expected',
    ({ colorToCssVariableArgs, expected }) => {
      ignoreWarnings()

      expect(
        colorsToCSSVariable(...(colorToCssVariableArgs as [colors: { [colorName: string]: string | undefined }, prefix: string])),
      ).toMatchObject(expected)
    },
  )

  it.each`
    setColorsArg
    ${{ testColor1: '#000000' }}
    ${{ testColor1: '#000000', testColor2: '#FFFFFF' }}
    ${{ primary: '#000000' }}
  `(
    'setColorsArg $setColorsArg should returned by getColorsValue',
    ({ setColorsArg }) => {
      setColors(setColorsArg)

      const setColorArgKeys = Object.keys(setColorsArg)
      const getColorsKeys = Object.keys(getColors())
      expect(getColorsKeys).toEqual(expect.arrayContaining(setColorArgKeys))

      Object.entries(setColorsArg).forEach((el, index) => {
        expect(getColors()[setColorArgKeys[index]]).toBe(el[1])
      })
    },
  )

  it.each`
    getBoxShadowColorArg                                   | expected
    ${'#000000'}                                           | ${'rgba(0,0,0,0.4)'}
    ${'rgb(0, 0, 0)'}                                      | ${'rgba(0,0,0,0.4)'}
    ${'rgba(0, 0, 0, 1)'}                                  | ${'rgba(0,0,0,0.4)'}
    ${{ h: 0, s: 0, l: 0 }}                                | ${'rgba(0,0,0,0.4)'}
    ${{ c: 0, m: 0, y: 0, k: 0 }}                          | ${'rgba(255,255,255,0.4)'}
  `(
    'getBoxShadowColorArg $getBoxShadowColorArg should return $expected',
    ({ getBoxShadowColorArg, expected }) => {
      expect(getBoxShadowColor(getBoxShadowColorArg)).toBe(expected)
    },
  )

  it.each`
    getHoverColorArg                                       | expected
    ${'#000000'}                                           | ${'rgba(0,0,0,0.2)'}
    ${'rgb(0, 0, 0)'}                                      | ${'rgba(0,0,0,0.2)'}
    ${'rgba(0, 0, 0, 1)'}                                  | ${'rgba(0,0,0,0.2)'}
    ${{ h: 0, s: 0, l: 0 }}                                | ${'rgba(0,0,0,0.2)'}
    ${{ c: 0, m: 0, y: 0, k: 0 }}                          | ${'rgba(255,255,255,0.2)'}
  `(
    'getHoverColor $getHoverColorArg should return $expected',
    ({ getHoverColorArg, expected }) => {
      expect(getHoverColor(getHoverColorArg)).toBe(expected)
    },
  )

  it.each`
    getFocusColorArg                                   | expected
    ${'#000000'}                                           | ${'rgba(0,0,0,0.3)'}
    ${'rgb(0, 0, 0)'}                                      | ${'rgba(0,0,0,0.3)'}
    ${'rgba(0, 0, 0, 1)'}                                  | ${'rgba(0,0,0,0.3)'}
    ${{ h: 0, s: 0, l: 0 }}                                | ${'rgba(0,0,0,0.3)'}
    ${{ c: 0, m: 0, y: 0, k: 0 }}                          | ${'rgba(255,255,255,0.3)'}
  `(
    'getFocusColorArg $getFocusColorArg should return $expected',
    ({ getFocusColorArg, expected }) => {
      expect(getFocusColor(getFocusColorArg)).toBe(expected)
    },
  )
})
