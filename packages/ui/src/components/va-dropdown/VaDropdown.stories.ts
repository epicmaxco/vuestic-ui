import { Directive, nextTick, ref } from 'vue'
import { VaDropdown, VaDropdownContent } from '.'
import { VaButton, VaIcon, VaValue } from '@/components'
import { StoryFn } from '@storybook/vue3'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '@/utils/sleep'

const scrollToMiddleY = (el: HTMLElement) => {
  const { scrollHeight, clientHeight } = el
  el.scrollTop = (scrollHeight - clientHeight) / 2
}

const scrollToMiddleX = (el: HTMLElement) => {
  const { scrollWidth, clientWidth } = el
  el.scrollLeft = (scrollWidth - clientWidth) / 2
}

const ScrollContainer = {
  template: `
    <div
    style="width: 500px; height: 300px; overflow: auto; position: relative;"
    class="border-2 border-gray-1000 border-dashed">
      <slot />
    </div>
`,
}

export default {
  components: { VaIcon, VaValue, VaDropdownContent },
  title: 'VaDropdown',
  component: VaDropdown,
  tags: ['autodocs'],
}

export const Default: StoryFn = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown>
        <template #anchor>
          <div data-testid="target">
            Click me
          </div>
        </template>
        Clicked
      </va-dropdown>
    `,
})

Default.play = async ({ canvasElement, step }) => {
  const body = within(canvasElement.parentElement!)
  const target = body.getByTestId('target')
  await step('Opens on click', async () => {
    userEvent.click(target)
    await nextTick()
    const dropdownContent = body.getByText('Clicked')
    expect(dropdownContent).toBeVisible()
  })
}

export const Hover: StoryFn = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          trigger="hover"
          :hoverOverTimeout="0"
          :hoverOutTimeout="0"
      >
        <template #anchor>
          <div data-testid="target">
            Hover me
          </div>
        </template>
        Hovered
      </va-dropdown>
    `,
})

Hover.play = async ({ canvasElement, step }) => {
  const body = within(canvasElement.parentElement!)
  const target = body.getByTestId('target')!
  await step('Opens on hover', async () => {
    userEvent.hover(target)
    await sleep()
    const dropdownContent = body.getByText('Hovered')
    expect(dropdownContent).toBeVisible()
  })
  await step('Dropdown stays visible when hover moves to dropdown content', async () => {
    const dropdownContent = body.getByText('Hovered')
    userEvent.unhover(target)
    userEvent.hover(dropdownContent)
    await sleep()
    expect(dropdownContent).toBeVisible()
  })
  await step('Dropdown hides on mouse leave', async () => {
    const dropdownContent = body.getByText('Hovered')
    userEvent.unhover(dropdownContent)
    await sleep()
    expect(dropdownContent).not.toBeVisible()
  })
}

export const ContentNotHoverable: StoryFn = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          trigger="hover"
          :is-content-hoverable="false"
          :hoverOverTimeout="0"
          :hoverOutTimeout="0"
      >
        <template #anchor>
          <div data-testid="target">
            Hover me
          </div>
        </template>
        Hovered
      </va-dropdown>
    `,
})

ContentNotHoverable.play = async ({ canvasElement, step }) => {
  const body = within(canvasElement.parentElement!)
  const target = body.getByTestId('target')
  await step('Dropdown hides when hover moves to dropdown content', async () => {
    userEvent.hover(target)
    await sleep()
    const dropdownContent = body.getByText('Hovered')
    userEvent.unhover(target)
    userEvent.hover(dropdownContent)
    await sleep()
    expect(dropdownContent).not.toBeVisible()
  })
}

export const Trigger: StoryFn = () => ({
  components: { VaDropdown },
  template: `
    <div class="d-flex gap-4">
      <va-dropdown trigger="right-click">
        <template #anchor>
          Right click
        </template>
        Right clicked
      </va-dropdown>
      <va-dropdown trigger="dblclick">
        <template #anchor>
          Double click
        </template>
        Double clicked
      </va-dropdown>
    </div>
    `,
})

export const Placement = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
    <div class="mt-8 d-flex gap-4">
      <va-dropdown
          :model-value="true"
          placement="top"
      >
        <template #anchor>
          Placement top
        </template>
        <va-dropdown-content>Content</va-dropdown-content>
      </va-dropdown>
      <br/>
      <va-dropdown
          :model-value="true"
          placement="top-start"
      >
        <template #anchor>
          Placement top start
        </template>
        <va-dropdown-content>Content</va-dropdown-content>
      </va-dropdown>
    </div>
    `,
})

export const Offset = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
      <va-dropdown
          :model-value="true"
          :offset="[20, 40]"
      >
        <template #anchor>
          Anchor
        </template>
        <va-dropdown-content>Content</va-dropdown-content>
      </va-dropdown>
    `,
})

export const AnchorWidth = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
    <div class="d-flex gap-4">
      <va-dropdown
          keepAnchorWidth
          :model-value="true"
      >
        <template #anchor>
          Short anchor
        </template>
        <va-dropdown-content>
          Long content wraps
        </va-dropdown-content>
      </va-dropdown>
      <va-dropdown
          keepAnchorWidth
          :model-value="true"
      >
        <template #anchor>
          Loooooooong anchor
        </template>
        <va-dropdown-content>
          Short content
        </va-dropdown-content>
      </va-dropdown>
    </div>
    `,
})

export const CustomWidth = () => ({
  components: { VaDropdown, VaValue, VaDropdownContent },
  template: `
    <div class="d-flex gap-4">
      <va-dropdown :model-value="true">
        <template #anchor>
          Custom width anchor
        </template>
        <template #default="{ getAnchorWidth }">
          <va-dropdown-content :style="{ minWidth: getAnchorWidth() }">
            Short content
          </va-dropdown-content>
        </template>
      </va-dropdown>
      <va-dropdown placement="bottom-start" :model-value="true">
        <template #anchor>
          Custom width anchor
        </template>
        <template #default="{ getAnchorWidth }">
          <va-dropdown-content :style="{ minWidth: getAnchorWidth() }">
            Loooooooong content
          </va-dropdown-content>
        </template>
      </va-dropdown>
    </div>
    `,
})

export const Cursor = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown cursor>
        <template #anchor>
          <div class="w-32 h-32 border-2 border-gray-1000 border-dashed">
            Anchor
          </div>
        </template>
        Content
      </va-dropdown>
    `,
})

export const AnchorSelector = () => ({
  components: { VaDropdown },
  template: `
      <div
          class="border-2 border-gray-1000 border-dashed"
          id="anchor-selector"
      >
        Anchor
      </div>
      <va-dropdown
          anchor-selector="#anchor-selector"
      >
        Content
      </va-dropdown>
    `,
})

export const InnerAnchorSelector: StoryFn = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
      <va-dropdown
          inner-anchor-selector="#innerAnchor"
      >
        <template #anchor>
          <div class="border-2 border-gray-1000 border-dashed" data-testid="anchor">
            <div
                class="border-2 border-gray-1000 border-dashed m-4"
                id="innerAnchor"
                data-testid="innerAnchor"
            >
              Anchor
            </div>
          </div>
        </template>
        <va-dropdown-content data-testid="content" id="content">Content</va-dropdown-content>
      </va-dropdown>
    `,
})

InnerAnchorSelector.play = async ({ canvasElement, step }) => {
  const body = within(canvasElement.parentElement!)
  const anchor = body.getByTestId('anchor')
  const innerAnchor = body.getByTestId('innerAnchor')
  await step("Doesn't open on anchor click", async () => {
    userEvent.click(anchor)
    await nextTick()
    expect(body.queryByTestId('content')).toBeNull()
  })
  await step('Opens on inner anchor click', async () => {
    userEvent.click(innerAnchor)
    await nextTick()
    expect(body.getByTestId('content')).toBeVisible()
    userEvent.click(innerAnchor)
  })
}

export const AnchorSlotProps = () => ({
  components: { VaDropdown, VaIcon },
  template: `
      <va-dropdown>
        <template #anchor="{ isOpened }">
          Anchor <va-icon :name="isOpened ? 'va-arrow-up' : 'va-arrow-down'"/>
        </template>
        Content
      </va-dropdown>
    `,
})

export const KeepHeight = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
      <div style="height: 1000px">
        <va-dropdown>
          <template #anchor>
            Anchor
          </template>
          <va-dropdown-content>
            <div style="height: 600px; width: 100px;">
              Content
            </div>
          </va-dropdown-content>
        </va-dropdown>
      </div>
    `,
})

export const AutoplacementWithTarget: StoryFn = () => ({
  components: { VaDropdown, VaButton, VaDropdownContent, ScrollContainer },
  directives: { scrollToMiddleY },
  setup () {
    return {
      autoplacementTargetRef: ref(null),
    }
  },
  template: `
      Scroll vertically
      <scroll-container
          ref="autoplacementTargetRef"
          v-scroll-to-middle-y
          data-testid="scrollContainer"
      >
        <div style="height: 200%;display: grid;place-items: center;">
          <va-dropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetRef"
          >
            <template #anchor>
              <div data-testid="anchor" class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed"/>
            </template>
            Dropdown
          </va-dropdown>
        </div>
      </scroll-container>
    `,
})

export const AutoplacementWithHeight: StoryFn = () => ({
  components: { VaDropdown, VaButton, VaDropdownContent, ScrollContainer },
  directives: { scrollToMiddleY },
  setup () {
    return {
      autoplacementTargetRef: ref<HTMLElement>(),
    }
  },
  template: `
      Scroll vertically
      <scroll-container
          ref="autoplacementTargetRef"
          v-scroll-to-middle-y
      >
        <div style="height: 200%;display: grid;place-items: center;">
          <va-dropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetRef"
          >
            <template #anchor>
              <div class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed">
              </div>
            </template>
            <va-dropdown-content>
              <div style="height: 600px; width: 100px;">
                Content
              </div>
            </va-dropdown-content>
          </va-dropdown>
        </div>
      </scroll-container>
    `,
})

export const StickToEdges: StoryFn = () => ({
  components: { VaDropdown, VaButton, VaDropdownContent, ScrollContainer },
  directives: { scrollToMiddleX },
  setup () {
    return {
      autoplacementTargetRef: ref<HTMLElement>(),
    }
  },
  template: `
      Scroll horizontally
      <scroll-container
          ref="autoplacementTargetRef"
          v-scroll-to-middle-x
      >
        <div style="height: 100%;width: 200%;display: grid;place-items: center;">
          <va-dropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetRef"
              stick-to-edges
          >
            <template #anchor>
              <div class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed">
              </div>
            </template>
            <div>
              Looooonger Dropdown
            </div>
          </va-dropdown>
        </div>
      </scroll-container>
    `,
})
