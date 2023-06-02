<template>
  <VbDemo>
    <VbCard title="Click">
      <va-dropdown-new>
        <template #anchor>
          Click me
        </template>
        Clicked
      </va-dropdown-new>
    </VbCard>
    <VbCard title="Hover">
      <va-dropdown-new
        trigger="hover"
      >
        <template #anchor>
          Hover me
        </template>
        Hovered
      </va-dropdown-new>
    </VbCard>
    <VbCard title="Top">
      <va-dropdown-new
        placement="top"
      >
        <template #anchor>
          Click me
        </template>
        Top
      </va-dropdown-new>
    </VbCard>
    <VbCard title="Top-start">
      <va-dropdown-new
        placement="top-start"
      >
        <template #anchor>
          Click me
        </template>
        TS
      </va-dropdown-new>
    </VbCard>
    <VbCard title="Offset 20 40">
      <va-dropdown-new
        :offset="[20, 40]"
      >
        <template #anchor>
          Click me
        </template>
        Offset
      </va-dropdown-new>
    </VbCard>
    <VbCard title="Same width">
      <va-dropdown-new
        keepAnchorWidth
      >
        <template #anchor>
          Click me
        </template>
        Looooong Dropdown
      </va-dropdown-new>
    </VbCard>
    <VbCard title="Flip + target">
      Scroll up
      <div class="overflow-hidden">
        <div
          class="scroll-container"
          ref="targetFlip"
          v-scroll-to-middle-y
        >
          <div class="content-container">
            <div class="vertical-space"></div>
            <va-dropdown-new
              :model-value="true"
              :target="targetFlip"
              class="grid place-items-center"
            >
              <template #anchor>
                <div class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed">
                </div>
              </template>
              Dropdown
            </va-dropdown-new>
            <div class="vertical-space"></div>
          </div>
        </div>
      </div>
    </VbCard>
    <VbCard title="Autoplacement main and cross axis + target">
      Scroll around
      <div class="overflow-hidden">
        <div
          class="scroll-container"
          ref="targetFlipShift"
          v-scroll-to-middle-y
          v-scroll-to-middle-x
        >
          <div class="content-container">
            <div class="vertical-space horizontal-space"></div>
            <va-dropdown-new
              :model-value="true"
              :target="targetFlipShift"
            >
              <template #anchor>
                <div class="grid place-items-center h-24 w-24 border-2 border-gray-1000 border-dashed">
                </div>
              </template>
              <div>
                Looooonger Dropdown
              </div>
            </va-dropdown-new>
            <div class="vertical-space horizontal-space"></div>
          </div>
        </div>
      </div>
    </VbCard>
  </VbDemo>
</template>

<script>
import { ref } from 'vue'
import VaDropdownNew from './VaDropdownNew.vue'

export default {
  components: {
    VaDropdownNew,
  },
  setup () {
    return {
      targetFlip: ref(null),
      targetFlipShift: ref(null),
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
