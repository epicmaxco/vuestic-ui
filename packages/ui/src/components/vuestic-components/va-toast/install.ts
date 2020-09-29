import Vue from 'vue'
import Notification from './index'

declare module 'vue/types/vue' {
  interface Vue {
    $vaToast: Notification;
  }
}

export default {
  install (Vue: any) {
    Vue.prototype.$vaToast = new Notification()
  },
}
