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
    <VaAvatar>
      A
    </VaAvatar>
  `,
})

export const Color = () => ({
  components: { VaAvatar },
  template: `
    [warning]
    <VaAvatar color="warning">
      A
    </VaAvatar>
  `,
})

export const TextColor = () => ({
  components: { VaAvatar },
  template: `
    [warning]
    <VaAvatar textColor="warning">
      A
    </VaAvatar>
  `,
})

export const Icon = () => ({
  components: { VaAvatar },
  template: `
    [va-warning]
    <VaAvatar icon="va-warning"/>
  `,
})

export const Size = () => ({
  components: { VaAvatar },
  template: `
    [smal]
    <VaAvatar size="small">
      A
    </VaAvatar>
    [medium]
    <VaAvatar size="medium">
      A
    </VaAvatar>
    [large]
    <VaAvatar size="large">
      A
    </VaAvatar>
  `,
})

export const SizesConfig = () => ({
  components: { VaAvatar },
  template: `
    [small: 16px]
    <VaAvatar :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }" size="small">
      A
    </VaAvatar>
    [medium: 24px]
    <VaAvatar :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }" size="medium">
      A
    </VaAvatar>
    [large: 32px]
    <VaAvatar :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }" size="large">
      A
    </VaAvatar>
  `,
})

export const FontSize = () => ({
  components: { VaAvatar },
  template: `
    [0.75rem]
    <VaAvatar fontSize="0.75rem">
      A
    </VaAvatar>
  `,
})

export const Src = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar 
      src="https://randomuser.me/api/portraits/women/5.jpg" 
      alt="image"
    >
  `,
})

export const Square = () => ({
  components: { VaAvatar },
  template: `
    <VaAvatar square>
      A
    </VaAvatar>
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
  template: '<VaAvatar src="https://not-exist" fallbackText="Fallback"/>',
})

export const FallbackRender = () => ({
  components: { VaAvatar },
  methods: {
    FallbackRender: () => h('b', {
      style: {
        color: 'black',
      },
    }, 'Text'),
  },
  template: '<VaAvatar src="https://not-exist" :fallbackRender="FallbackRender"/>',
})
