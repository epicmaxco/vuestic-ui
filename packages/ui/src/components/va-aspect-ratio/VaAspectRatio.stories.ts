import { VaAspectRatio } from './'

export default {
  title: 'VaAspectRatio',
  component: VaAspectRatio,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAspectRatio },
  template: `
    <va-aspect-ratio
      class="w-48 border-dashed border-2"
      :ratio="1/1"
    >
      Content
    </va-aspect-ratio>
  `,
})

export const Ratio = () => ({
  components: { VaAspectRatio },
  template: `
    [1/1]
    <va-aspect-ratio
      class="w-48 border-dashed border-2"
      :ratio="1/1"
    >
      Content
    </va-aspect-ratio>
    [16/9]
    <va-aspect-ratio
      class="w-48 border-dashed border-2"
      :ratio="16/9"
    >
      Content
    </va-aspect-ratio>
  `,
})

export const contentHeightAndWidth = () => ({
  components: { VaAspectRatio },
  template: `
    [200/200]
    <va-aspect-ratio
      class="w-48 border-dashed border-2"
      content-width="200"
      content-height="200"
    >
      Content
    </va-aspect-ratio>
    [1280/720]
    <va-aspect-ratio
      class="w-48 border-dashed border-2"
      content-width="1280"
      content-height="720"
    >
      Content
    </va-aspect-ratio>
  `,
})

export const maxWidth = () => ({
  components: { VaAspectRatio },
  template: `
    <va-aspect-ratio
      class="border-dashed border-2"
      style="width: 500px"
      :max-width="200"
      :ratio="16/9"
    >
      Max width 200px
    </va-aspect-ratio>
  `,
})
