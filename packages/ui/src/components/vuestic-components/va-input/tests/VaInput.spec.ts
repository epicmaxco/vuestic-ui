import { mount } from '@vue/test-utils'

import VaInput from '../VaInput.vue'
import { testIsFormComponent } from '../../../vuestic-mixins/FormComponent/testIsFormComponent'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

describe('VaInput', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaInput)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is FormElement', () => {
    expect(() => testIsFormComponent(VaInput)).not.toThrow()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaInput as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
