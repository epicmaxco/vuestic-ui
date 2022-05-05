import { useClearable } from '../useClearable'
import { ref } from 'vue'

describe('useClearable', () => {
  it.each`
    props                                                                                    | inputValue                 | isFocused             | hasErrors              | expected
    ${{ clearable: true, clearableIcon: '', clearValue: '' }}                                | ${ref('inputValue')} | ${ref(false)}   | ${ref(true)}     | ${{ canBeCleared: true, clearIconColor: 'danger', clearIconProps: { color: 'danger', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: '' }}                                | ${ref('inputValue')} | ${ref(true)}    | ${ref(true)}     | ${{ canBeCleared: true, clearIconColor: 'primary', clearIconProps: { color: 'primary', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: '' }}                                | ${ref('inputValue')} | ${ref(true)}    | ${ref(false)}    | ${{ canBeCleared: true, clearIconColor: 'primary', clearIconProps: { color: 'primary', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: '', success: true }}                 | ${ref('inputValue')} | ${ref(true)}    | ${ref(false)}    | ${{ canBeCleared: true, clearIconColor: 'primary', clearIconProps: { color: 'primary', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: '', color: 'white' }}                | ${ref('inputValue')} | ${ref(true)}    | ${ref(false)}    | ${{ canBeCleared: true, clearIconColor: 'white', clearIconProps: { color: 'white', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: '', readonly: true }}                | ${ref('inputValue')} | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: false, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: '', disabled: true }}                | ${ref('inputValue')} | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: false, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }}                      | ${ref('inputValue')} | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: true, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }}                      | ${ref('clearValue')} | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: false, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }}                      | ${ref(null)}         | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: false, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }}                      | ${ref(undefined)}    | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: false, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: '', size: 'small' } }}
    ${{ clearable: true, clearableIcon: 'highlight_off', clearValue: '', success: true }}    | ${ref('inputValue')} | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: true, clearIconColor: 'success', clearIconProps: { color: 'success', name: 'highlight_off', size: 'small' } }}
    ${{ clearable: false, clearableIcon: '', clearValue: '' }}                               | ${ref('inputValue')} | ${ref(false)}   | ${ref(false)}    | ${{ canBeCleared: false, clearIconColor: 'gray', clearIconProps: { color: 'gray', name: '', size: 'small' } }}
  `(
    'props $props & isFocused $isFocused & hasErrors $hasErrors & inputValue $inputValue should be $expected',
    ({ props, inputValue, isFocused, hasErrors, expected }) => {
      const { canBeCleared, clearIconColor, clearIconProps } = useClearable(props, inputValue, isFocused, hasErrors)

      const result = { canBeCleared: canBeCleared.value, clearIconColor: clearIconColor.value, clearIconProps: clearIconProps.value }
      expect(result).toMatchObject(expected)
    },
  )
})
