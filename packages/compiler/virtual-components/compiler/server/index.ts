import { watch } from 'node:fs'

export const sourceFilesServer = (config: {
  root: string
}) => {

  async function watchRoot(onChange: (path: string) => void) {
    const watcher = watch(config.root, { recursive: true })

  }

}
