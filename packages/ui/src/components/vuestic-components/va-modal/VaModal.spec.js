import VaModal from './VaModal.vue'

import { testHasStatefulMixin } from '../../vuestic-mixins/StatefullMixin/testHasStatefulMixin'

describe('VaModal', () => {
  it('has StatefulMixin', () => {
    expect(() => testHasStatefulMixin(VaModal)).not.toThrow()
  })
})
