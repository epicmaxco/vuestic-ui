import { existsSync, watch } from 'fs'
import { dirname } from 'path'

export const watchFileChangeOnce = (path: string, cb: () => void) => {
  if (!existsSync(path)) {
    const watcher = watch(dirname(path), { recursive: true }, (eventType, filename) => {
      if (filename === path) {
        cb()
      }

      watcher.close()
    })

    return
  }

  const watcher = watch(
    path,
    (eventType, filename) => {
      if (filename) {
        cb()
        watcher.close()
      }
    }
  )
}
