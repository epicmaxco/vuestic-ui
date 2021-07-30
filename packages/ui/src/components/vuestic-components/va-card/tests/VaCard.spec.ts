import { shallowMount } from '@vue/test-utils'
import VaCard from '../VaCard.vue'

// import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
// import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
// import { ColorMixin } from '../../../../services/color-config/ColorMixin'

describe('VaCard', () => {
  let wrapper

  const createComponent = () => {
    wrapper = shallowMount(VaCard)
  }
  // it.skip('should render without an error', () => {
  //   const wrapper = mount(VaCard)
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })

  // it.skip('is contextable', () => {
  //   const props = {
  //     tag: 'a',
  //     square: true,
  //     outlined: true,
  //     bordered: false,
  //     disabled: true,
  //     href: 'example.com',
  //     target: '_blank',
  //     stripe: true,
  //     stripeColor: 'purple',
  //     gradient: true,
  //   }
  //   expect(() => testIsContextableComponent(VaCard, props)).not.toThrow()
  // })

  // it.skip('has ColorThemeMixin', () => {
  //   expect(() =>
  //     testHasColorThemeMixin((VaCard as unknown) as ColorThemeMixin),
  //   ).not.toThrow()
  // })

  it('sanity', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })
})
