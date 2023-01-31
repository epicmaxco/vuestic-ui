<template>
  <div
    class="va-viewer__anchor"
    v-bind="$attrs"
  >
    <slot
      name="anchor"
      v-bind="{ openViewer }"
    />
    <div
      v-if="!$slots.anchor"
      @click="openViewer"
    >
      <slot />
    </div>
  </div>

  <teleport
    v-if="isOpened"
    :to="teleportTarget"
  >
    <div class="va-viewer">
      <div
        ref="content"
        class="va-viewer__content"
      >
        <slot v-if="!$slots.image" />
        <slot
          name="image"
          v-bind="{ isOpened: isViewerContent }"
        />
      </div>

      <div
        ref="controls"
        class="va-viewer__controls-panel"
      >
        <slot name="controls" />

        <slot
          name="close"
          v-bind="{ close: closeViewer }"
        >
          <button
            class="va-viewer__close-button"
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

  setup () {
    const content = ref<HTMLElement>()
    const controls = ref<HTMLElement>()

    const isMounted = useIsMounted()
    const isClosed = ref(true)
    const isOpened = computed(() => isMounted.value && !isClosed.value)

    const openViewer = () => (isClosed.value = false)
    const closeViewer = () => (isClosed.value = true)

    useClickOutside([content, controls], closeViewer)

    const document = useDocument()
    const teleportTarget = computed(() => document.value?.body)

    const isViewerContent = computed(() => !!content.value)

    return {
      content,
      controls,

      teleportTarget,
      isOpened,
      isViewerContent,

      openViewer,
      closeViewer,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-viewer {
  position: fixed;
  inset: 0;
  z-index: var(--va-viewer-overlay-z-index);
  display: flex;
  justify-content: center;
  background-color: var(--va-viewer-overlay-background-color);

  &__anchor {
    --va-image-position: relative;
  }

  &__content {
    --va-image-position: relative;

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
    z-index: var(--va-viewer-controls-panel-z-index);
    display: flex;
    justify-content: var(--va-viewer-controls-panel-justify-content);
    padding: var(--va-viewer-controls-panel-padding);
    background-color: var(--va-viewer-controls-panel-background-color);
  }
}
</style>
