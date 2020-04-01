import Vue from 'vue'

import { ColorThemePlugin } from '../../../services/ColorThemePlugin'
import { testIsContextableComponent } from '../../context-test/context-provide/testIsContextableComponent'
import VaFileUpload from './VaFileUpload'

Vue.use(ColorThemePlugin)

describe('VaFileUpload', () => {
  it('is contextable', () => {
    const props = {
      type: 'gallery',
      fileTypes: 'png',
      dropzone: true,
      value: [],
      color: 'danger',
      disabled: true,
    }
    expect(() => testIsContextableComponent(VaFileUpload, props)).not.toThrow()
  })
})
