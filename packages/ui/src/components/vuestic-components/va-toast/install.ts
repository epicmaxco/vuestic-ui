import Notification from './index'

export default {
  install (Vue: any) {
    Vue.prototype.$vaToast = new Notification()
  },
}
