import { describe, it, expect, afterEach } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaCardActions from '../components/va-card-actions/VaCardActions.vue'

const DEFAULT_SLOT_CONTENT = 'DEFAULT_SLOT_CONTENT'

describe('VaCardActions', () => {
  const wrapper = mountWithGlobalConfig(VaCardActions, {
    slots: {
      default: DEFAULT_SLOT_CONTENT,
    },
  })

  it('should render without an error', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('component has default slot', () => {
    expect(wrapper?.text()).toBe(DEFAULT_SLOT_CONTENT)
  })

  it('component has default props', () => {
    expect(wrapper?.props('align')).toBe('left')
    expect(wrapper?.props('vertical')).toBe(false)
  })
})
