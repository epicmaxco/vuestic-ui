import { App } from 'vue'
import Notification from '../index'

export const VaToastPlugin = {
  install (app: App) {
    app.config.globalProperties.$vaToast = new Notification(app)
  },
}
