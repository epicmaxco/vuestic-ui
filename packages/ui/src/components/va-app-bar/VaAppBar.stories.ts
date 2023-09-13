import { VaAppBar } from './'

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
    {{ $vb.lorem(2000) }}
  `,
})

export const FixedBottom = () => ({
  components: { VaAppBar },
  template: `
    <va-app-bar fixed bottom>
      App Bar
    </va-app-bar>
    {{ $vb.lorem(2000) }}
  `,
})

export const HideOnScroll = () => ({
  components: { VaAppBar },
  template: `
    <div class="flex flex-col relative max-h-32 overflow-hidden">
      <va-app-bar
        hide-on-scroll
        target="#target"
      >
        App Bar
      </va-app-bar>
      <div
        id="target"
        class="pb-[500px] overflow-auto"
      >
        {{ $vb.lorem(2500) }}
      </div>
    </div>
  `,
})

HideOnScroll.play = async ({ canvasElement, step }) => {
  const target = canvasElement.querySelector('#target') as HTMLElement
  target.scrollTo({ top: target.clientHeight })
}

export const ShadowOnScroll = () => ({
  components: { VaAppBar },
  template: `
    <div class="flex flex-col relative max-h-32 overflow-hidden">
      <va-app-bar
        shadow-on-scroll
        target="#target"
      >
        App Bar
      </va-app-bar>
      <div
        id="target"
        class="pb-[500px] overflow-auto"
      >
        {{ $vb.lorem(2500) }}
      </div>
    </div>
  `,
})

ShadowOnScroll.play = async ({ canvasElement, step }) => {
  const target = canvasElement.querySelector('#target') as HTMLElement
  target.scrollTo({ top: target.clientHeight })
}

export const ShadowColor = () => ({
  components: { VaAppBar },
  template: `
    <div class="flex flex-col relative max-h-32 overflow-hidden">
      <va-app-bar
        shadow-on-scroll
        shadow-color="danger"
        target="#target"
      >
        App Bar
      </va-app-bar>
      <div
        id="target"
        class="pb-[500px] overflow-auto"
      >
        {{ $vb.lorem(2500) }}
      </div>
    </div>
  `,
})
ShadowColor.play = async ({ canvasElement, step }) => {
  const target = canvasElement.querySelector('#target') as HTMLElement
  target.scrollTo({ top: target.clientHeight })
}
