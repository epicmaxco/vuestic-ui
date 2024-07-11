import { ref, computed, watch, Ref } from 'vue';
import { API_PREFIX, PREFIX } from '../../../../shared/CONST';
import { prettify } from '../../../parser/prittyfy'
import { useComponentPaths } from './useComponentPaths'
import { getNodeSource, setNodeSource } from './api';

export const useComponentSource = (htmlElement: Ref<HTMLElement | null>) => {
  /** @notice Source is async and may not be available until loaded */
  const source = ref<string | null>(null)

  const paths = useComponentPaths(htmlElement)

  const selectedPathIndex = ref(0)

  const q = computed(() => {
    return paths.value?.[selectedPathIndex.value]
  })

  const resetSource = () => {
    source.value = null
  }

  const loadSource = async () => {
    if (!htmlElement.value) { return resetSource() }
    if (!(PREFIX in htmlElement.value.dataset)) { return resetSource() }

    if (!q.value) {
      throw new Error('Can not load source: no q available')
    }

    const response = await getNodeSource(q.value.minified)
    source.value = prettify(await response.text())
  }

  const saveSource = async (source: string) => {
    if (!q.value) { throw new Error('Can not save source: no q available') }

    await setNodeSource(q.value.minified, source)

    await loadSource()
  }

  watch(q, async () => {
    loadSource()
  }, { immediate: true })

  return {
    source,
    refreshSource: loadSource,
    saveSource,
    q,
    paths,
    selectedPath: computed({
      get() { return paths.value?.[selectedPathIndex.value] },
      set(v) {
        if (!paths.value) { return }

        if (v === undefined) { 
          selectedPathIndex.value = -1
          return
        }
        selectedPathIndex.value = paths.value.indexOf(v)
      }
    }),
  }
}
