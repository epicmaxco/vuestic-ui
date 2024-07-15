import { type GlobalConfig } from "vuestic-ui"
import { ref, computed, App } from 'vue'

const useApp = () => {
  const app = document.querySelector('#app')

  if (!app) { throw new Error('VuesticDevtools: App element not found when accessing Vuestic Config') }

  const vueApp = ref<App>()

  const tryGetVueApp = () => {
    vueApp.value = (app as any).__vue_app__

    if (!vueApp.value) {
      requestAnimationFrame(tryGetVueApp)
    } else {

    }
  }

  tryGetVueApp()

  return vueApp
}

export const useAppVuesticConfig = () => {
  const vueApp = useApp()

  return computed(() => {
    return vueApp.value?.config.globalProperties.$vaConfig.globalConfig as unknown as GlobalConfig
  })
}
