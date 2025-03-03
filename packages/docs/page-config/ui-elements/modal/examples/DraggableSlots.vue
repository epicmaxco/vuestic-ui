<template>
  <div class="buttons">
    <VaButton @click="showModalIconDraggable = true">
      Open modal with draggable icon
    </VaButton>
    <VaButton @click="showModalHeaderDraggable = true">
      Open modal with draggable header
    </VaButton>
    <VaButton @click="showModalFooterDraggable = true">
      Open modal with draggable footer
    </VaButton>
  </div>
  <VaModal
    v-model="showModalIconDraggable"
    draggable
    title="With draggable icon"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <template #draggable="{startDrag}">
      <VaIcon name="drag_indicator" :style="{ cursor: 'move', position: 'absolute', top: '10px', right: '10px' }" @mousedown="startDrag" />
    </template>
  </VaModal>
  <VaModal
    v-model="showModalHeaderDraggable"
    draggable
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <template #header="{startDrag}">
      <h3 class="va-h3" :style="{ cursor: 'move' }" @mousedown="startDrag">
        <VaIcon name="drag_indicator" :style="{ cursor: 'move' }" @mousedown="startDrag" /> Draggable Header
      </h3>
    </template>
  </VaModal>
  <VaModal
    v-model="showModalFooterDraggable"
    draggable
    title="With draggable footer"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    <template #footer="{startDrag}">
      <VaIcon name="drag_indicator" :style="{ cursor: 'move', position: 'absolute' ,left: '10px', bottom: '10px' }" @mousedown="startDrag" />
    </template>
  </VaModal>
</template>

<script setup>
import { ref } from "vue";

const showModalIconDraggable = ref(false)
const showModalHeaderDraggable = ref(false)
const showModalFooterDraggable = ref(false)
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
