import { describe, it, expect } from 'vitest'
import { RouterLinkStub } from '@vue/test-utils'
import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaButton from '../VaButton.vue'

describe('VaButton', () => {
  it.skip('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaButton)
    expect(wrapper.exists()).toBeTruthy()
  })
  /* 1. Default button */

  // it('button without defined props', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton)

  //   expect(wrapper.find(VaButton).classes()).toContain('va-button--default')
  // })

  // /* 2. Button sizes */

  // it('normal button', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton)

  //   expect(wrapper.find(VaButton).classes()).toContain('va-button--normal')
  // })

  // it('large button', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: { size: 'large' },
  //   })
  //   expect(wrapper.find(VaButton).classes()).toContain('va-button--large')
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // it('small button', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: { size: 'small' },
  //   })
  //   expect(wrapper.find(VaButton).classes()).toContain('va-button--small')
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // /* 3. Button types */

  // it('default button', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton)

  //   expect(wrapper.find('button')).toBe(true)
  // })

  // it('a button with defined href', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       href: 'http://epic-spinners.epicmax.co/',
  //     },
  //   })
  //   expect(wrapper.find('a')).toBe(true)
  // })

  // it('a button with defined target', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       target: '_blank',
  //     },
  //   })
  //   expect(wrapper.find('a')).toBe(true)
  // })

  // it('a button with defined href and target', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       href: 'http://epic-spinners.epicmax.co/',
  //       target: '_blank',
  //     },
  //   })
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // it('router-link button with defined to property', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       to: '/demo',
  //     },
  //     stubs: {
  //       RouterLink: RouterLinkStub,
  //     },
  //   })
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // it('router-link button with defined to and active class properties', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       to: '/demo',
  //       activeClass: 'va-button--active',
  //     },
  //     stubs: {
  //       RouterLink: RouterLinkStub,
  //     },
  //   })
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // /* 4. Disabled buttons */

  // it('disabled button', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: { disabled: true },
  //   })

  //   expect(wrapper.find(VaButton).classes()).toContain('va-button--disabled')
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // /* 5. Buttons with icons */

  // it('button with left icon', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       icon: 'clear',
  //     },
  //   })
  //   expect(wrapper.find(VaButton).classes())
  //     .toContain('va-button--with-left-icon')
  // })

  // it('button with right icon', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       iconRight: 'create',
  //     },
  //   })
  //   expect(wrapper.find(VaButton).classes())
  //     .toContain('va-button--with-right-icon')
  // })

  // it('button with both icons', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     props: {
  //       icon: 'clear',
  //       iconRight: 'create',
  //     },
  //   })
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // it('button public methods focus and blur should works', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaButton, {
  //     attachTo: document.body,
  //   })
  //   const spaceRemover = (value: string) => {
  //     return value.replace(/\s+|\n|\r/g, '')
  //   }
  //   wrapper.vm.focus()
  //   const focusedButtonString = spaceRemover(wrapper.find('button').html())
  //   // @ts-ignore
  //   const activeElementString: string = spaceRemover(document.activeElement.outerHTML)
  //   expect(focusedButtonString === activeElementString).toEqual(true)

  //   wrapper.vm.blur()
  //   expect(document.hasFocus()).toEqual(false)
  // })
})
