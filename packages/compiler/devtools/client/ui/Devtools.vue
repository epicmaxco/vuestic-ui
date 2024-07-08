<template>
  <Teleport to="body" v-if="isEditMode">
    <Overlay
      @click="onHoveredElementClick"
      @wheel="onWheel"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
    />
    <Outline :node="targetElement" :thickness="1" />
    <Outline :node="hoveredElement" :thickness="2" dashed  />

    <!-- <DraggableWindow default-position="top-left" v-if="targetElement">
      <VaCounter v-model="zoom" label="Zoom" inner-label step="0.01" stateful max="2" min="0.5" buttons />
    </DraggableWindow> -->

    <DraggableWindow default-position="top-right" v-if="targetElement">
      <VaCard>
        <ComponentView />
      </VaCard>
    </DraggableWindow>

    <DraggableWindow default-position="bottom-left" v-if="targetElement">
      <VaCard>
        <VaCardContent>
          <AppTree />
        </VaCardContent>
      </VaCard>
    </DraggableWindow>

    <VaModal>
      <ComponentViewSource />
    </VaModal>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch, watchEffect } from 'vue'
import Outline from './components/base/Outline.vue'
import Overlay from './components/base/Overlay.vue'
import ComponentView from './components/ComponentView.vue'
import ComponentViewSource from './components/ComponentViewSource.vue'
import DraggableWindow from './components/base/DraggableWindow.vue'
import AppTree from './components/AppTree.vue'

import { VaCard, VaCardContent, VaModal, useToast } from 'vuestic-ui'

import { useTargetElementStore } from './store/useTargetElementStore'
import { useHoveredElement } from './composables/useHoveredElement'
import { useAppTransform } from './composables/useAppTransform'
import { useOutlines } from './composables/useOutlines'
import { EDIT_MODE_CLASS } from '../../shared/CONST'
import { useEvent } from './composables/base/useEvent'

const isEditMode = ref(false)

const { notify } = useToast()

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

let enteredKeys = ''
useEvent('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    isEditMode.value = false
    zoom.value = 1
    targetElement.value = null
    return
  }

  if (e.key === 'v') {
    enteredKeys = ''
    enteredKeys = 'v'
    return
  }

  if (e.key === 'a' && enteredKeys === 'v') {
    isEditMode.value = !isEditMode.value
    zoom.value = 1
    targetElement.value = null
    e.preventDefault()
  }

  enteredKeys = ''
})

useEvent('keyup', () => {
  enteredKeys = ''
})


const { targetElement } = useTargetElementStore()
const hoveredElement = useHoveredElement()

function onHoveredElementClick() {
  targetElement.value = hoveredElement.value
}

watch(hoveredElement, (newEl, oldEl) => {
  if (oldEl) { oldEl.removeEventListener('dblclick', onHoveredElementClick) }
  if (newEl) { newEl.addEventListener('dblclick', onHoveredElementClick) }
})

const { zoom, translate, onWheel, onMouseDown, onMouseMove, onMouseUp } = useAppTransform()
const recalculateOutlines = useOutlines()

watch(targetElement, (newElement) => {
  if (newElement) {
    zoom.value = Math.floor((window.innerWidth - (600 + 50)) * 100 / window.innerWidth) / 100
  } else {
    zoom.value = 1
    translate.x = 0
    translate.y = 0
  }
})

watch([zoom, translate], () => {
  const app = document.querySelector<HTMLElement>('#app')

  if (!app) { throw new Error('App element not found to zoom') }

  app.style.transform = `scale(${zoom.value}) translate(${translate.x}px, ${translate.y}px)`

  nextTick(recalculateOutlines)
}, { immediate: true })
</script>

<style scoped>
  .va-code-snippet {
    font-family: monospace;
    /* white-space: pre; */
    overflow-x: auto;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 4px;
  }

  body {
    overflow-x: hidden;
  }
</style>
