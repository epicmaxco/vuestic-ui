import { useClearable } from '../useClearable'

describe('useClearable', () => {
  it.each`
    props                                                                                             | isFocused            | hasErrors            | expected
    ${{ clearable: false, clearableIcon: 'highlight_off', clearValue: '' }}                           | ${{ value: false }}  | ${{ value: false }}  | ${{ canBeCleared: false, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: 'highlight_off', size: 'small' } }}
    ${{ clearable: true, clearableIcon: 'highlight_off', clearValue: '' }}                            | ${{ value: false }}  | ${{ value: true }}   | ${{ canBeCleared: true, clearIconColor: 'danger', clearIconProps: { color: 'danger', name: 'highlight_off', size: 'small' } }}
    ${{ clearable: false, clearableIcon: '', clearValue: 'clearValue', color: 'white' }}              | ${{ value: true }}   | ${{ value: false }}  | ${{ canBeCleared: false, clearIconColor: 'white', clearIconProps: { color: 'white', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: 'highlight_off', clearValue: '', success: true }}             | ${{ value: false }}  | ${{ value: false }}  | ${{ canBeCleared: true, clearIconColor: 'success', clearIconProps: { color: 'success', name: 'highlight_off', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: 'clearValue', readonly: true }}               | ${{ value: true }}   | ${{ value: false }}  | ${{ canBeCleared: false, clearIconColor: 'primary', clearIconProps: { color: 'primary', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: '', readonly: true }}                         | ${{ value: true }}   | ${{ value: true }}   | ${{ canBeCleared: false, clearIconColor: 'primary', clearIconProps: { color: 'primary', name: '', size: 'small' } }}
    ${{ clearable: false, clearableIcon: '', clearValue: '', success: true, disabled: true }}         | ${{ value: false }}   | ${{ value: false }} | ${{ canBeCleared: false, clearIconColor: 'success', clearIconProps: { color: 'success', name: '', size: 'small' } }}
  `(
    'props $props & isFocused $isFocused & hasErrors $hasErrors should be $expected',
    ({ props, isFocused, hasErrors, expected }) => {
      // @ts-ignore
      const { canBeCleared, clearIconColor, clearIconProps } = useClearable(props, { value: 'inputValue' }, isFocused, hasErrors)

      expect({ canBeCleared: canBeCleared.value, clearIconColor: clearIconColor.value, clearIconProps: clearIconProps.value }).toMatchObject(expected)
    },
  )
})
