import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaBreadcrumbs from '../VaBreadcrumbs.vue'

describe('VaBreadcrumbs', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaBreadcrumbs)
    expect(wrapper.exists()).toBeTruthy()
  })
})
