import message from './index'
import { NotificationInterface } from './types'

declare module 'vue/types/vue' {
  interface Vue {
    $message: NotificationInterface;
  }
}

export default {
  install (Vue: any) {
    Vue.prototype.$message = message
  },
}
