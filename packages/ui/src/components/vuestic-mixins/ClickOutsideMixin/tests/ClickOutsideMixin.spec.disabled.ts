import { shallowMount } from '@vue/test-utils'
import ClickOutsideMixin, { ClickOutsideOptions } from '../ClickOutsideMixin'
import { mixins } from 'vue-class-component'
import { h } from 'vue'

export default class ExampleComponent extends mixins() {
  render () {
    return h('', {
      ref: 'clickOutsideRef',
    })
  }
}

describe('ClickOutsideMixin', () => {
  const onClickOutside = jest.fn()

  const options: ClickOutsideOptions = {
    onClickOutside,
    disabled: false,
    trigger: 'click',
  }

  const baseComponentOptions: any = {
    render: ExampleComponent,
    mixins: [ClickOutsideMixin],
    mounted () {
      const ref = this.$refs.clickOutsideRef

      this.registerClickOutsideEvents(ref, this.$attrs)
    },
  }

  const mountComponentWithOptions = (data: any) => {
    return shallowMount(baseComponentOptions, { propsData: data })
  }

  it('should be called when clicking away', async () => {
    mountComponentWithOptions(options)

    const clickEvent = new MouseEvent('click', { button: 0, bubbles: true })
    document.body.dispatchEvent(clickEvent)

    expect(onClickOutside).toHaveBeenCalled()

    onClickOutside.mockClear()
  })

  it('should not be called when clicking inside', () => {
    const wrapper = mountComponentWithOptions(options)

    wrapper.find('div').trigger('click', { button: 0 })

    expect(onClickOutside).not.toHaveBeenCalled()

    onClickOutside.mockClear()
  })

  it('should call `onClickOutside` when the appropriate mouse event is triggered', () => {
    const options: ClickOutsideOptions = {
      onClickOutside,
      disabled: false,
      trigger: 'mousedown',
    }

    mountComponentWithOptions(options)

    const mouseDownEvent = new MouseEvent('mousedown', {
      button: 0,
      bubbles: true,
    })
    const mouseUpEvent = new MouseEvent('mouseup', { button: 0, bubbles: true })

    document.body.dispatchEvent(mouseDownEvent)
    expect(onClickOutside).toHaveBeenCalled()

    document.body.dispatchEvent(mouseUpEvent)
    expect(onClickOutside).toHaveBeenCalledTimes(1)

    onClickOutside.mockClear()
  })
})
