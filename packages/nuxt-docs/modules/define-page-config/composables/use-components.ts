import { addComponent, useNuxt } from '@nuxt/kit';
import { resolve } from 'pathe'

const COMPONENT_PATH = 'compiler/blocks/index.vue'

const componentPath = resolve(__dirname, '..', COMPONENT_PATH)

export const useComponents = () => {
  addComponent({
    name: 'PageConfig',
    filePath: componentPath
  })
}