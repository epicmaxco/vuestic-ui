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
    &nbsp;
    <VaButton round icon="warning"/>
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
export const IconOnly = () => ({
  components: { VaButton },
  template: `
    <VaButton iconRight="va-warning"/>
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
    <div style="display: flex">
      <VaButton size="small">
        Button
      </VaButton>
      <VaButton size="small" icon="va-warning"/>
      <VaButton size="small" icon="va-warning" iconRight="va-warning">
        Button
      </VaButton>
    </div>
    [medium]
    <div style="display: flex">
      <VaButton size="medium">
        Button
      </VaButton>
      <VaButton size="medium" icon="va-warning"/>
      <VaButton size="medium" icon="va-warning" iconRight="va-warning">
        Button
      </VaButton>
    </div>
    [large]
    <div style="display: flex">
      <VaButton size="large">
        Button
      </VaButton>
      <VaButton size="large" icon="va-warning"/>
      <VaButton size="large" icon="va-warning" iconRight="va-warning">
        Button
      </VaButton>
    </div>
  `,
})

export const MultilineText = () => ({
  components: { VaButton },
  template: `
    [default]
    <VaButton style="width: 150px;">
      Default Button with long text
    </VaButton>
    [small]
    <VaButton size="small" style="width: 150px;">
      Small Button with long text
    </VaButton>
    [medium]
    <VaButton size="medium" style="width: 150px;">
      Medium Button with long text
    </VaButton>
    [large]
    <VaButton size="large" style="width: 150px;">
      Large Button with long text
    </VaButton>
  `,
})

export const Preset = () => ({
  components: { VaButton },
  template: `
    [default]
    <VaButton preset="default">
      Button
    </VaButton>
    [primary]
    <VaButton preset="primary">
      Button
    </VaButton>
    [secondary]
    <VaButton preset="secondary">
      Button
    </VaButton>
    [plain]
    <VaButton preset="plain">
      Button
    </VaButton>
    [plainOpacity]
    <VaButton preset="plainOpacity">
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

export const SizesConfig = () => ({
  components: { VaButton },
  data: () => ({
    sizesConfig: { defaultSize: 24, sizes: { small: 16, medium: 24, large: 32 } },
  }),
  template: `
    [default: 24px]
    <VaButton
      :sizesConfig="sizesConfig"
    >
      Button
    </VaButton>
    [small: 16px]
    <VaButton
      :sizesConfig="sizesConfig"
      size="small"
    >
      Button
    </VaButton>
    [medium: 24px]
    <VaButton
      :sizesConfig="sizesConfig"
      size="medium"
    >
      Button
    </VaButton>
    [large: 32px]
    <VaButton
      :sizesConfig="sizesConfig"
      size="large"
    >
      Button
    </VaButton>
  `,
})

export const FontSizesConfig = () => ({
  components: { VaButton },
  data: () => ({
    fontSizeConfig: { defaultSize: 0.75, sizes: { small: 0.5, medium: 0.75, large: 1 } },
  }),
  template: `
    [default: 0.75rem]
    <VaButton
      :fontSizesConfig="fontSizeConfig"
    >
      Button
    </VaButton>
    [small: 0.5rem]
    <VaButton
      :fontSizesConfig="fontSizeConfig"
      size="small"
    >
      Button
    </VaButton>
    [medium: 0.75rem]
    <VaButton
      :fontSizesConfig="fontSizeConfig"
      size="medium"
    >
      Button
    </VaButton>
    [large: 1rem]
    <VaButton
      :fontSizesConfig="fontSizeConfig"
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
    <p>[Clicked: <span data-testid="clicked">{{ clicked }}</span>]</p>
  `,
})

ClickEvent.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const clickState = canvas.getByTestId('clicked')

  await step('True on click', async () => {
    const button = document.querySelector('[type="button"]') as HTMLElement

    await userEvent.click(button)
    expect(clickState.innerText).toEqual('true')
  })
}

export const FocusAndBlurMethods = () => ({
  components: { VaButton },
  template: `
    <VaButton ref="button">
      Main Button 
    </VaButton>
    <VaButton @click="$refs.button.focus()">
      Focus Button
    </VaButton>
    <VaButton @click="$refs.button.blur()">
      Blur Button
    </VaButton>
  `,
})

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
