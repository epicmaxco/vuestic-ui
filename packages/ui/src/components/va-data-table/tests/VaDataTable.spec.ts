import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaDataTable from '../VaDataTable.vue'

describe('VaDataTable', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaDataTable)
    expect(wrapper.exists()).toBeTruthy()
  })
})
