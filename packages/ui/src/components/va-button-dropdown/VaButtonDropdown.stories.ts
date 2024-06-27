import { getStorySelector, getStorySelectorAll } from '../../../.storybook/interaction-utils/storySelector'
import { userEvent } from '../../../.storybook/interaction-utils/userEvent'
import { StoryFn } from '@storybook/vue3'
import { expect } from '@storybook/jest'
import { VaButtonDropdown } from './'

function getButtonDropdown () {
  return {
    button: getStorySelector('.va-button'),
  }
}

function getButtonDropdownAll () {
  return {
    button: getStorySelectorAll('.va-button'),
  }
}

function getAnchor () {
  return {
    anchor: getStorySelector('#anchor_target'),
  }
}

function getContent () {
  return {
    content: getStorySelector('.va-dropdown__content'),
  }
}

export default {
  title: 'VaButtonDropdown',
  component: VaButtonDropdown,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown>
      [content]
    </VaButtonDropdown>
  `,
})

Default.play = async ({ step }) => {
  const { button } = getButtonDropdown()

  await step('Opens content menu by clicking on the button', async () => {
    await userEvent.click(button)

    const { content } = getContent()
    expect(content).not.toBeNull()
  })

  await step('Closes content menu by clicking anywhere', async () => {
    await userEvent.click(document.body)

    const { content } = getContent()
    expect(content).toBeNull()
  })
}

export const Label: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown label="Label">
      [content]
    </VaButtonDropdown>
  `,
})

export const ModelValue: StoryFn = () => ({
  components: { VaButtonDropdown },
  data: () => ({ value: false }),
  template: `
    <VaButtonDropdown v-model="value" label="Model Value">
      [content]
    </VaButtonDropdown>
  `,
})

ModelValue.play = async ({ step }) => {
  const { button } = getButtonDropdown()

  await step('Opens content menu by clicking on the button (modelValue)', async () => {
    await userEvent.click(button)

    const { content } = getContent()
    expect(content).not.toBeNull()
  })

  await step('Closes content menu by clicking anywhere (modelValue)', async () => {
    await userEvent.click(document.body)

    const { content } = getContent()
    expect(content).toBeNull()
  })
}

export const Cursor: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown cursor label="Cursor">
      [content]
    </VaButtonDropdown>
  `,
})

export const Color: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown color="success" label="Color">
      [content]
    </VaButtonDropdown>
  `,
})

export const Gradient: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown gradient color="success" label="Color">
      [content]
    </VaButtonDropdown>
  `,
})

export const TextColor: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown textColor="warning" label="Text Color">
      [content]
    </VaButtonDropdown>
  `,
})

export const Disabled: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown disabled label="Disabled">
      [content]
    </VaButtonDropdown>
  `,
})

Disabled.play = async ({ step }) => {
  const { button } = getButtonDropdown()

  await step('Must not open content menu by clicking on the button (readonly)', async () => {
    await userEvent.click(button, { skipPointerEventsCheck: true })

    const { content } = getContent()
    expect(content).toBeNull()
  })
}

export const Readonly: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown readonly label="Readonly">
      [content]
    </VaButtonDropdown>
  `,
})

export const Icon: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown label="Icon" icon="close">
      [content]
    </VaButtonDropdown>
  `,
})

export const OpenedIcon: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown label="Opened Icon" openedIcon="close">
      [content]
    </VaButtonDropdown>
  `,
})

export const IconColor: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown iconColor="warning" label="Icon" icon="close">
      [content]
    </VaButtonDropdown>
  `,
})

export const LeftIcon: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown label="Left Icon" icon="close" leftIcon>
      [content]
    </VaButtonDropdown>
  `,
})

export const HideIcon: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown label="Icon" hideIcon>
      [content]
    </VaButtonDropdown>
  `,
})

export const Preset: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <div style="display: flex; align-items: center; gap: 4px;">
      [primary]
      <VaButtonDropdown label="Primary" preset="primary">
        [content]
      </VaButtonDropdown>
      [secondary]
      <VaButtonDropdown label="Secondary" preset="secondary">
        [content]
      </VaButtonDropdown>
      [plain]
      <VaButtonDropdown label="Plain" preset="plain">
        [content]
      </VaButtonDropdown>
      [plainOpacity]
      <VaButtonDropdown label="Plain-opacity" preset="plainOpacity">
        [content]
      </VaButtonDropdown>
    </div>
  `,
})

export const Size: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <div style="display: flex; align-items: center; gap: 4px;">
      [small]
      <VaButtonDropdown label="Small" size="small">
        [content]
      </VaButtonDropdown>
      [medium]
      <VaButtonDropdown label="Medium (Default)">
        [content]
      </VaButtonDropdown>
      [large]
      <VaButtonDropdown label="Large" size="large">
        [content]
      </VaButtonDropdown>
    </div>
  `,
})

export const Round: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown label="Round" round>
      [content]
    </VaButtonDropdown>
  `,
})

export const Split: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown label="Split" split>
      [content]
    </VaButtonDropdown>
  `,
})

Split.play = async ({ step }) => {
  const { button } = getButtonDropdownAll()

  await step('Opens content menu by clicking on the icon button', async () => {
    await userEvent.click(button[1])

    const { content } = getContent()
    expect(content).not.toBeNull()
  })

  await step('Closes content menu by clicking anywhere (split)', async () => {
    await userEvent.click(document.body)

    const { content } = getContent()
    expect(content).toBeNull()
  })
}

export const DisableDropdown: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown split disableDropdown label="Disable Dropdown">
      [content]
    </VaButtonDropdown>
  `,
})

DisableDropdown.play = async ({ step }) => {
  const { button } = getButtonDropdownAll()

  await step('Must not open content menu by clicking on the icon button (disable dropdown)', async () => {
    await userEvent.click(button[1], { skipPointerEventsCheck: true })

    const { content } = getContent()
    expect(content).toBeNull()
  })
}

export const DisableButton: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown split disableButton label="Disable Button">
      [content]
    </VaButtonDropdown>
  `,
})

DisableButton.play = async ({ step }) => {
  const { button } = getButtonDropdownAll()

  await step('Opens content menu by clicking on the icon button (disable button)', async () => {
    await userEvent.click(button[1])

    const { content } = getContent()
    expect(content).not.toBeNull()
  })

  await step('Closes content menu by clicking anywhere (disable button)', async () => {
    await userEvent.click(document.body)

    const { content } = getContent()
    expect(content).toBeNull()
  })
}

export const Anchor: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown anchor="#anchor_target" style="display: none;">
      [content]
    </VaButtonDropdown>
    <div id="anchor_target" style="width: fit-content;">[anchor]</div>
  `,
})

Anchor.play = async ({ step }) => {
  const { anchor } = getAnchor()

  await step('Opens content menu by clicking on the anchor', async () => {
    await userEvent.click(anchor)

    const { content } = getContent()
    expect(content).not.toBeNull()
  })

  await step('Closes content menu by clicking anywhere (anchor)', async () => {
    await userEvent.click(document.body)

    const { content } = getContent()
    expect(content).toBeNull()
  })
}

export const LabelSlot: StoryFn = () => ({
  components: { VaButtonDropdown },
  template: `
    <VaButtonDropdown>
      <template #label>
        [label slot]
      </template>
      [content]
    </VaButtonDropdown>
  `,
})

export const ClickEvent: StoryFn = () => ({
  components: { VaButtonDropdown },
  data: () => ({ clicked: false }),
  template: `
    <VaButtonDropdown label="Click Event" @click="clicked = true">
      [content]
    </VaButtonDropdown>
    <div id="click_event" v-if="clicked">Click event has been emited</div>
  `,
})

ClickEvent.play = async ({ step }) => {
  const { button } = getButtonDropdown()

  await step('Emits click event', async () => {
    await userEvent.click(button)

    const status = getStorySelector('#click_event')
    expect(status).toHaveTextContent('Click event has been emited')
  })
}

export const MainButtonClick: StoryFn = () => ({
  components: { VaButtonDropdown },
  data: () => ({ clicked: false }),
  template: `
    <VaButtonDropdown label="Main Button click Event" split @mainButtonClick="clicked = true">
      [content]
    </VaButtonDropdown>
    <div id="main_button_click_event" v-if="clicked">Main button click event has been emited</div>
  `,
})

MainButtonClick.play = async ({ step }) => {
  const { button } = getButtonDropdown()

  await step('Emits main button click event', async () => {
    await userEvent.click(button)

    const status = getStorySelector('#main_button_click_event')
    expect(status).toHaveTextContent('Main button click event has been emited')
  })
}
