<template>
  <Teleport to="body" v-if="isEditMode">
    <div :style="colorsToCSSVariable(colors)" class="vuestic-devtools">
      <Overlay
        @click="onHoveredElementClick"
        v-on="appTransformListeners"
      />
      <Outline :node="hoveredElement" :thickness="1" dashed />
      <Outline v-for="element in elementsWithTargetVNode" :node="element" :thickness="1" color="outlineSecondary" background="outlineSecondaryBackground" />
      <Outline :node="element" :thickness="1" background="outlinePrimaryBackground" />

      <!-- Removed for now -->
      <!-- <Toolbar :node="element">
        <VaCard>
          <VaDropdown placement="top-start">
            <template #anchor>
              <VaButton icon="auto_awesome" size="small" preset="primary" />
            </template>

            <VaDropdownContent>
              <VaInput placeholder="Change label to email" label="AI prompt" />
            </VaDropdownContent>
          </VaDropdown>
        </VaCard>
      </Toolbar> -->

      <DraggableWindow default-position="top-left">
        <VaCard outlined>
          <AppToolbar />
        </VaCard>
      </DraggableWindow>

      <DraggableWindow default-position="top-left" :offset-y="45">
        <VaCard class="vuestic-devtools__left-sidebar" outlined>
          <VaScrollContainer vertical horizontal>
            <AppTree />
          </VaScrollContainer>
        </VaCard>
      </DraggableWindow>

      <DraggableWindow default-position="top-right" v-if="element">
        <VaCard class="vuestic-devtools__right-sidebar" outlined>
          <ComponentView />
        </VaCard>
      </DraggableWindow>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, watchEffect, computed } from 'vue'
import Outline from './components/base/Outline.vue'
import Overlay from './components/base/Overlay.vue'
import ComponentView from './components/ComponentView.vue'
import DraggableWindow from './components/base/DraggableWindow.vue'
import AppTree from './components/AppTree.vue'
import AppToolbar from './components/AppToolbar.vue'
import Toolbar from './components/base/Toolbar.vue'

import { VaCard, useToast, useColors, VaScrollContainer } from 'vuestic-ui'

import { useHoveredElement } from './composables/useHoveredElement'
import { useAppTransform } from './composables/useAppTransform'
import { useOutlines } from './composables/useOutlines'
import { EDIT_MODE_CLASS } from '../../shared/CONST'
import { useEvent } from './composables/base/useEvent'
import { useComponent } from './composables/useComponent'
import { useAppTree } from './composables/useAppTree/index'

const { selectAppTreeItem, selectedAppTreeItem } = useAppTree()

const isEditMode = ref(false)

const { notify } = useToast()

const { colorsToCSSVariable, colors } = useColors()
const { zoom, translate, listeners: appTransformListeners } = useAppTransform()


watchEffect(() => {
  if (isEditMode.value) {
    document.body.classList.add(EDIT_MODE_CLASS)
    notify({
      title: 'Vuestic dev tools',
      message: 'You entered edit mode. Click on an element to inspect it. Press "ESC" to exit.',
      color: 'info',
      duration: 7000,
      position: 'bottom-right'
    })
  } else {
    document.body.classList.remove(EDIT_MODE_CLASS)
  }
})

useEvent('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isEditMode.value = false
    zoom.value = 1
    translate.x = 0
    translate.y = 0
    selectAppTreeItem(null)
    return
  }

  if (e.key === 'F12' && e.altKey) {
    isEditMode.value = !isEditMode.value
    zoom.value = 1
    translate.x = 0
    translate.y = 0
    e.preventDefault()
    return
  }
}, { capture: true })

const { element } = useComponent()
const hoveredElement = useHoveredElement()

function onHoveredElementClick() {
  selectAppTreeItem(hoveredElement.value)
}

watch(hoveredElement, (newEl, oldEl) => {
  if (oldEl) { oldEl.removeEventListener('dblclick', onHoveredElementClick) }
  if (newEl) { newEl.addEventListener('dblclick', onHoveredElementClick) }
})

const recalculateOutlines = useOutlines()

watch(isEditMode, () => {
  if (isEditMode.value) {
    const LEFT_SIDEBAR_WIDTH = 300
    const RIGHT_SIDEBAR_WIDTH = 400
    const PADDING = 50

    zoom.value = ((window.innerWidth - ((LEFT_SIDEBAR_WIDTH + RIGHT_SIDEBAR_WIDTH + PADDING))) * 100 / window.innerWidth) / 100
    translate.x = (LEFT_SIDEBAR_WIDTH - RIGHT_SIDEBAR_WIDTH + PADDING)
    translate.y = 0
  } else {
    zoom.value = 1
    translate.x = 0
    translate.y = 0
  }
})

watch([zoom, translate], () => {
  const app = document.querySelector<HTMLElement>('#app')

  if (!app) { throw new Error('App element not found to zoom') }


  if (isEditMode.value) {
    app.style.transform = `scale(${zoom.value}) translate(${translate.x}px, ${translate.y}px)`
  } else {
    app.style.transform = ''
  }

  nextTick(recalculateOutlines)
}, { immediate: true })

const elementsWithTargetVNode = computed(() => {
  const minifiedPath = selectedAppTreeItem.value?.ids[0]

  return [...document.querySelectorAll(`[data-${minifiedPath}]`)] as HTMLElement[]
})
</script>

<style lang="scss">
body {
  position: relative;
}

.vuestic-devtools {
  &__right-sidebar {
    width: 400px;
    box-sizing: border-box;
    height: calc(100vh - 1rem);
  }

  &__left-sidebar {
    width: 300px;
    box-sizing: border-box;
    // 45 px offset from toolbar
    height: calc(100vh - 45px - 1rem);
  }

  .va-card {
    background: none !important;
    position: relative;
    z-index: 1;
    backdrop-filter: blur(20px);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background: var(--va-background-secondary);
      pointer-events: none;
      opacity: 0.5;
    }
  }
}

.vuestic-devtools__dropdown_content {
  background: none !important;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(5px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: var(--va-background-secondary);
    pointer-events: none;
    opacity: 0.5;
  }
}
</style>
