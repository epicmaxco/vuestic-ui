import { CreateElement, Component } from 'vue'
import { mount } from '@vue/test-utils'
import VaConfig from '../../components/vuestic-components/va-config/VaConfig'

// Check passed props are from config.
// componentProps could be used to pass down required props.
// globalConfigProps are for declaring global configs, such as icons and sizes.
export function testIsConfigProvidedComponent (
  componentOptions: Component,
  localConfigProps: Record<string, any>,
  componentProps?: Record<string, any>,
  globalConfigProps?: Record<string, any>,
) {
  const wrapperComponentOptions = {
    render (createElement: CreateElement) {
      return createElement(
        VaConfig,
        {
          props: {
            config: {
              [componentOptions.name as any]: localConfigProps,
              ...globalConfigProps,
            },
          },
        },
        [createElement(componentOptions, { props: componentProps })],
      )
    },
  }

  const wrapper = mount(wrapperComponentOptions)
  const component = wrapper.vm.$children[0].$children[0]

  Object.keys(localConfigProps).forEach((prop) => {
    if ((component as any)[`c_${prop}`] !== localConfigProps[prop]) {
      throw new Error(
        `Prop ${prop} doesn't appear to take value from config.`,
      )
    }
  })
}
