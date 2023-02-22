import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import VaSkeleton from '../VaSkeleton.vue'

describe('VaSkeleton', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSkeleton)
    expect(wrapper.findComponent('VaSkeleton')).toBeTruthy()
  })
})
