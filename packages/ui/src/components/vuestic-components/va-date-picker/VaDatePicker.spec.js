import VaDatePicker from './VaDatePicker'
import { testIsConfigProvidedComponent } from '../../../services/config-transport/testIsConfigProvidedComponent'
import iconsFrameworkConfig
  from '../va-config/config-default/va-icons-framework-config'

describe('VaDatePicker', () => {
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
    expect(() => testIsConfigProvidedComponent(
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
