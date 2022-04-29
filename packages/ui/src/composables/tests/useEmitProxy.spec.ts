import { useEmitProxy } from '../useEmitProxy'
import { mount } from '@vue/test-utils'

const TestComponent = {
  template: '<p></p>',
}

describe('useEmitProxy', () => {
  it(
    'should create emits list & listeners functions',
    () => {
      const events = ['change', 'keyup']
      const expected = {
        createEmits: ['change', 'keyup'],
        createListeners: { onChange: expect.any(Function), onKeyup: expect.any(Function) },
        createVOnListeners: { change: expect.any(Function), keyup: expect.any(Function) },
      }

      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()
      const emit = wrapper.vm.$emit

      const { createListeners, createVOnListeners, createEmits } = useEmitProxy(events)

      const result = { createListeners: createListeners(emit), createVOnListeners: createVOnListeners(emit), createEmits: createEmits() }

      expect(result).toMatchObject(expected)

      for (const eventItem of events) {
        const vOnListeners = result.createVOnListeners[eventItem]()
        expect(events).toEqual(expect.arrayContaining(vOnListeners))
      }

      expect(Object.keys(wrapper.emitted())).toEqual(expect.arrayContaining(events))
    },
  )
})
