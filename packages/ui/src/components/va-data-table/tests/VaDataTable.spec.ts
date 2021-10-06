import { mount } from '@vue/test-utils'
import VaDataTable from '../VaDataTable.vue'

describe('VaDataTable', () => {
  let wrapper: any

  afterEach(() => {
    wrapper.unmount()
    wrapper = null
  })

  it('should render without an error', () => {
    wrapper = mount(VaDataTable)
    expect(wrapper.findComponent('VaDataTable')).toBeTruthy()
  })
})
