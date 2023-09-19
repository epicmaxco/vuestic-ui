import { VaButton } from './'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'VaButton',
  component: VaButton,
  tags: ['autodocs'],
}

export const Default = () => ({
  components: { VaButton },
  template: `
    <VaButton>
      Button
    </VaButton>
  `,
})

export const Color = () => ({
  components: { VaButton },
  template: `
    <VaButton color="warning">
      Button
    </VaButton>
  `,
})

export const Gradient = () => ({
  components: { VaButton },
  template: `
    <VaButton gradient>
      Button
    </VaButton>
  `,
})

export const BackgroundOpacity = () => ({
  components: { VaButton },
  template: `
    <VaButton :backgroundOpacity="0.25">
      Button
    </VaButton>
  `,
})

export const TextColor = () => ({
  components: { VaButton },
  template: `
    <VaButton textColor="warning">
      Button
    </VaButton>
  `,
})

export const TextOpacity = () => ({
  components: { VaButton },
  template: `
    <VaButton :textOpacity="0.75">
      Button
    </VaButton>
  `,
})

export const BorderColor = () => ({
  components: { VaButton },
  template: `
    <VaButton borderColor="warning">
      Button
    </VaButton>
  `,
})

export const Disabled = () => ({
  components: { VaButton },
  template: `
    <VaButton disabled>
      Button
    </VaButton>
  `,
})

export const Plain = () => ({
  components: { VaButton },
  template: `
    <VaButton plain>
      Button
    </VaButton>
  `,
})

export const Round = () => ({
  components: { VaButton },
  template: `
    <VaButton round>
      Button
    </VaButton>
  `,
})

export const Block = () => ({
  components: { VaButton },
  template: `
    <VaButton block>
      Button
    </VaButton>
  `,
})

export const Icon = () => ({
  components: { VaButton },
  template: `
    <VaButton icon="va-warning">
      Button
    </VaButton>
  `,
})

export const IconRight = () => ({
  components: { VaButton },
  template: `
    <VaButton iconRight="va-warning">
      Button
    </VaButton>
  `,
})

export const IconColor = () => ({
  components: { VaButton },
  template: `
    <VaButton 
      icon="va-warning" 
      iconColor="warning"
    >
      Button
    </VaButton>
  `,
})

export const Loading = () => ({
  components: { VaButton },
  template: `
    <VaButton loading>
      Button
    </VaButton>
  `,
})

export const Size = () => ({
  components: { VaButton },
  template: `
    [small]
    <VaButton size="small">
      Button
    </VaButton>
    [medium]
    <VaButton size="medium">
      Button
    </VaButton>
    [large]
    <VaButton size="large">
      Button
    </VaButton>
  `,
})

export const HoverBehavior = () => ({
  components: { VaButton },
  template: `
    [mask]
    <VaButton hoverBehavior="mask">
      Button
    </VaButton>
    [opacity]
    <VaButton hoverBehavior="opacity">
      Button
    </VaButton>
  `,
})

export const HoverMaskColor = () => ({
  components: { VaButton },
  template: `
    <VaButton hoverMaskColor="danger">
      Button
    </VaButton>
  `,
})

export const HoverOpacity = () => ({
  components: { VaButton },
  template: `
    <VaButton 
      hoverBehavior="opacity"
      :hoverOpacity="0"
    >
      Button
    </VaButton>
  `,
})

export const PressedBehavior = () => ({
  components: { VaButton },
  template: `
    [mask]
    <VaButton pressedBehavior="mask">
      Button
    </VaButton>
    [opacity]
    <VaButton pressedBehavior="opacity">
      Button
    </VaButton>
  `,
})

export const PressedMaskColor = () => ({
  components: { VaButton },
  template: `
    <VaButton pressedMaskColor="danger">
      Button
    </VaButton>
  `,
})

export const PressedOpacity = () => ({
  components: { VaButton },
  template: `
    <VaButton 
      pressedBehavior="opacity"
      :pressedOpacity="0"
    >
      Button
    </VaButton>
  `,
})

export const Href = () => ({
  components: { VaButton },
  template: `
    <VaButton href="https://ui.vuestic.dev/">
      Button
    </VaButton>
  `,
})

export const To = () => ({
  components: { VaButton },
  template: `
    <VaButton href="/?path=/docs/vabutton--docs">
      Button
    </VaButton>
  `,
})

export const SizesConfig = () => ({
  components: { VaButton },
  template: `
    [small: 16px]
    <VaButton 
      :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }"
      size="small"
    >
      Button
    </VaButton>
    [medium: 24px]
    <VaButton 
      :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }"
      size="medium"
    >
      Button
    </VaButton>
    [large: 32px]
    <VaButton 
      :sizesConfig="{ 'defaultSize': 24, 'sizes': { 'small': 16, 'medium': 24, 'large': 32 } }"
      size="large"
    >
      Button
    </VaButton>
  `,
})

export const FontSizesConfig = () => ({
  components: { VaButton },
  template: `
    [small: 0.5rem]
    <VaButton 
      :fontSizesConfig="{ 'defaultSize': 0.75, 'sizes': { 'small': 0.5, 'medium': 0.75, 'large': 1 } }"
      size="small"
    >
      Button
    </VaButton>
    [medium: 0.75rem]
    <VaButton 
      :fontSizesConfig="{ 'defaultSize': 0.75, 'sizes': { 'small': 0.5, 'medium': 0.75, 'large': 1 } }"
      size="medium"
    >
      Button
    </VaButton>
    [large: 1rem]
    <VaButton 
      :fontSizesConfig="{ 'defaultSize': 0.75, 'sizes': { 'small': 0.5, 'medium': 0.75, 'large': 1 } }"
      size="large"
    >
      Button
    </VaButton>
  `,
})

export const ClickEvent = () => ({
  components: { VaButton },
  data: () => ({ clicked: false }),
  template: `
    <VaButton @click="clicked = true">
      Button
    </VaButton>
    <span data-testid="click-event">[Clicked: {{ clicked }}]</span>
  `,
})

ClickEvent.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const clickState = canvas.getByTestId("click-event")

  await step( 'True on click', async () => {
    const button = document.querySelector('[type="button"]') as HTMLElement
    
    await userEvent.click(button)
    expect(clickState.innerText).toEqual('[Clicked: true]')
  })
}

export const AppendSlot = () => ({
  components: { VaButton },
  template: `
    <VaButton>
      <template #append>
        [append]
      </template>
      Button
    </VaButton>
  `,
})

export const PrependSlot = () => ({
  components: { VaButton },
  template: `
    <VaButton>
      <template #prepend>
        [prepend]
      </template>
      Button
    </VaButton>
  `,
})

export const LoadingSlot = () => ({
  components: { VaButton },
  template: `
    <VaButton loading>
      <template #loading>
        [loading]
      </template>
      button
    </VaButton>
  `,
})