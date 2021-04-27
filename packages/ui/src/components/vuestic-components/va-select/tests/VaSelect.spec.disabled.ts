import { shallowMount } from '@vue/test-utils'
import VaSelect from '../VaSelect.vue'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import ColorMixin from '../../../../services/color-config/ColorMixin'

// import { testIsFormComponent } from '../../../vuestic-mixins/testIsFormComponent'
// import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'

describe('VaSelect', () => {
  // ToDO: Fix after context will work fine
  // it('should render without an error', () => {
  //   const wrapper = mount(VaSelect)
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })
})

describe('contextable mixin', () => {
  it('should throw if prop tag does not exist in the context', () => {
    const props = {
      tag: 'a',
    }
    expect(() => testIsContextableComponent(VaSelect, props)).toThrow()
  })

  // it('is contextable component', () => {
  //   //ToDO: Fix after context will work fine
  //   const props = {
  //     value: '',
  //     label: '',
  //     placeholder: '',
  //     position: 'bottom',
  //     tagMax: 10,
  //     tags: false,
  //     deletableTags: false,
  //     searchable: false,
  //     multiple: false,
  //     disabled: false,
  //     readonly: false,
  //     width: 100,
  //     maxHeight: '128px',
  //     clearValue: '',
  //     noOptionsText: 'Items not found',
  //     fixed: true,
  //     clearable: false,
  //     hideSelected: false,
  //     allowCreate: false,
  //     clearIcon: 'close',
  //     dropdownIcon: 'arrow_drop_down',
  //   }
  //   expect(() => testIsContextableComponent(VaSelect, props)).not.toThrow()
  // })

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
      testHasColorThemeMixin((VaSelect as unknown) as ColorMixin),
    ).not.toThrow()
  })
  it('is Form Component', () => {
    // TODO Reenable after fixing select.
    // expect(() => testIsFormComponent(VaSelect)).not.toThrow()
  })
  it('has loading mixin', () => {
    // expect(() => testIsLoadingMixin(VaSelect)).not.toThrow()
  })
})
