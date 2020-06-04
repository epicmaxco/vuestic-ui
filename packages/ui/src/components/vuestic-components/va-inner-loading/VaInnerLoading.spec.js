import VaInnerLoading from './VaInnerLoading'

import { testIsLoadingMixin } from '../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'

describe('VaInnerLoading', () => {
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaInnerLoading)).not.toThrow()
  })
})
