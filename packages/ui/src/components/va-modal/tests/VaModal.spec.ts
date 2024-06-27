import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaModal from '../VaModal.vue'

describe('VaModal', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaModal)
    expect(wrapper.exists()).toBeTruthy()
  })
})

// describe('VaModal', () => {
  // describe('methods and events', () => {
  //   const testClass = 'test-class'

  //   const createWrapper: any = ({ stateful = true, ...rest }) => {
  //     const transitionStub: any = () =>
  //       ({
  //         render: function () {
  //           return this.$options._renderChildren
  //         },
  //       } as any)

  //     return mountWithGlobalConfig(VaModal, {
  //       propsData: { stateful, ...rest },
  //       stubs: {
  //         transition: transitionStub(),
  //       },
  //       slots: {
  //         default: [`<div class="${testClass}" />`],
  //       },
  //     })
  //   }

  //   describe('show()', () => {
  //     it('should change state value to `true` on stateful component', async () => {
  //       const wrapper: any = createWrapper({ stateful: true })

  //       const modal: any = wrapper.vm

  //       expect(wrapper.contains(`.${testClass}`)).toBe(false)

  //       await modal.show()

  //       expect(wrapper.contains(`.${testClass}`)).toBe(true)

  //       // TODO: do we need emitting if stateful?
  //       expect(wrapper.emitted().input.length).toBe(1)
  //       expect(wrapper.emitted().input[0][0]).toBe(true)
  //     })

  //     it('should emit `input` with `true` on stateless component', async () => {
  //       const wrapper: any = createWrapper({ stateful: false })

  //       const modal: any = wrapper.vm

  //       expect(wrapper.contains(`.${testClass}`)).toBe(false)

  //       await modal.show()

  //       expect(wrapper.contains(`.${testClass}`)).toBe(false)

  //       expect(wrapper.emitted().input.length).toBe(1)
  //       expect(wrapper.emitted().input[0][0]).toBe(true)
  //     })
  //   })

  //   describe('hide()', () => {
  //     it('should change state value to `false` on stateful component', async () => {
  //       const wrapper: any = createWrapper({ stateful: true })

  //       const modal: any = wrapper.vm

  //       await modal.show()

  //       expect(wrapper.contains(`.${testClass}`)).toBe(true)

  //       await modal.hide()
  //       await wrapper.vm.$nextTick()

  //       expect(wrapper.contains(`.${testClass}`)).toBe(false)

  //       expect(wrapper.emitted().input.length).toBe(2)
  //       expect(wrapper.emitted().input[1][0]).toBe(false)
  //     })

  //     it('should emit `input` with `false` on stateless component', async () => {
  //       const wrapper: any = createWrapper({ stateful: false })

  //       const modal: any = wrapper.vm

  //       await modal.show()
  //       expect(wrapper.emitted().input.length).toBe(1)
  //       expect(wrapper.emitted().input[0][0]).toBe(true)

  //       await modal.hide()
  //       expect(wrapper.emitted().input.length).toBe(2)
  //       expect(wrapper.emitted().input[1][0]).toBe(false)
  //     })
  //   })

  //   describe('toggle()', () => {
  //     it('should change state value to the opposite value on stateful component', async () => {
  //       const wrapper: any = createWrapper({ stateful: true })

  //       const modal: any = wrapper.vm

  //       expect(wrapper.contains(`.${testClass}`)).toBe(false)

  //       await modal.toggle()

  //       expect(wrapper.contains(`.${testClass}`)).toBe(true)

  //       expect(wrapper.emitted().input.length).toBe(1)
  //       expect(wrapper.emitted().input[0][0]).toBe(true)

  //       await modal.toggle()
  //       await wrapper.vm.$nextTick()

  //       expect(wrapper.contains(`.${testClass}`)).toBe(false)

  //       expect(wrapper.emitted().input.length).toBe(2)
  //       expect(wrapper.emitted().input[1][0]).toBe(false)
  //     })

  //     it('should emit `input` with the opposite value on stateless component', async () => {
  //       const wrapper: any = createWrapper({ stateful: false })

  //       const modal: any = wrapper.vm

  //       await modal.toggle()

  //       expect(wrapper.emitted().input.length).toBe(1)
  //       expect(wrapper.emitted().input[0][0]).toBe(true)

  //       wrapper.setProps({ value: true })

  //       await modal.toggle()

  //       expect(wrapper.emitted().input.length).toBe(2)
  //       expect(wrapper.emitted().input[1][0]).toBe(false)
  //     })
  //   })

  //   it('should emit `clickOutside` event', async () => {
  //     const wrapper: any = createWrapper({ stateful: true })

  //     await wrapper.vm.show()

  //     await wrapper.vm.$nextTick()

  //     const clickEvent = new MouseEvent('mousedown', { button: 0, bubbles: true })
  //     document.body.dispatchEvent(clickEvent)

  //     expect(wrapper.emitted().clickOutside.length).toBe(1)
  //   })
  // })
// })
