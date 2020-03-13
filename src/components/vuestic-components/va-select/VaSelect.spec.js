import VaSelect from './VaSelect.vue'

import { testIsFormComponent } from '../../vuestic-mixins/testIsFormComponent'

describe('VaSelect', () => {
  it('is Form Component', () => {
    expect(() => testIsFormComponent(VaSelect)).not.toThrow()
  })
})
