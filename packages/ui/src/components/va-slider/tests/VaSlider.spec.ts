import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSlider from '../VaSlider.vue'

describe('VaSlider', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSlider)
    expect(wrapper.exists()).toBeTruthy()
  })

  it.each([
    { range: false, start: 40, dragged: 80, min: 0, max: 60, expected: 60 },
    { range: true, start: [20, 40], dragged: [20, 80], min: 0, max: 60, expected: [20, 60] },
    { range: true, start: [20, 40], dragged: [20, 80], min: 50, max: 100, expected: [50, 80] },
  ])('commits within the current bounds when they change during a drag: $expected', async ({
    range, start, dragged, min, max, expected,
  }) => {
    const wrapper = mountWithGlobalConfig(VaSlider, {
      attachTo: document.body,
      props: { range, modelValue: start },
    })
    const track = wrapper.get('.va-slider__container')
    Object.defineProperty(track.element, 'offsetWidth', { value: 100 })

    try {
      await track.trigger('mousedown', { clientX: 40 })
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: 80 }))
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([dragged])
      await wrapper.setProps({ modelValue: dragged, min, max })

      const previousChanges = wrapper.emitted('change')?.length ?? 0
      window.dispatchEvent(new MouseEvent('mouseup', { clientX: 80 }))

      expect(wrapper.emitted('change')?.slice(previousChanges)).toEqual([[expected]])
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([expected])
    } finally {
      wrapper.unmount()
    }
  })
})
