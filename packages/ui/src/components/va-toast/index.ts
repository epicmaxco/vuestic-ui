import { createToastInstance, closeById, closeAllNotifications } from './toast'
import { NotificationOptions } from './types'
import { App } from 'vue'

class Notification {
  app: App;

  constructor (app: App) {
    this.app = app
  }

  /** Returns toast instance id */
  init (options: NotificationOptions) {
    return createToastInstance(options, this.app?._context)
  }

  close (id: string) {
    closeById(id)
  }

  closeAll () {
    closeAllNotifications()
  }
}

export default Notification
