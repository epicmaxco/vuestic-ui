import Vue from 'vue'

import { ColorThemePlugin } from '../../../../services/color-config/ColorMixin'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
import VaFileUpload from '../VaFileUpload.vue'

// @ts-ignore
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
