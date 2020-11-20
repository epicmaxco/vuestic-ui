import { mount, shallowMount } from '@vue/test-utils'
import VaSelect from '../VaSelect.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

// import { testIsFormComponent } from '../../../vuestic-mixins/FormComponent/testIsFormComponent'
import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'

describe('VaSelect', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSelect)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('reset() should clear value on single select', async () => {
    const wrapper: any = shallowMount(VaSelect, {
      propsData: {
        value: 'test',
      },
    })
    wrapper.vm.reset()
    expect(wrapper.emitted().clear).toBeTruthy()
    expect(wrapper.emitted().input[0]).toEqual([''])
  })

  it('reset() should clear value on multiple select', async () => {
    const wrapper: any = shallowMount(VaSelect, {
      propsData: {
        value: ['test'],
        multiple: true,
      },
    })
    wrapper.vm.reset()
    expect(wrapper.emitted().clear).toBeTruthy()
    expect(wrapper.emitted().input[0]).toEqual([[]])
  })

  it('reset() should clear value by clearValue prop', async () => {
    const newClearValue = 'new clear value'
    const wrapper: any = shallowMount(VaSelect, {
      propsData: {
        value: 'test',
        clearValue: newClearValue,
      },
    })
    wrapper.vm.reset()
    expect(wrapper.emitted().clear).toBeTruthy()
    expect(wrapper.emitted().input[0]).toEqual([newClearValue])
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaSelect as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
  // it('is Form Component', () => {
  //   expect(() => testIsFormComponent(VaSelect)).not.toThrow()
  // })
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaSelect)).not.toThrow()
  })
})
