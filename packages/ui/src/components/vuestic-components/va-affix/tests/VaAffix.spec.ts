import { mount } from '@vue/test-utils'

import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
import VaAffix from '../VaAffix.vue'

describe('VaAffix', () => {
  let logError: any
  beforeEach(() => {
    // TODO:
    // disable the Vue prop types checking in the test
    // to get rid of the error:
    // type check failed for prop "target". Expected , Window, got Window`

    // just ignore `console.error` yet
    // eslint-disable-next-line no-console
    logError = console.error
    // eslint-disable-next-line no-console
    console.error = () => undefined
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error = logError
  })

  it('should render without an error', () => {
    const wrapper = mount(VaAffix)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should throw if prop tag does not exist in the context', () => {
    const props = {
      tag: 'a',
    }
    expect(() => testIsContextableComponent(VaAffix, props)).toThrow()
  })
  it('is contextable', () => {
    const props = {
      offsetTop: undefined,
      offsetBottom: undefined,
      target: window,
    }
    expect(() => testIsContextableComponent(VaAffix, props)).not.toThrow()
  })
})
