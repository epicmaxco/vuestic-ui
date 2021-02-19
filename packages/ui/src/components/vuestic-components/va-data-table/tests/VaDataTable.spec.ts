// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import VaDataTable from '../VaDataTable.vue'

import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'
jest.mock('vuetable-2/src/components/Vuetable', () => jest.fn())
describe('VaDataTable', () => {
  it('should properly sort numeric values', () => {
    const wrapper = shallowMount(VaDataTable, {
      propsData: {
        data: [{ num: 1 }, { num: 10 }, { num: 3 }, { num: 2 }, { num: 13 }, { num: 4 }],
        fields: ['num'],
      },
    })

    const expectedAsc = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 10 }, { num: 13 }]

    expect(new Set(wrapper.vm.sortAsc(wrapper.vm.data, 'num'))).toEqual(new Set(expectedAsc))
    expect(new Set(wrapper.vm.sortDesc(wrapper.vm.data, 'num'))).toEqual(new Set(expectedAsc.reverse()))
  })

  it('should properly sort alphanumeric values', () => {
    const wrapper = shallowMount(VaDataTable, {
      propsData: {
        data: [{ alnum: '0' }, { alnum: 'b11' }, { alnum: 'a1' }, { alnum: 'a3' }, { alnum: 'b2' }, { alnum: 'a4' }],
        fields: ['alnum'],
      },
    })

    const expectedAsc = [{ alnum: '0' }, { alnum: 'a1' }, { alnum: 'a3' }, { alnum: 'a4' }, { alnum: 'b2' }, { alnum: 'b11' }]

    expect(new Set(wrapper.vm.sortAsc(wrapper.vm.data, 'alnum'))).toEqual(new Set(expectedAsc))
    expect(new Set(wrapper.vm.sortDesc(wrapper.vm.data, 'alnum'))).toEqual(new Set(expectedAsc.reverse()))
  })
  it('has loading mixin', () => {
    const props = {
      data: [],
    }
    expect(() => testIsLoadingMixin(VaDataTable, props)).not.toThrow()
  })
})
