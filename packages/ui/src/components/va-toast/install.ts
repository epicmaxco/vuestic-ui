import { App } from 'vue'
import Notification from './index'

export default {
  install (app: App) {
    app.config.globalProperties.$vaToast = new Notification(app)
  },
}
