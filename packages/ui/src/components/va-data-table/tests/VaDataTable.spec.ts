import { shallowMount, VueWrapper } from '@vue/test-utils'

import VaDataTable from '../VaDataTable.vue'

describe('VaDataTable', () => {
  let wrapper: VueWrapper<any> | null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it('should render without an error', () => {
    wrapper = shallowMount(VaDataTable)
    expect(wrapper.exists()).toBeTruthy()
  })
})
