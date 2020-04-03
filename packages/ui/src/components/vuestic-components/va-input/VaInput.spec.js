import Vue from 'vue'
import VaInput from './VaInput'

import { ColorThemePlugin } from '../../../services/ColorThemePlugin'
import { testIsFormComponent } from '../../vuestic-mixins/testIsFormComponent'

// TODO Should work without ColorThemePlugin.
Vue.use(ColorThemePlugin)

describe('VaInput', () => {
  it('is FormElement', () => {
    expect(() => testIsFormComponent(VaInput)).not.toThrow()
  })
})
