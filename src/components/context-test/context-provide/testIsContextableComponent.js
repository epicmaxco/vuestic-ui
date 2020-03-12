import { mount } from '@vue/test-utils'
import VaContext from './VaContext'

// Check passed props are contextable.
// componentProps is used to pass down required values.
export function testIsContextableComponent (componentOptions, contextProps, componentProps) {
  const wrapperComponentOptions = {
    render (createElement) {
      return createElement(
        VaContext,
        { props: { config: { [componentOptions.name]: contextProps } } },
        [
          createElement(componentOptions, { props: componentProps }),
        ],
      )
    },
  }

  const wrapper = mount(wrapperComponentOptions)
  const component = wrapper.vm.$children[0].$children[0]

  Object.keys(contextProps).forEach(prop => {
    if (component[`c_${prop}`] !== contextProps[prop]) {
      throw new Error(`Prop ${prop} doesn't appear to take value from context.`)
    }
  })
}
