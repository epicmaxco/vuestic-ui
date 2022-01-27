import { App } from 'vue'
import { createToastInstance, closeById, closeAllNotifications, NotificationOptions } from './toast'

export default {
  install (app: App) {
    app.config.globalProperties.$vaToast = {
      /** Returns toast instance id */
      init (options: NotificationOptions) {
        return createToastInstance(options, app?._context)
      },

      close (id: string) {
        closeById(id)
      },

      closeAll () {
        closeAllNotifications(app?._context)
      },
    }
  },
}
