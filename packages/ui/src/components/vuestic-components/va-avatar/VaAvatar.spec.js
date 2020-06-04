import VaAvatar from './VaAvatar'

import { testIsLoadingMixin } from '../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'

describe('VaAvatar', () => {
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaAvatar)).not.toThrow()
  })
})
