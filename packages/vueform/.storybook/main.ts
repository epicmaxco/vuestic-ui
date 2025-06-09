import { type StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/**.stories.ts'],
  framework: '@storybook/vue3-vite',
}

export default config
