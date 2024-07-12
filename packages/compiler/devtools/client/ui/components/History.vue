<script lang="ts" setup>
import { watch, ref, computed, Ref } from 'vue'
import { useComponent } from '../composables/useComponent'
import { useTargetElementStore } from '../store/useTargetElementStore'
import { VaButton } from 'vuestic-ui';
import { setNodeSource } from '../composables/useComponent/api'

const { source, selectedPath, refreshSource } = useComponent()
const { targetElement } = useTargetElementStore()

type HistorySnapshot = {
  newSource: string
  oldSource: string
  targetElement: HTMLElement
  minfiedPath: string
} | 'targetChange'

const history = ref([]) as Ref<HistorySnapshot[]>

let watchIgnore = false
watch([source, targetElement], ([newSource, newTargetElement], [oldSource, oldTargetElement]) => {
  if (watchIgnore) {
    watchIgnore = false
    return
  }

  if (newTargetElement !== oldTargetElement) {
    history.value.push('targetChange')
    index.value += 1
    return
  }

  if (history.value[history.value.length - 1] === 'targetChange') {
    history.value.pop()
    index.value -= 1
    return
  }

  if (newSource !== oldSource && newTargetElement === oldTargetElement && oldSource && newSource && selectedPath.value && newTargetElement) {
    // Remove next history if we are not at the end and create new history
    history.value = history.value.slice(0, index.value)
    index.value += 1
    history.value.push({
      newSource,
      oldSource,
      targetElement: newTargetElement,
      minfiedPath: selectedPath.value.minified
    })
  }
})

const index = ref(0)
const current = computed(() => {
  return history.value[index.value - 1]
})

const undo = async () => {
  if (index.value > 0) {
    if (current.value === 'targetChange') {
      return
    }

    await setNodeSource(current.value.minfiedPath, current.value.oldSource)
    watchIgnore = true
    await refreshSource()
    index.value--
  }
}

const redo = async () => {
  if (index.value < history.value.length) {
    if (current.value === 'targetChange') {
      return
    }

    index.value++
    await setNodeSource(current.value.minfiedPath, current.value.newSource)
    watchIgnore = true
    await refreshSource()
  }
}
</script>

<template>
  <div>
    {{ index }} of {{ history.length }}
    <VaButton icon="undo" @click="undo" preset="primary" :disabled="index <= 0" />
    <VaButton icon="redo" @click="redo" preset="primary" :disabled="index >= history.length" />
  </div>
</template>
