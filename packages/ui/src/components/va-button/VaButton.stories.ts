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
      </VaButton>&nbsp;
      <VaButton size="small" icon="va-warning"/>&nbsp;
      <VaButton size="small" icon="va-warning" iconRight="va-warning">
        Button
      </VaButton>
    </div>
    [medium]
    <div style="display: flex">
      <VaButton size="medium">
        Button
      </VaButton>&nbsp;
      <VaButton size="medium" icon="va-warning"/>&nbsp;
      <VaButton size="medium" icon="va-warning" iconRight="va-warning">
        Button
      </VaButton>
    </div>
    [large]
    <div style="display: flex">
      <VaButton size="large">
        Button
      </VaButton>&nbsp;
      <VaButton size="large" icon="va-warning"/>&nbsp;
      <VaButton size="large" icon="va-warning" iconRight="va-warning">
        Button
      </VaButton>
    </div>
  `,
})

export const MultilineText = () => ({
  components: { VaButton },
  template: `
    <p>[default]</p>
    <VaButton style="width: 150px;">
      Default Button with long text
    </VaButton>
    <p>[small]</p>
    <VaButton size="small" style="width: 150px;">
      Small Button with long text
    </VaButton>
    <p>[medium]</p>
    <VaButton size="medium" style="width: 150px;">
      Medium Button with long text
    </VaButton>
    <p>[large]</p>
    <VaButton size="large" style="width: 150px;">
      Large Button with long text
    </VaButton>
  `,
})

export const Preset = () => ({
  components: { VaButton },
  template: `
    <p>[default]</p>
    <VaButton preset="default">
      Button
    </VaButton>
    <p>[primary]</p>
    <VaButton preset="primary">
      Button
    </VaButton>
    <p>[secondary]</p>
    <VaButton preset="secondary">
      Button
    </VaButton>
    <p>[plain]</p>
    <VaButton preset="plain">
      Button
    </VaButton>
    <p>[plainOpacity]</p>
    <VaButton preset="plainOpacity">
      Button
    </VaButton>
  `,
})

export const HoverBehavior = () => ({
  components: { VaButton },
  template: `
    <p>[mask]</p>
    <VaButton hoverBehavior="mask">
      Button
    </VaButton>

    <p>[opacity]</p>
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
    <p>[mask]</p>
    <VaButton pressedBehavior="mask">
      Button
    </VaButton>
    <p>[opacity]</p>
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
    <p>[default: 24px]</p>
    <VaButton
      :sizesConfig="sizesConfig"
    >
      Button
    </VaButton>
    <p>[small: 16px]</p>
    <VaButton
      :sizesConfig="sizesConfig"
      size="small"
    >
      Button
    </VaButton>
    <p>[medium: 24px]</p>
    <VaButton
      :sizesConfig="sizesConfig"
      size="medium"
    >
      Button
    </VaButton>
    <p>[large: 32px]</p>
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
    <p>[default: 0.75rem]</p>
    <VaButton
      :fontSizesConfig="fontSizeConfig"
    >
      Button
    </VaButton>
    <p>[small: 0.5rem]</p>
    <VaButton
      :fontSizesConfig="fontSizeConfig"
      size="small"
    >
      Button
    </VaButton>
    <p>[medium: 0.75rem]</p>
    <VaButton
      :fontSizesConfig="fontSizeConfig"
      size="medium"
    >
      Button
    </VaButton>
    <p>[large: 1rem]</p>
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
    <p>Clicked: <span data-testid="clicked">{{ clicked }}</span></p>
  `,
})

ClickEvent.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)
  const clickState = canvas.getByTestId('clicked')

  await step('True on click', async () => {
    const button = document.querySelector('[type="button"]') as HTMLElement

    expect(clickState.innerText).toEqual('false')
    await userEvent.click(button)
    expect(clickState.innerText).toEqual('true')
  })
}

export const FocusAndBlurMethods = () => ({
  components: { VaButton },
  template: `
    <VaButton ref="button">
      Main Button
    </VaButton>&nbsp;
    <VaButton @click="$refs.button.focus()">
      Focus Button
    </VaButton>&nbsp;
    <VaButton @click="$refs.button.blur()">
      Blur Button
    </VaButton>
  `,
})

export const AppendSlot = () => ({
  components: { VaButton },
  template: `
    <VaButton>
      Button
      <template #append>
        [append]
      </template>
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

// See: https://github.com/epicmaxco/vuestic-ui/issues/2704
export const RightShift = () => ({
  components: { VaButton },
  template: `
    <div>
      <VaButton>Text</VaButton>&nbsp;
      <VaButton icon="phone">Text2</VaButton>
    </div>
  `,
})
