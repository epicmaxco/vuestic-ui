import { shallowMount } from '@vue/test-utils'
import VaDataTable from './VaDataTable'

jest.mock('epic-spinners', () => jest.fn())
jest.mock('vuetable-2/src/components/Vuetable', () => jest.fn())

describe('VaDataTable', () => {
  it('properly sorts numeric values', () => {
    const wrapper = shallowMount(VaDataTable, {
      propsData: {
        data: [{ num: 1 }, { num: 3 }, { num: 2 }, { num: 4 }],
        fields: ['num'],
      },
    })

    const expectedAsc = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }]

    expect(new Set(wrapper.vm.sortAsc(wrapper.vm.data, 'num'))).toEqual(new Set(expectedAsc))
    expect(new Set(wrapper.vm.sortDesc(wrapper.vm.data, 'num'))).toEqual(new Set(expectedAsc.reverse()))
  })

  it('properly sorts alphanumeric values', () => {
    const wrapper = shallowMount(VaDataTable, {
      propsData: {
        data: [{ alnum: 'a1' }, { alnum: 'a3' }, { alnum: 'b2' }, { alnum: 'a4' }],
        fields: ['alnum'],
      },
    })

    const expectedAsc = [{ alnum: 'a1' }, { alnum: 'a3' }, { alnum: 'a4' }, { alnum: 'b2' }]

    expect(new Set(wrapper.vm.sortAsc(wrapper.vm.data, 'alnum'))).toEqual(new Set(expectedAsc))
    expect(new Set(wrapper.vm.sortDesc(wrapper.vm.data, 'alnum'))).toEqual(new Set(expectedAsc.reverse()))
  })
})
