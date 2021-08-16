import { App } from 'vue'

export default {
  install (app: App) {
    app.config.globalProperties.$closeDropdown = function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let vm = this
      // Hide first parent dropdown.
      while ((vm = vm.$parent)) {
        const name = vm.$options.name
        if (name === 'VaDropdown') {
          vm.hide()
          break
        }
      }
    }
  },
}
