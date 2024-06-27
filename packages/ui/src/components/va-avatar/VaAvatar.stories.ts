import { VaAvatar } from './'
import { h } from 'vue'

export default {
  title: 'VaAvatar',
  component: VaAvatar,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar
      src="https://randomuser.me/api/portraits/women/5.jpg"
      alt="image"
    />
  `,
})

export const Color = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar color="warning">
      Text
    </VaAvatar>
  `,
})

export const TextColor = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar textColor="warning">
      Text
    </VaAvatar>
  `,
})

export const Icon = () => ({
  components: { VaAvatar },
  template: '<VaAvatar icon="va-warning"/>',
})

export const Size = () => ({
  components: { VaAvatar },
  template: `
    [small]
    <VaAvatar size="small">
      Text
    </VaAvatar>
    [medium]
    <VaAvatar size="medium">
      Text
    </VaAvatar>
    [large]
    <VaAvatar size="large">
      Text
    </VaAvatar>
  `,
})

export const SizesConfig = () => ({
  components: { VaAvatar },
  template: `
    [small: 16px]
    <VaAvatar
      :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }"
      size="small"
    >
      Text
    </VaAvatar>
    [medium: 24px]
    <VaAvatar
      :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }"
      size="medium"
    >
      Text
    </VaAvatar>
    [large: 32px]
    <VaAvatar
      :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }"
      size="large"
    >
      Text
    </VaAvatar>
  `,
})

export const FontSize = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar fontSize="0.75rem">
      Text
    </VaAvatar>
  `,
})

export const Square = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar square>
      Text
    </VaAvatar>
  `,
})

/** Must be centered image */
export const NonSquareAspectRation = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png" />
  `,
})

export const Loading = () => ({
  components: { VaAvatar },
  template: '<VaAvatar loading/>',
})

export const FallbackIcon = () => ({
  components: { VaAvatar },
  template: '<VaAvatar src="https://not-exist" fallbackIcon="va-warning"/>',
})

export const FallbackSrc = () => ({
  components: { VaAvatar },
  template: '<VaAvatar src="https://not-exist" fallbackSrc="https://randomuser.me/api/portraits/women/5.jpg"/>',
})

export const FallbackText = () => ({
  components: { VaAvatar },
  template: '<VaAvatar src="https://not-exist" fallbackText="Text"/>',
})

export const FallbackTextNoSrc = () => ({
  components: { VaAvatar },
  template: '<VaAvatar fallbackText="Text" />',
})

export const fallbackRender = () => ({
  components: { VaAvatar },
  methods: {
    fallbackRender: () => h('b', {
      style: {
        color: 'black',
      },
    }, 'Text'),
  },
  template: '<VaAvatar src="https://not-exist" :fallbackRender="fallbackRender"/>',
})
