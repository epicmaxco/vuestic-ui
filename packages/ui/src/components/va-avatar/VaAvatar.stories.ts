import { VaAvatar } from './'
import { h } from 'vue'
import { StoryFn } from '@storybook/vue3'

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

const sizesConfig = { small: { variables: { size: '16px' } }, medium: { variables: { size: '24px' } }, large: { variables: { size: '32px' } } }

export const SizesConfig: StoryFn<typeof VaAvatar> = (args) => ({
  components: { VaAvatar },
  setup () {
    return { args }
  },
  template: `
    [small: 16px]
    <VaAvatar
      v-bind="args"
      size="small"
    >
      Text
    </VaAvatar>
    [medium: 24px]
    <VaAvatar
      v-bind="args"
      size="medium"
    >
      Text
    </VaAvatar>
    [large: 32px]
    <VaAvatar
      v-bind="args"
      size="large"
    >
      Text
    </VaAvatar>
  `,
})
SizesConfig.args = {
  sizesConfig,
}

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
