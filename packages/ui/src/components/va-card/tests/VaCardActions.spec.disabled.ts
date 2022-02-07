import { shallowMount } from '@vue/test-utils'
import VaCardActions from '../VaCardActions.vue'

describe('VaCardActions', () => {
  let wrapper: any
  const DEFAULT_SLOT_CONTENT = 'Main content'

  const createComponent = (props = {}) => {
    wrapper = shallowMount(VaCardActions, {
      props: {
        ...props,
      },
      slots: {
        default: DEFAULT_SLOT_CONTENT,
      },
    })
  }

  afterEach(() => {
    wrapper.unmount()
    wrapper = null
  })

  it('sanity', () => {
    createComponent()

    expect(wrapper.exists()).toBe(true)
  })

  it('component has default slot', () => {
    createComponent()

    expect(wrapper.text()).toBe(DEFAULT_SLOT_CONTENT)
  })

  it('component has default props', () => {
    createComponent()

    expect(wrapper.props('align')).toBe('left')
    expect(wrapper.props('vertical')).toBe(false)
  })
})
