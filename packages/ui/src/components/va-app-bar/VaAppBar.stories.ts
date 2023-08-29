import { VaAppBar } from './'

export default {
  title: 'VaAppBar',
  component: VaAppBar,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    default: 'App Bar',
  },
}

export const Gradient = {
  args: {
    default: 'App Bar',
    gradient: true,
  },
}

export const Color = () => ({
  components: { VaAppBar },
  template: `
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

export const ShadowColor = () => ({
  components: { VaAppBar },
  template: `
    <div class="flex flex-col relative max-h-32 overflow-hidden">
      <va-app-bar
        shadow-on-scroll
        shadow-color="warning"
        target="#target3"
      >
        App Bar
      </va-app-bar>
      <div
        id="target4"
        class="pb-[500px] overflow-auto"
      >
        {{ $vb.lorem(2500) }}
      </div>
    </div>
  `,
})
