import { ref, watch, Ref } from 'vue';
import { getNodeSource, getVSCodePath, setNodeSource, deleteNodeSource, getFileRelativePath } from './api';
import { useAsyncComputed } from '../base/useAsyncComputed';

export const useComponentSource = (uid: Ref<string | undefined>) => {
  /** @notice Source is async and may not be available until loaded */
  const source = ref<string | null>(null)
  const isSourceLoading = ref(false)
  const fileName = useAsyncComputed(async () => {
    if (!uid.value) { return null }

    return await (await getFileRelativePath(uid.value)).text()
  }, '')

  const resetSource = () => {
    source.value = null
  }

  const loadSource = async () => {
    if (!uid.value) {
      resetSource()
      return
    }

    try {
      isSourceLoading.value = true
      const response = await getNodeSource(uid.value)
      source.value = await response.text()
    } finally {
      isSourceLoading.value = false
    }
  }

  const saveSource = async (source: string) => {
    if (!uid.value) { throw new Error('Can not save source: no q available') }

    await setNodeSource(uid.value, source)

    await loadSource()
  }

  const removeFromSource = async () => {
    if (!uid.value) { throw new Error('Can not delete source: no q available') }

    await deleteNodeSource(uid.value)
  }

  watch(uid, async () => {
    resetSource()
    loadSource()
  }, { immediate: true })

  const openInVSCode = async () => {
    if (!uid.value) { throw new Error('Can not open in VSCode: no q available') }

    const path =  await (await getVSCodePath(uid.value)).text()

    fetch(`/__open-in-editor?file=${path}`)
  }

  return {
    fileName,
    source,
    isSourceLoading,
    refreshSource: loadSource,
    saveSource,
    removeFromSource,
    openInVSCode,
  }
}
