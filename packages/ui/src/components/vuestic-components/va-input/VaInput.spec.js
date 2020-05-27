import Vue from 'vue'
import VaInput from './VaInput'

import { ColorThemePlugin } from '../../../services/ColorThemePlugin'
import { testIsFormComponent } from '../../vuestic-mixins/testIsFormComponent'

// TODO Everything should work without this plugin.
Vue.use(ColorThemePlugin)

describe('VaInput', () => {
  it('is FormElement', () => {
    expect(() => testIsFormComponent(VaInput)).not.toThrow()
  })
})
