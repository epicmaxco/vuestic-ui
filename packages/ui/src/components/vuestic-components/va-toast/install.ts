import Notification from './index'
// import { NotificationInterface } from './types'

// declare module 'vue/types/vue' {
//   interface Vue {
//     $vaToast: NotificationInterface;
//   }
// }

export default {
  install (Vue: any) {
    Vue.prototype.$vaToast = new Notification()
  },
}
