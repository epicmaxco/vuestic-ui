import { useClearable } from '../useClearable'
import { ref } from 'vue'
import { describe, it, expect } from 'vitest'

describe('useClearable', () => {
  it.each([
    /* eslint-disable */
  // props                                                                                 | inputValue              | isFocused         | hasErrors           | expected
    [{ clearable: true, clearableIcon: '', clearValue: '' }                                , ref('inputValue') , ref(false)   , ref(true)     , { canBeCleared: true, clearIconColor: 'danger', clearIconProps: { color: 'danger', name: '', size: 'small' } }               ],
    [{ clearable: true, clearableIcon: '', clearValue: '' }                                , ref('inputValue') , ref(true)    , ref(true)     , { canBeCleared: true, clearIconColor: 'danger', clearIconProps: { color: 'danger', name: '', size: 'small' } }               ],
    [{ clearable: true, clearableIcon: '', clearValue: '' }                                , ref('inputValue') , ref(true)    , ref(false)    , { canBeCleared: true, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }         ],
    [{ clearable: true, clearableIcon: '', clearValue: '', success: true }                 , ref('inputValue') , ref(true)    , ref(false)    , { canBeCleared: true, clearIconColor: 'success', clearIconProps: { color: 'success', name: '', size: 'small' } }             ],
    [{ clearable: true, clearableIcon: '', clearValue: '', color: 'white' }                , ref('inputValue') , ref(true)    , ref(false)    , { canBeCleared: true, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }                 ],
    [{ clearable: true, clearableIcon: '', clearValue: '', readonly: true }                , ref('inputValue') , ref(false)   , ref(false)    , { canBeCleared: false, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }        ],
    [{ clearable: true, clearableIcon: '', clearValue: '', disabled: true }                , ref('inputValue') , ref(false)   , ref(false)    , { canBeCleared: false, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }        ],
    [{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }                      , ref('inputValue') , ref(false)   , ref(false)    , { canBeCleared: true, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }         ],
    [{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }                      , ref('clearValue') , ref(false)   , ref(false)    , { canBeCleared: false, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }        ],
    [{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }                      , ref(null)         , ref(false)   , ref(false)    , { canBeCleared: false, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }        ],
    [{ clearable: true, clearableIcon: '', clearValue: 'clearValue' }                      , ref(undefined)    , ref(false)   , ref(false)    , { canBeCleared: false, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }        ],
    [{ clearable: true, clearableIcon: 'highlight_off', clearValue: '', success: true }    , ref('inputValue') , ref(false)   , ref(false)    , { canBeCleared: true, clearIconColor: 'success', clearIconProps: { color: 'success', name: 'highlight_off', size: 'small' } }],
    [{ clearable: false, clearableIcon: '', clearValue: '' }                               , ref('inputValue') , ref(false)   , ref(false)    , { canBeCleared: false, clearIconColor: 'secondary', clearIconProps: { color: 'secondary', name: '', size: 'small' } }        ],
    /* eslint-enable */

  ])('%#: props %s & inputValue %s & isFocused %s & hasErrors %s & should be %s', (props, inputValue, isFocused, hasErrors, expected) => {
    const { canBeCleared, clearIconColor, clearIconProps } = useClearable(props, inputValue, isFocused, hasErrors)

    const result = { canBeCleared: canBeCleared.value, clearIconColor: clearIconColor.value, clearIconProps: clearIconProps.value }
    expect(result).toMatchObject(expected)
  })
})
