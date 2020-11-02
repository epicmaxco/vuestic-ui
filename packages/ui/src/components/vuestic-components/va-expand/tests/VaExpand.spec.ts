import { shallowMount } from '@vue/test-utils'

import { testHasStatefulMixin } from '../../../vuestic-mixins/StatefulMixin/testHasStatefulMixin'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { testHasKeyboardOnlyFocusMixin } from '../../../vuestic-mixins/KeyboardOnlyFocusMixin/testHasKeyboardOnlyFocusMixin'

import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { KeyboardOnlyFocusMixin } from '../../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

import VaExpand from '../VaExpand.vue'

describe('VaExpand', () => {
  it('should render without an error', () => {
  // -------------- Troxubles with an icon context ------------------
    // const wrapper = mount(VaExpand)
    // expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has StatefulMixin', () => {
    expect(() =>
      testHasStatefulMixin((VaExpand as unknown) as StatefulMixin),
    ).not.toThrow()
  })
  it('has KeyboardOnlyFocusMixin', () => {
    expect(() =>
      testHasKeyboardOnlyFocusMixin((VaExpand as unknown) as KeyboardOnlyFocusMixin),
    ).not.toThrow()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaExpand as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })

  // -------------- Troxubles with an icon context ------------------
  // it('is contextable', () => {
  //   const props = {
  //     value: false,
  //     disabled: false,
  //     header: '',
  //     icon: '',
  //     solid: false,
  //     color: '',
  //     textColor: '',
  //     colorAll: false,
  //   }
  //   expect(() => testIsContextableComponent(VaExpand, props)).not.toThrow()
  // })

  it('should have disabled class', () => {
    const wrapper = shallowMount(VaExpand, {
      propsData: {
        value: true,
        disabled: true,
        solid: true,
      },
      data () {
        return {
          popout: true,
          inset: true,
        }
      },
    })
    expect(wrapper.classes()).toContain('va-expand--disabled')
    expect(wrapper.classes()).toContain('va-expand--solid')
    expect(wrapper.classes()).toContain('va-expand--solid--active')
    expect(wrapper.classes()).toContain('va-expand--popout')
    expect(wrapper.classes()).toContain('va-expand--inset')
  })

  it('should emit `input`', async () => {
    const wrapper: any = shallowMount(VaExpand)
    await wrapper.vm.changeValue()
    expect(wrapper.emitted().input.length).toBe(1)
  })

  it('should emit `focus`', async () => {
    const wrapper: any = shallowMount(VaExpand)
    await wrapper.vm.onFocus()
    expect(wrapper.emitted().focus.length).toBe(1)
  })

  it('should be triggered on mousedown', async () => {
    const wrapper: any = shallowMount(VaExpand)
    const expandHeader = wrapper.find('.va-expand__header')

    await expandHeader.trigger('mousedown')
    expect(wrapper.vm.hasMouseDown).toBe(true)
    await expandHeader.trigger('mouseup')
    expect(wrapper.vm.hasMouseDown).toBe(false)
  })
})
