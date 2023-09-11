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
      :style="{ width: '200px', border: '1px solid black' }"
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
      :style="{ width: '200px', border: '1px solid black' }"
      :ratio="1/1"
    >
      Content
    </va-aspect-ratio>
    [16/9]
    <va-aspect-ratio 
      :style="{ width: '200px', border: '1px solid black' }"
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
      :style="{ width: '200px', border: '1px solid black' }"
      :content-width="200"
      :content-height="200"
    >
      Content
    </va-aspect-ratio>
    [1280/720]
    <va-aspect-ratio 
      :style="{ width: '200px', border: '1px solid black' }"
      :content-width="1280"
      :content-height="720"
    >
      Content
    </va-aspect-ratio>
  `,
})

export const maxWidth = () => ({
  components: { VaAspectRatio },
  template: `
    [200]
    <va-aspect-ratio 
      :style="{ width: '500px', border: '1px solid black' }"
      :max-width="200"
      :ratio="16/9"
    >
      Content
    </va-aspect-ratio>
    [500]
    <va-aspect-ratio 
      :style="{ width: '500px', border: '1px solid black' }"
      :max-width="500"
      :ratio="16/9"
    >
      Content
    </va-aspect-ratio>
  `,
})
