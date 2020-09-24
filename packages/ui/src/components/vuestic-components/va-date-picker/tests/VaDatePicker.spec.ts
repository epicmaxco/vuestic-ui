import { mount } from '@vue/test-utils'

import VaDatePicker from '../VaDatePicker.vue'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
// @ts-ignore
import iconsFrameworkConfig from '../../../context-test/context-provide/context/va-icons-framework-config'

describe('VaDatePicker', () => {
  it('should render without an error', () => {
    // TODO: Fix icon config
    // const wrapper = mount(VaDatePicker)
    // expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is contextable', () => {
    const props = {
      value: null,
      weekDays: true,
      placeholder: '123',
      label: '1234',
      disabled: true,
      error: true,
      success: true,
      messages: ['1'],
      errorMessages: ['1'],
      config: {},
    }
    expect(() => testIsContextableComponent(
      VaDatePicker,
      props,
      undefined,
      {
        VaIcon: {
          iconsConfig: {
            defaultFont: 'md',
            icons: {
              ...iconsFrameworkConfig,
            },
          },
        },
      })).not.toThrow()
  })
})
