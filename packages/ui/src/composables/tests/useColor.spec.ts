import { useColors } from '../../services/color-config/color-config'
const { getColor, colorsToCSSVariable } = useColors()

/**
 * useColor composable inherits or/and exports useColors (color-config), therefore here will be tested useColors
 */

describe('useColors', () => {
  const ignoreWarnings = () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  }

  it.each`
    getColorValue                                 | expected
    ${['primary', undefined, false]}              | ${'#2C82E0'}
    ${['#000', undefined, false]}                 | ${'#000'}
    ${['var(--va-primary)', undefined, false]}    | ${'#2C82E0'}
    ${['bad-color', '#000', false]}               | ${'#000'}
    ${['secondary', undefined, true]}             | ${'var(--va-secondary)'}
  `(
    'getColorValue $getColorValue should be $expected',
    ({ getColorValue, expected }) => {
      ignoreWarnings()

      const getColorArgs: [string, string | undefined, boolean] = getColorValue
      expect(getColor(...getColorArgs)).toBe(expected)
    },
  )

  it.each`
    colorToCssVariableValue                           | expected
    ${[{ color: '#000' }, 'va-test']}                 | ${{ '--va-test-color': '#000' }}
    ${[{ color: 'secondary' }, 'va-test']}            | ${{ '--va-test-color': 'var(--va-secondary)' }}
    ${[{ color: 'var(--va-primary)' }, 'va-test']}    | ${{ '--va-test-color': '#2C82E0' }}
    ${[{ color: 'bad-color' }, 'va-test']}            | ${{ '--va-test-color': '#2C82E0' }}
    ${[{}, 'va-test']}                                | ${{}}
  `(
    'colorToCssVariableValue $colorToCssVariableValue should be $expected',
    ({ colorToCssVariableValue, expected }) => {
      ignoreWarnings()

      const colorToCssVariableArgs: [colors: { [colorName: string]: string | undefined }, prefix: string] = colorToCssVariableValue
      expect(colorsToCSSVariable(...colorToCssVariableArgs)).toMatchObject(expected)
    },
  )
})
