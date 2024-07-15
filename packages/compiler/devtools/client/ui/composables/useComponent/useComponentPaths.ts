import { type Ref, computed, ref, watch } from 'vue'
import { PREFIX } from '../../../../shared/CONST';

import { getFileName } from './api'

export const getElementMinifiedPaths = (htmlElement: HTMLElement | null) => {
  if (!htmlElement) { return null }

  return Object.keys(htmlElement.dataset)
    .filter((key) => key.startsWith(`${PREFIX}-`))
}

export const useComponentPaths = (htmlElement: Ref<HTMLElement | null>) => {
  const minifiedPaths = computed(() => getElementMinifiedPaths(htmlElement.value))

  const paths = ref<{
    path: string,
    minified: string
    tagName: string
  }[]>()

  watch(minifiedPaths, async (minifiedPaths) => {
    if (!minifiedPaths) { return }

    paths.value = await Promise.all(minifiedPaths.map(async (minifiedPath) => {
      return {
        path: await (await getFileName(minifiedPath)).text(),
        minified: minifiedPath,
        tagName: htmlElement.value!.dataset[minifiedPath]!
      }
    }))
  })

  return paths
}
