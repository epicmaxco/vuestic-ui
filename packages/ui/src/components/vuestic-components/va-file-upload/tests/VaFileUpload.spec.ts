import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'
import VaFileUpload from '../VaFileUpload.vue'

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
    expect(() => testIsConfigProvidedComponent(VaFileUpload, props)).not.toThrow()
  })
})
