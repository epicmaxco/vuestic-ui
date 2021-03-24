import Vue from 'vue'
import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import VaButton from '../VaButton.vue'

import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemePlugin, ColorMixin } from '../../../../services/color-config/ColorMixin'
import { ContextPlugin } from '../../../context-test/context-provide/ContextPlugin'
import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'

// @ts-ignore
Vue.use(ColorThemePlugin)
// @ts-ignore
Vue.use(ContextPlugin, {})

describe('VaButton', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaButton)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  /* 1. Default button */

  it('button without defined props', () => {
    const wrapper = shallowMount(VaButton)

    expect(wrapper.find(VaButton).classes()).toContain('va-button--default')
  })

  /* 2. Button sizes */

  it('normal button', () => {
    const wrapper = shallowMount(VaButton)

    expect(wrapper.find(VaButton).classes()).toContain('va-button--normal')
  })

  it('large button', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: { size: 'large' },
    })
    expect(wrapper.find(VaButton).classes()).toContain('va-button--large')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('small button', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: { size: 'small' },
    })
    expect(wrapper.find(VaButton).classes()).toContain('va-button--small')
    expect(wrapper.html()).toMatchSnapshot()
  })

  /* 3. Button types */

  it('default button', () => {
    const wrapper = shallowMount(VaButton)

    expect(wrapper.is('button')).toBe(true)
  })

  it('a button with defined href', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        href: 'http://epic-spinners.epicmax.co/',
      },
    })
    expect(wrapper.is('a')).toBe(true)
  })

  it('a button with defined target', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        target: '_blank',
      },
    })
    expect(wrapper.is('a')).toBe(true)
  })

  it('a button with defined href and target', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        href: 'http://epic-spinners.epicmax.co/',
        target: '_blank',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('router-link button with defined to property', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        to: '/demo',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('router-link button with defined to and active class properties', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        to: '/demo',
        activeClass: 'va-button--active',
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  /* 4. Disabled buttons */

  it('disabled button', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: { disabled: true },
    })

    expect(wrapper.find(VaButton).classes()).toContain('va-button--disabled')
    expect(wrapper.html()).toMatchSnapshot()
  })

  /* 5. Buttons with icons */

  it('button with left icon', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        icon: 'clear',
      },
    })
    expect(wrapper.find(VaButton).classes())
      .toContain('va-button--with-left-icon')
  })

  it('button with right icon', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        iconRight: 'create',
      },
    })
    expect(wrapper.find(VaButton).classes())
      .toContain('va-button--with-right-icon')
  })

  it('button with both icons', () => {
    const wrapper = shallowMount(VaButton, {
      propsData: {
        icon: 'clear',
        iconRight: 'create',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaButton)).not.toThrow()
  })

  it('button public methods focus and blur should works', () => {
    const wrapper = shallowMount(VaButton, {
      attachToDocument: true,
    }) as any
    const spaceRemover = (value: string) => {
      return value.replace(/\s+|\n|\r/g, '')
    }
    wrapper.vm.focus()
    const focusedButtonString = spaceRemover(wrapper.find('button').html())
    // @ts-ignore
    const activeElementString: string = spaceRemover(document.activeElement.outerHTML)
    expect(focusedButtonString === activeElementString).toEqual(true)

    wrapper.vm.blur()
    expect(document.hasFocus()).toEqual(false)
  })

  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaButton as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
