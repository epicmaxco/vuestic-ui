import { VaAppBar } from './'
import { expect } from '@storybook/jest'
import { sleep } from '../../utils/sleep'

export default {
  title: 'VaAppBar',
  component: VaAppBar,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAppBar },
  template: `
    <va-app-bar>
      App Bar 
    </va-app-bar>
  `,
})

export const Gradient = () => ({
  components: { VaAppBar },
  template: `
    <va-app-bar gradient>
      App Bar 
    </va-app-bar>
  `,
})

export const Color = () => ({
  components: { VaAppBar },
  template: `
    [warning]
    <va-app-bar color="warning">
      App Bar 
    </va-app-bar>
  `,
})

export const Fixed = () => ({
  components: { VaAppBar },
  template: `
    <va-app-bar fixed>
      App Bar 
    </va-app-bar>
    {{ $vb.lorem(600) }}
  `,
})

export const Bottom = () => ({
  components: { VaAppBar },
  template: `
    <va-app-bar fixed bottom>
      App Bar 
    </va-app-bar>
    {{ $vb.lorem(600) }}
  `,
})

export const HideOnScroll = () => ({
  components: { VaAppBar },
  template: `
    <div class="flex flex-col relative max-h-32 overflow-hidden">
      <va-app-bar 
        hide-on-scroll 
        target="#target1"
      >
        App Bar 
      </va-app-bar>
      <div 
        id="target1" 
        class="pb-[500px] overflow-auto"
      >
        {{ $vb.lorem(2500) }}
      </div>
    </div>
  `,
})

HideOnScroll.play = async ({ step }) => {
  const target = document.querySelector('#target1') as HTMLElement
  target.scrollTo({ top: target.clientHeight })
  await sleep(500)
  const appbar = document.querySelector('[role="toolbar"]') as HTMLElement

  await step('Hidden on scroll', async () => {
    expect(appbar.style.cssText.includes('translateY')).toBeTruthy()
  })
}

export const ShadowOnScroll = () => ({
  components: { VaAppBar },
  template: `
    <div class="flex flex-col relative max-h-32 overflow-hidden">
      <va-app-bar 
        shadow-on-scroll 
        target="#target2"
      >
        App Bar 
      </va-app-bar>
      <div 
        id="target2" 
        class="pb-[500px] overflow-auto"
      >
        {{ $vb.lorem(2500) }}
      </div>
    </div>
  `,
})

ShadowOnScroll.play = async ({ step }) => {
  const target = document.querySelector('#target2') as HTMLElement
  target.scrollTo({ top: target.clientHeight })
  await sleep(500)
  const appbar = document.querySelector('[role="toolbar"]') as HTMLElement

  await step('Has shadow on scroll', async () => {
    expect(appbar.style.cssText.includes('box-shadow')).toBeTruthy()
  })
}

export const ShadowColor = () => ({
  components: { VaAppBar },
  template: `
    [warning]
    <div class="flex flex-col relative max-h-32 overflow-hidden">
      <va-app-bar 
        shadow-on-scroll 
        shadow-color="warning"
        target="#target3"
      >
        App Bar 
      </va-app-bar>
      <div 
        id="target3" 
        class="pb-[500px] overflow-auto"
      >
        {{ $vb.lorem(2500) }}
      </div>
    </div>
  `,
})
