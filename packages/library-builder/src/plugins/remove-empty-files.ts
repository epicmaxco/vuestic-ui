import { readFile, rm } from 'fs/promises';
import { readDirRecursive } from '../utils/read-dir-recursive'
import { defineVitePlugin } from '../utils/define-vite-plugin';
import { UserConfig } from 'vite'

export const removeEmptyFiles = () => {
  let config: UserConfig = {}

  return defineVitePlugin(({
    name: 'vuestic:remove-empty-files',
  
    config(config) {
      config = config
    },
  
    async buildEnd() {
      const outDir = config.build?.outDir

      if (!outDir) {
        return
      }

      await readDirRecursive(outDir).forEach(async (file) => {
        if (file.endsWith('.js')) {
          const content = await readFile(file).toString()
          if (content === '') {
            await rm(file)
          }
        }
      })
    }
  }))
}