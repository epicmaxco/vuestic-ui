import { App } from 'vue'
import { createToastInstance, closeById, closeAllNotifications, NotificationOptions } from '../toast'

export const VaToastPlugin = {
  install (app: App) {
    app.config.globalProperties.$vaToast = {
      /** Returns toast instance id */
      init (options: string | NotificationOptions) {
        return createToastInstance(options, app?._context)
      },

      close (id: string) {
        closeById(id)
      },

      closeAll (allApps = false) {
        closeAllNotifications(allApps ? undefined : app?._context)
      },
    }
  },
}
