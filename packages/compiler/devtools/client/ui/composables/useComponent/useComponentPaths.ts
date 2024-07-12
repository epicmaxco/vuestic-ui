import { type Ref, computed, ref, watch } from 'vue'
import { PREFIX } from '../../../../shared/CONST';

import { getFileName } from './api'

export const getElementMinfiedPaths = (htmlElement: HTMLElement | null) => {
  if (!htmlElement) { return null }

  return Object.keys(htmlElement.dataset)
    .filter((key) => key.startsWith(`${PREFIX}-`))
}

export const useComponentPaths = (htmlElement: Ref<HTMLElement | null>) => {
  const minifiedPaths = computed(() => getElementMinfiedPaths(htmlElement.value))

  const paths = ref<{
    path: string,
    minified: string
  }[]>()

  watch(minifiedPaths, async (minifiedPaths) => {
    if (!minifiedPaths) { return }

    paths.value = await Promise.all(minifiedPaths.map(async (minifiedPath) => {
      return {
        path: await (await getFileName(minifiedPath)).text(),
        minified: minifiedPath,
      }
    }))
  })

  return paths
}