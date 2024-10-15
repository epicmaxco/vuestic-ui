import { Directive, nextTick, ref } from 'vue'
import { VaDropdown, VaDropdownContent } from '.'
import { VaButton, VaIcon, VaValue, VaModal } from '@/components'
import { StoryFn } from '@storybook/vue3'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { sleep } from '@/utils/sleep'
import DropdownScopedAttr from './__demo__/DropdownScopedAttr.vue'

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
      <VaDropdown>
        <template #anchor>
          <div data-testid="target">
            Click me
          </div>
        </template>
        Clicked
      </VaDropdown>
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
      <VaDropdown
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
      </VaDropdown>
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
      <VaDropdown
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
        Content
      </VaDropdown>
    `,
})

ContentNotHoverable.play = async ({ canvasElement, step }) => {
  const body = within(canvasElement.ownerDocument.body)
  const target = body.getByTestId('target')
  await step('Dropdown hides when hover moves to dropdown content', async () => {
    userEvent.hover(target)
    await sleep()
    const dropdownContent = body.getByText('Content')
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
      <VaDropdown trigger="right-click">
        <template #anchor>
          Right click
        </template>
        Right clicked
      </VaDropdown>
      <VaDropdown trigger="dblclick">
        <template #anchor>
          Double click
        </template>
        Double clicked
      </VaDropdown>
    </div>
    `,
})

export const Placement = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
    <div class="mt-8 d-flex gap-4">
      <VaDropdown
          :model-value="true"
          placement="top"
      >
        <template #anchor>
          Placement top
        </template>
        <VaDropdownContent>Content</VaDropdownContent>
      </VaDropdown>
      <br/>
      <VaDropdown
          :model-value="true"
          placement="top-start"
      >
        <template #anchor>
          Placement top start
        </template>
        <VaDropdownContent>Content</VaDropdownContent>
      </VaDropdown>
    </div>
    `,
})

export const Offset = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
      <VaDropdown
          :model-value="true"
          :offset="[20, 40]"
      >
        <template #anchor>
          Anchor
        </template>
        <VaDropdownContent>Content</VaDropdownContent>
      </VaDropdown>
    `,
})

export const AnchorWidth = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
    <div class="d-flex gap-4">
      <VaDropdown
          keepAnchorWidth
          :model-value="true"
      >
        <template #anchor>
          Short anchor
        </template>
        <VaDropdownContent>
          Long content wraps
        </VaDropdownContent>
      </VaDropdown>
      <VaDropdown
          keepAnchorWidth
          :model-value="true"
      >
        <template #anchor>
          Loooooooong anchor
        </template>
        <VaDropdownContent>
          Short content
        </VaDropdownContent>
      </VaDropdown>
    </div>
    `,
})

export const CustomWidth = () => ({
  components: { VaDropdown, VaValue, VaDropdownContent },
  template: `
    <div class="d-flex gap-4">
      <VaDropdown :model-value="true">
        <template #anchor>
          Custom width anchor
        </template>
        <template #default="{ getAnchorWidth }">
          <VaDropdownContent :style="{ minWidth: getAnchorWidth() }">
            Short content
          </VaDropdownContent>
        </template>
      </VaDropdown>
      <VaDropdown placement="bottom-start" :model-value="true">
        <template #anchor>
          Custom width anchor
        </template>
        <template #default="{ getAnchorWidth }">
          <VaDropdownContent :style="{ minWidth: getAnchorWidth() }">
            Loooooooong content
          </VaDropdownContent>
        </template>
      </VaDropdown>
    </div>
    `,
})

export const Cursor = () => ({
  components: { VaDropdown },
  template: `
      <VaDropdown cursor>
        <template #anchor>
          <div class="w-32 h-32 border-2 border-gray-1000 border-dashed">
            Anchor
          </div>
        </template>
        Content
      </VaDropdown>
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
      <VaDropdown
          anchor-selector="#anchor-selector"
      >
        Content
      </VaDropdown>
    `,
})

export const InnerAnchorSelector: StoryFn = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
      <VaDropdown
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
        <VaDropdownContent data-testid="content" id="content">Content</VaDropdownContent>
      </VaDropdown>
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
      <VaDropdown>
        <template #anchor="{ isOpened }">
          Anchor <va-icon :name="isOpened ? 'va-arrow-up' : 'va-arrow-down'"/>
        </template>
        Content
      </VaDropdown>
    `,
})

export const KeepHeight = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
      <div style="height: 1000px">
        <VaDropdown>
          <template #anchor>
            Anchor
          </template>
          <VaDropdownContent>
            <div style="height: 600px; width: 100px;">
              Content
            </div>
          </VaDropdownContent>
        </VaDropdown>
      </div>
    `,
})

export const AutoplacementWithTarget: StoryFn = () => ({
  components: { VaDropdown, VaDropdownContent, ScrollContainer },
  directives: { scrollToMiddleY },
  setup () {
    return {
      autoplacementTargetRef: ref(null),
    }
  },
  template: `
      Scroll vertically
      <ScrollContainer
          ref="autoplacementTargetRef"
          v-scroll-to-middle-y
          data-testid="scrollContainer"
      >
        <div style="height: 200%;display: grid;place-items: center;">
          <VaDropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetRef"
          >
            <template #anchor>
              <div data-testid="anchor" class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed"/>
            </template>
            Dropdown
          </VaDropdown>
        </div>
      </ScrollContainer>
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
      <ScrollContainer
          ref="autoplacementTargetRef"
          v-scroll-to-middle-y
      >
        <div style="height: 200%;display: grid;place-items: center;">
          <VaDropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetRef"
          >
            <template #anchor>
              <div class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed">
              </div>
            </template>
            <VaDropdownContent>
              <div style="height: 600px; width: 100px;">
                Content
              </div>
            </VaDropdownContent>
          </VaDropdown>
        </div>
      </ScrollContainer>
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
      <ScrollContainer
          ref="autoplacementTargetRef"
          v-scroll-to-middle-x
      >
        <div style="height: 100%;width: 200%;display: grid;place-items: center;">
          <VaDropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetRef"
              stick-to-edges
          >
            <template #anchor>
              <div class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed">
              </div>
            </template>
            <VaDropdownContent>
              Looooonger Dropdown
            </VaDropdownContent>
          </VaDropdown>
        </div>
      </ScrollContainer>
    `,
})

export const VisibleInModal: StoryFn = () => ({
  components: { VaDropdown, VaButton, VaDropdownContent, VaModal },

  setup () {
    return {
      modalOpen: ref(false),
    }
  },

  template: `
    <VaButton @click="modalOpen = true">Open modal</VaButton>
    <VaModal v-model="modalOpen">
      <VaDropdown stateful>
        <template #anchor>
          <div>
            Anchor
          </div>
        </template>
        <VaDropdownContent style="height: 200px">
          Content
        </VaDropdownContent>
      </VaDropdown>
    </VaModal>
  `,
})

export const Focus: StoryFn = () => ({
  components: { VaDropdown },
  template: `
      <button class="focus:bg-red-200">Prev focusable</button>

      <VaDropdown>
        <template #anchor>
          <button class="focus:bg-red-200" data-testid="target">
            Click me
          </button>
        </template>

        <button class="focus:bg-red-200">Dropdown content</button>
      </VaDropdown>

      <button class="focus:bg-red-200">Next focusable</button>
    `,
})

export const ScopedAttr = () => ({
  components: { DropdownScopedAttr },
  template: '<DropdownScopedAttr/>',
})

export const Multiroot = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
    <VaDropdown>
      <template #anchor>
        <div>First root</div>
        <div>Second root</div>
      </template>
      <VaDropdownContent>
        <div style="height: 600px; width: 100px;">
          Content
        </div>
      </VaDropdownContent>
    </VaDropdown>
    `,
})
