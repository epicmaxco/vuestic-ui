import { Directive, ref } from 'vue'
import { VaDropdown, VaDropdownContent } from '.'
import { VaButton, VaIcon, VaValue } from '../../components'
import { StoryFn } from '@storybook/vue3'

const scrollToMiddleY: Directive = {
  mounted: (el) => {
    const { scrollHeight, clientHeight } = el
    el.scrollTop = (scrollHeight - clientHeight) / 2
  },
}

const scrollToMiddleX: Directive = {
  mounted: (el) => {
    const { scrollWidth, clientWidth } = el
    el.scrollLeft = (scrollWidth - clientWidth) / 2
  },
}

const ScrollContainer = {
  template: `
    <div style="width: 500px; height: 300px; overflow: auto; position: relative; border: 1px dashed black">
      <slot />
    </div>
`,
}

export default {
  components: { VaIcon, VaValue, VaDropdownContent },
  title: 'VaDropdown',
  component: VaDropdown,
}

export const Default = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown>
        <template #anchor>
          <div>
            Click me
          </div>
        </template>
        Clicked
      </va-dropdown>
    `,
})

export const Hover = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          trigger="hover"
      >
        <template #anchor>
          Hover me
        </template>
        Hovered
      </va-dropdown>
    `,
})

export const ContentNotHoverable = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          trigger="hover"
          :is-content-hoverable="false"
      >
        <template #anchor>
          Hover me
        </template>
        Hovered
      </va-dropdown>
    `,
})

export const PlacementTop = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          placement="top"
      >
        <template #anchor>
          Click me
        </template>
        Top
      </va-dropdown>
    `,
})

export const PlacementTopStart = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          placement="top-start"
      >
        <template #anchor>
          Click me
        </template>
        TS
      </va-dropdown>
    `,
})

export const Offset = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          :offset="[20, 40]"
      >
        <template #anchor>
          Click me
        </template>
        Offset
      </va-dropdown>
    `,
})

export const AnchorWidth = () => ({
  components: { VaDropdown, VaDropdownContent },
  template: `
      <va-dropdown
          keepAnchorWidth
      >
        <template #anchor>
          <div>
            Short anchor
          </div>
        </template>
        <va-dropdown-content>
          Loooooooong Dropdown
        </va-dropdown-content>
      </va-dropdown>
      <br/>
      <va-dropdown
          keepAnchorWidth
      >
        <template #anchor>
          <div>
            Loooooooong anchor
          </div>
        </template>
        <va-dropdown-content>
          Short
        </va-dropdown-content>
      </va-dropdown>
    `,
})

export const CustomWidth = () => ({
  components: { VaDropdown, VaValue, VaDropdownContent },
  template: `
      <VaValue #default="v" :default-value="true">
        <button @click="v.value = !v.value">{{ v.value ? 'Short' : 'Long' }}</button>
        <br/>
        <va-dropdown placement="bottom-end">
          <template #anchor>
            <div>
              Custom width anchor
            </div>
          </template>

          <template #default="{ getAnchorWidth }">
            <va-dropdown-content :style="{ minWidth: getAnchorWidth() }">
              {{ v.value ? 'Short' : 'Loooong drooooopdown wwiiiiiidth' }}
            </va-dropdown-content>
          </template>
        </va-dropdown>
      </VaValue>
    `,
})

export const Cursor = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          trigger="right-click"
          placement="bottom-start"
          cursor
      >
        <template #anchor>
          <div class="w-32 h-32 border-2 border-gray-1000 border-dashed">
            Right click
          </div>
        </template>
        Ctx dropdown
      </va-dropdown>
    `,
})

export const CursorWithTarget = () => ({
  components: { VaDropdown },
  setup () {
    return {
      cursorTarget: ref(null),
    }
  },
  template: `
      <va-dropdown
          trigger="right-click"
          placement="bottom-start"
          :target="cursorTarget"
          cursor
      >
        <template #anchor>
          <div
              class="w-32 h-32 border-2 border-gray-1000 border-dashed"
              ref="cursorTarget"
          >
            Right click
          </div>
        </template>
        Ctx dropdown
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
        Click me
      </div>
      <va-dropdown
          anchor-selector="#anchor-selector"
      >
        Anchor selector
      </va-dropdown>
    `,
})

export const InnerAnchorSelector = () => ({
  components: { VaDropdown },
  template: `
      <va-dropdown
          inner-anchor-selector="#inner-anchor-selector"
      >
        <template #anchor>
          <div class="border-2 border-gray-1000 border-dashed">
            <div
                class="border-2 border-gray-1000 border-dashed m-4"
                id="inner-anchor-selector"
            >
              Click me
            </div>
          </div>
        </template>
        Inner anchor selector
      </va-dropdown>
    `,
})

export const AnchorBoundProps = () => ({
  components: { VaDropdown, VaIcon },
  template: `
      <va-dropdown>
        <template #anchor="{ isOpened }">
          <div>
            <va-icon :name="isOpened ? 'va-arrow-up' : 'va-arrow-down'"/>
          </div>
        </template>
        Clicked
      </va-dropdown>
    `,
})

export const KeepHeight = () => ({
  components: { VaDropdown, VaButton, VaDropdownContent },
  template: `
      <div style="height: 1000px">
        <va-dropdown>
          <template #anchor>
            <va-button>Anchor</va-button>
          </template>
          <va-dropdown-content>
            <div style="height: 600px; width: 100px;">
              Hi
            </div>
          </va-dropdown-content>
        </va-dropdown>
      </div>
    `,
})

export const Autoplacement: StoryFn = () => ({
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
      autoplacementTargetRef: ref(null),
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
                Hi
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
      autoplacementTargetRef: ref(null),
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
