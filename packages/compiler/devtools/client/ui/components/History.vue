<script lang="ts" setup>
import { watch, ref, computed, Ref } from 'vue'
import { useComponent, setNodeSource } from '../composables/useComponent'
import { VaButton } from 'vuestic-ui';

const { source, uid } = useComponent()

type HistorySnapshot = {
  newSource: string
  oldSource: string
  minfiedPath: string
} | 'targetChange'

const history = ref([]) as Ref<HistorySnapshot[]>

let watchIgnore = false
watch([source.content, uid], ([newSource, newUid], [oldSource, oldUid]) => {
  if (watchIgnore) {
    watchIgnore = false
    return
  }

  if (newUid !== oldUid) {
    history.value.push('targetChange')
    index.value += 1
    return
  }

  if (history.value[history.value.length - 1] === 'targetChange') {
    history.value.pop()
    index.value -= 1
    return
  }

  if (newSource !== oldSource && newUid === oldUid && oldSource !== null && newSource !== null && newUid) {
    // Remove next history if we are not at the end and create new history
    history.value = history.value.slice(0, index.value)

    const lastItem = history.value[history.value.length - 1]

    if (typeof lastItem === 'object' && lastItem.newSource.trim() === newSource.trim()) {
      return
    }

    index.value += 1

    history.value.push({
      newSource,
      oldSource,
      minfiedPath: newUid
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
    await source.refresh()

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
    await source.refresh()
  }
}
</script>

<template>
  <div>
    <VaButton icon="undo" @click="undo" preset="secondary" :disabled="index <= 0" />
    <VaButton icon="redo" @click="redo" preset="secondary" :disabled="index >= history.length" />
  </div>
</template>
