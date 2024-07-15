import { ref, computed, watch, Ref } from 'vue';
import { PREFIX } from '../../../../shared/CONST';
import { useComponentPaths } from './useComponentPaths'
import { getNodeSource, getVSCodePath, setNodeSource } from './api';

export const useComponentSource = (uid: Ref<string | undefined>) => {
  /** @notice Source is async and may not be available until loaded */
  const source = ref<string | null>(null)

  // const paths = useComponentPaths(htmlElement)

  // const selectedPathIndex = ref(0)

  // watch(paths, (paths) => {
  //   if (!paths) { return }

  //   if (selectedPathIndex.value >= paths.length) {
  //     selectedPathIndex.value = 0
  //   }
  // })

  const resetSource = () => {
    source.value = null
  }

  const loadSource = async () => {
    if (!uid.value) {
      resetSource()
      return
    }

    const response = await getNodeSource(uid.value)
    source.value = await response.text()
  }

  const saveSource = async (source: string) => {
    if (!uid.value) { throw new Error('Can not save source: no q available') }

    await setNodeSource(uid.value, source)

    await loadSource()
  }

  watch(uid, async () => {
    loadSource()
  }, { immediate: true })

  const openInVSCode = async () => {
    if (!uid.value) { throw new Error('Can not open in VSCode: no q available') }

    const path =  await (await getVSCodePath(uid.value)).text()

    fetch(`/__open-in-editor?file=${path}`)
  }

  return {
    source,
    refreshSource: loadSource,
    saveSource,
    openInVSCode,
  }
}
