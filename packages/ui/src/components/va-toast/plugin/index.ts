import { App, ref } from 'vue'
import { defineVuesticPlugin, defineGlobalProperty } from '../../../vuestic-plugin/utils'
import { createToastInstance, closeById, closeAllNotifications, NotificationOptions } from '../toast'

const createVaToastPlugin = (app: App) => ({
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
})

export const VaToastPlugin = defineVuesticPlugin(() => ({
  install (app) {
    defineGlobalProperty(app, '$vaToast', createVaToastPlugin(app))
  },
}))

declare module 'vue' {
  export interface ComponentCustomProperties {
    $vaToast: ReturnType<typeof createVaToastPlugin>
  }
}
