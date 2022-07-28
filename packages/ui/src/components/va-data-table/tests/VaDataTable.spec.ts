import { shallowMount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, afterEach } from 'vitest'

import VaDataTable from '../VaDataTable.vue'
import {
  GLOBAL_CONFIG,
  createGlobalConfig,
} from '../../../services/global-config/global-config'

describe('VaDataTable', () => {
  let wrapper: VueWrapper<any> | null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
  })

  it('should render without an error', () => {
    wrapper = shallowMount(VaDataTable, {
      global: {
        provide: {
          [GLOBAL_CONFIG]: createGlobalConfig(),
        },
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })
})
