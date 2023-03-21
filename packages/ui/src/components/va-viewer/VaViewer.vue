<template>
  <div
    class="va-viewer"
    v-bind="$attrs"
    @click="handleAnchorClick"
  >
    <slot
      name="anchor"
      v-bind="{ openViewer }"
    />

    <slot v-if="!$slots.anchor" />
  </div>

  <teleport
    v-if="isOpened"
    :to="teleportTarget"
  >
    <div class="va-viewer-content">
      <div
        ref="content"
        class="va-viewer-content__main-area"
      >
        <slot v-if="!$slots.image" />
        <slot name="image" />
      </div>

      <div
        ref="controls"
        class="va-viewer-content__controls-panel"
      >
        <slot name="controls" />

        <slot
          name="close"
          v-bind="{ close: closeViewer }"
        >
          <button
            class="va-viewer-content__close-button"
            @click="closeViewer"
          >
            <va-icon
              name="close"
              color="backgroundPrimary"
            />
          </button>
        </slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

import { VaIcon } from '../va-icon'

import { useIsMounted, useDocument, useClickOutside } from '../../composables'

export default defineComponent({
  name: 'VaViewer',

  inheritAttrs: false,

  components: { VaIcon },

  setup (_, { slots }) {
    const content = ref<HTMLElement>()
    const controls = ref<HTMLElement>()

    const isMounted = useIsMounted()
    const isClosed = ref(true)
    const isOpened = computed(() => isMounted.value && !isClosed.value)

    const openViewer = () => (isClosed.value = false)
    const closeViewer = () => (isClosed.value = true)
    const handleAnchorClick = () => {
      if (!slots.anchor) {
        openViewer()
      }
    }

    useClickOutside([content, controls], closeViewer)

    const document = useDocument()
    const teleportTarget = computed(() => document.value?.body)

    return {
      content,
      controls,

      teleportTarget,
      isOpened,

      openViewer,
      closeViewer,
      handleAnchorClick,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-viewer {
  --va-image-position: relative;
}

.va-viewer-content {
  position: fixed;
  inset: 0;
  z-index: var(--va-viewer-content-overlay-z-index);
  display: flex;
  justify-content: center;
  background-color: var(--va-viewer-content-overlay-background-color);

  &__main-area {
    --va-image-content-position: relative;

    display: flex;

    & > * {
      width: auto;
      max-width: unset;
    }
  }

  &__controls-panel {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--va-viewer-content-controls-panel-z-index);
    display: flex;
    justify-content: var(--va-viewer-content-controls-panel-justify-content);
    padding: var(--va-viewer-content-controls-panel-padding);
    background-color: var(--va-viewer-content-controls-panel-background-color);
  }
}
</style>
