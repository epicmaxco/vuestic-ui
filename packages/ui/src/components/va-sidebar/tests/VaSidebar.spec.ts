import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSidebar from '../VaSidebar.vue'
import { VaSidebarItem } from '../VaSidebarItem'

describe('VaSidebar', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSidebar)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should render target="_blank"', () => {
    const wrapper = mountWithGlobalConfig(VaSidebarItem, {
      props: {
        target: '_blank',
        to: 'https://google.com',
      },
    })

    expect(wrapper.element.getAttribute('target')).toBe('_blank')
  })
})
