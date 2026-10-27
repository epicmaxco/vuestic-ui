import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'
import VaTextarea from '../VaTextarea.vue'

describe('VaTextarea rows when autosize is disabled', () => {
  it.each([5, '5'])('respects minRows=%s without maxRows', async (minRows) => {
    const wrapper = mountWithGlobalConfig(VaTextarea, { props: { autosize: false, minRows } })
    try {
      await nextTick()
      const textarea = wrapper.get('textarea')
      expect(textarea.attributes('rows')).toBe('5')
      expect(textarea.element.rows).toBe(5)

      await wrapper.setProps({ minRows: 7 })
      expect(textarea.attributes('rows')).toBe('7')
      expect(textarea.element.rows).toBe(7)
    } finally {
      wrapper.unmount()
    }
  })

  it.each([8, '8'])('preserves explicit maxRows=%s', async (maxRows) => {
    const wrapper = mountWithGlobalConfig(VaTextarea, { props: { autosize: false, minRows: 5, maxRows } })
    try {
      await nextTick()
      const textarea = wrapper.get('textarea')
      expect(textarea.attributes('rows')).toBe('8')
      expect(textarea.element.rows).toBe(8)

      await wrapper.setProps({ maxRows: undefined })
      expect(textarea.attributes('rows')).toBe('5')
      expect(textarea.element.rows).toBe(5)
    } finally {
      wrapper.unmount()
    }
  })
})
