import noop from 'lodash/noop'
import { mount } from '@vue/test-utils'

import { testHasStatefulMixin } from '../../../vuestic-mixins/StatefulMixin/testHasStatefulMixin'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'
import VaModal from '../VaModal.vue'

describe('VaModal', () => {
  describe('stateful mixin', () => {
    // Manually disable the vue props check here
    // because `testHasStatefulMixin` uses `value: string`
    // instead of `value: boolean`
    let logError: any
    beforeEach(() => {
      // eslint-disable-next-line no-console
      logError = console.error
      // eslint-disable-next-line no-console
      console.error = noop
    })

    afterEach(() => {
      // eslint-disable-next-line no-console
      console.error = logError
    })

    it('has StatefulMixin', () => {
      expect(() =>
        testHasStatefulMixin((VaModal as unknown) as StatefulMixin),
      ).not.toThrow()
    })
  })

  describe('contextable mixin', () => {
    it('should throw if prop tag does not exist in the context', () => {
      const props = {
        tag: 'a',
      }
      expect(() => testIsContextableComponent(VaModal, props)).toThrow()
    })
    it('is contextable', () => {
      const props = {
        value: false,
        title: '',
        message: '',
        okText: 'OK',
        cancelText: 'Cancel',
        hideDefaultActions: false,
        fullscreen: false,
        mobileFullscreen: true,
        noDismiss: false,
        noOutsideDismiss: false,
        noEscDismiss: false,
        maxWidth: '',
        maxHeight: '',
        size: 'medium',
        fixedLayout: false,
        withoutTransitions: false,
        overlay: true,
        overlayOpacity: undefined,
        zIndex: undefined,
      }
      expect(() => testIsContextableComponent(VaModal, props)).not.toThrow()
    })
  })

  describe('methods and events', () => {
    const testClass = 'test-class'

    const createWrapper: any = ({ stateful = true, ...rest }) => {
      const transitionStub: any = () =>
        ({
          render: function () {
            return this.$options._renderChildren
          },
        } as any)

      return mount(VaModal, {
        propsData: { stateful, ...rest },
        stubs: {
          transition: transitionStub(),
        },
        slots: {
          default: [`<div class="${testClass}" />`],
        },
      })
    }

    describe('show()', () => {
      it('should change state value to `true` on stateful component', async () => {
        const wrapper: any = createWrapper({ stateful: true })

        const modal: any = wrapper.vm

        expect(wrapper.contains(`.${testClass}`)).toBe(false)

        await modal.show()

        expect(wrapper.contains(`.${testClass}`)).toBe(true)

        // TODO: do we need emitting if stateful?
        expect(wrapper.emitted().input.length).toBe(1)
        expect(wrapper.emitted().input[0][0]).toBe(true)
      })

      it('should emit `input` with `true` on stateless component', async () => {
        const wrapper: any = createWrapper({ stateful: false })

        const modal: any = wrapper.vm

        expect(wrapper.contains(`.${testClass}`)).toBe(false)

        await modal.show()

        expect(wrapper.contains(`.${testClass}`)).toBe(false)

        expect(wrapper.emitted().input.length).toBe(1)
        expect(wrapper.emitted().input[0][0]).toBe(true)
      })
    })

    describe('hide()', () => {
      it('should change state value to `false` on stateful component', async () => {
        const wrapper: any = createWrapper({ stateful: true })

        const modal: any = wrapper.vm

        await modal.show()

        expect(wrapper.contains(`.${testClass}`)).toBe(true)

        await modal.hide()
        await wrapper.vm.$nextTick()

        expect(wrapper.contains(`.${testClass}`)).toBe(false)

        expect(wrapper.emitted().input.length).toBe(2)
        expect(wrapper.emitted().input[1][0]).toBe(false)
      })

      it('should emit `input` with `false` on stateless component', async () => {
        const wrapper: any = createWrapper({ stateful: false })

        const modal: any = wrapper.vm

        await modal.show()
        expect(wrapper.emitted().input.length).toBe(1)
        expect(wrapper.emitted().input[0][0]).toBe(true)

        await modal.hide()
        expect(wrapper.emitted().input.length).toBe(2)
        expect(wrapper.emitted().input[1][0]).toBe(false)
      })
    })

    describe('toggle()', () => {
      it('should change state value to the opposite value on stateful component', async () => {
        const wrapper: any = createWrapper({ stateful: true })

        const modal: any = wrapper.vm

        expect(wrapper.contains(`.${testClass}`)).toBe(false)

        await modal.toggle()

        expect(wrapper.contains(`.${testClass}`)).toBe(true)

        expect(wrapper.emitted().input.length).toBe(1)
        expect(wrapper.emitted().input[0][0]).toBe(true)

        await modal.toggle()
        await wrapper.vm.$nextTick()

        expect(wrapper.contains(`.${testClass}`)).toBe(false)

        expect(wrapper.emitted().input.length).toBe(2)
        expect(wrapper.emitted().input[1][0]).toBe(false)
      })

      it('should emit `input` with the opposite value on stateless component', async () => {
        const wrapper: any = createWrapper({ stateful: false })

        const modal: any = wrapper.vm

        await modal.toggle()

        expect(wrapper.emitted().input.length).toBe(1)
        expect(wrapper.emitted().input[0][0]).toBe(true)

        wrapper.setProps({ value: true })

        await modal.toggle()

        expect(wrapper.emitted().input.length).toBe(2)
        expect(wrapper.emitted().input[1][0]).toBe(false)
      })
    })

    it('should emit `clickOutside` event', async () => {
      const wrapper: any = createWrapper({ stateful: true })

      await wrapper.vm.show()

      await wrapper.vm.$nextTick()

      const clickEvent = new MouseEvent('mousedown', { button: 0, bubbles: true })
      document.body.dispatchEvent(clickEvent)

      expect(wrapper.emitted().clickOutside.length).toBe(1)
    })
  })
})
