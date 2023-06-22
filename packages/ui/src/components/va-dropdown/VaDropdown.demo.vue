<template>
  <VbDemo>
    <VbCard title="Click">
      <va-dropdown>
        <template #anchor>
          <div>
            Click me
          </div>
        </template>
        Clicked
      </va-dropdown>
    </VbCard>
    <VbCard title="Hover">
      <va-dropdown
        trigger="hover"
      >
        <template #anchor>
          Hover me
        </template>
        Hovered
      </va-dropdown>
    </VbCard>
    <VbCard title="Content not hoverable">
      <va-dropdown
        trigger="hover"
        :is-content-hoverable="false"
      >
        <template #anchor>
          Hover me
        </template>
        Hovered
      </va-dropdown>
    </VbCard>
    <VbCard title="Top">
      <va-dropdown
        placement="top"
      >
        <template #anchor>
          Click me
        </template>
        Top
      </va-dropdown>
    </VbCard>
    <VbCard title="Top-start">
      <va-dropdown
        placement="top-start"
      >
        <template #anchor>
          Click me
        </template>
        TS
      </va-dropdown>
    </VbCard>
    <VbCard title="Offset 20 40">
      <va-dropdown
        :offset="[20, 40]"
      >
        <template #anchor>
          Click me
        </template>
        Offset
      </va-dropdown>
    </VbCard>
    <VbCard title="Same width">
      <va-dropdown
        keepAnchorWidth
      >
        <template #anchor>
          Click me
        </template>
        Looooong Dropdown
      </va-dropdown>
    </VbCard>
    <VbCard title="Cursor">
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
    </VbCard>
    <VbCard title="Cursor + target">
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
    </VbCard>
    <VbCard title="Anchor selector">
      <div>
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
      </div>
    </VbCard>
    <VbCard title="Inner anchor selector">
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
    </VbCard>
    <VbCard title="Plugin">
      <va-dropdown>
        <template #anchor>
          <div>
            Click me
          </div>
        </template>
        <DropdownCloseButton />
      </va-dropdown>
    </VbCard>
    <VbCard title="Keep height">
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
    </VbCard>
    <VbCard title="Autoplacement + target">
      Scroll up
      <div class="overflow-hidden">
        <div
          class="scroll-container"
          ref="autoplacementTargetRef"
          v-scroll-to-middle-y
        >
          <div class="content-container">
            <div class="vertical-space"></div>
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
            <div class="vertical-space"></div>
          </div>
        </div>
      </div>
    </VbCard>
    <VbCard title="Autoplacement + target + keep height">
      Scroll up
      <div class="overflow-hidden">
        <div
          class="scroll-container"
          ref="autoplacementTargetHeightRef"
          v-scroll-to-middle-y
        >
          <div class="content-container">
            <div class="vertical-space"></div>
            <va-dropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetHeightRef"
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
            <div class="vertical-space"></div>
          </div>
        </div>
      </div>
    </VbCard>
    <VbCard title="Autoplacement and Stick to Edges + target">
      Scroll around
      <div class="overflow-hidden">
        <div
          class="scroll-container"
          ref="autoplacementTargetStickRef"
          v-scroll-to-middle-y
          v-scroll-to-middle-x
        >
          <div class="content-container">
            <div class="vertical-space horizontal-space"></div>
            <va-dropdown
              :model-value="true"
              :stateful="false"
              :target="autoplacementTargetStickRef"
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
            <div class="vertical-space horizontal-space"></div>
          </div>
        </div>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { ref } from 'vue'
import VaDropdown from './VaDropdown.vue'
import VaDropdownContent from './components/VaDropdownContent/VaDropdownContent.vue'
import DropdownCloseButton from '@/components/va-dropdown/__demo__/DropdownCloseButton.vue'

export default {
  components: {
    VaDropdown,
    VaDropdownContent,
    DropdownCloseButton,
  },
  setup () {
    return {
      cursorTarget: ref(null),
      autoplacementTargetRef: ref(null),
      autoplacementTargetHeightRef: ref(null),
      autoplacementTargetStickRef: ref(null),
    }
  },
  directives: {
    scrollToMiddleY: {
      mounted: (el) => {
        const { scrollHeight, clientHeight } = el
        el.scrollTop = (scrollHeight - clientHeight) / 2
      },
    },
    scrollToMiddleX: {
      mounted: (el) => {
        const { scrollWidth, clientWidth } = el
        el.scrollLeft = (scrollWidth - clientWidth) / 2
      },
    },
  },
}
</script>

<style scoped>
.overflow-hidden {
  overflow: hidden;
}

.scroll-container {
  width: 500px;
  height: 300px;
  overflow: auto;
  position: relative;
  border: 1px dashed black;
}

.content-container {
  display: grid;
  place-items: center;
}

.vertical-space {
  height: 400px;
}

.horizontal-space {
  width: 1000px;
}
</style>
