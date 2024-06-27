import { StoryFn } from '@storybook/vue3'
import { VaButtonGroup } from './'
import { VaButton } from '../va-button'

export default {
  title: 'VaButtonGroup',
  component: VaButtonGroup,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup>
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const Color: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup color="success">
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const TextColor: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup textColor="warning">
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const Gradient: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup gradient color="success">
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const Disabled: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup disabled>
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const Icon: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup icon="close">
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const IconColor: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup icon="close" iconColor="warning">
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const IconRight: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup iconRight="close">
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const Loading: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup loading>
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const Size: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <div style="display: flex; align-items: center; gap: 4px;">
      [small]
      <VaButtonGroup size="small">
        <VaButton>
          One
        </VaButton>
        <VaButton>
          Two
        </VaButton>
        <VaButton>
          Three
        </VaButton>
      </VaButtonGroup>
      [medium]
      <VaButtonGroup size="medium">
        <VaButton>
          One
        </VaButton>
        <VaButton>
          Two
        </VaButton>
        <VaButton>
          Three
        </VaButton>
      </VaButtonGroup>
      [large]
      <VaButtonGroup size="large">
        <VaButton>
          One
        </VaButton>
        <VaButton>
          Two
        </VaButton>
        <VaButton>
          Three
        </VaButton>
      </VaButtonGroup>
    </div>
  `,
})

export const Round: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <VaButtonGroup round>
      <VaButton>
        One
      </VaButton>
      <VaButton>
        Two
      </VaButton>
      <VaButton>
        Three
      </VaButton>
    </VaButtonGroup>
  `,
})

export const Preset: StoryFn = () => ({
  components: { VaButtonGroup, VaButton },
  template: `
    <div style="display: flex; align-items: center; gap: 4px;">
      [primary]
      <VaButtonGroup preset="primary">
        <VaButton>
          One
        </VaButton>
        <VaButton>
          Two
        </VaButton>
        <VaButton>
          Three
        </VaButton>
      </VaButtonGroup>
      [secondary]
      <VaButtonGroup preset="secondary">
        <VaButton>
          One
        </VaButton>
        <VaButton>
          Two
        </VaButton>
        <VaButton>
          Three
        </VaButton>
      </VaButtonGroup>
      [plain]
      <VaButtonGroup preset="plain">
        <VaButton>
          One
        </VaButton>
        <VaButton>
          Two
        </VaButton>
        <VaButton>
          Three
        </VaButton>
      </VaButtonGroup>
      [plainOpacity]
      <VaButtonGroup preset="plainOpacity">
        <VaButton>
          One
        </VaButton>
        <VaButton>
          Two
        </VaButton>
        <VaButton>
          Three
        </VaButton>
      </VaButtonGroup>
    </div>
  `,
})
