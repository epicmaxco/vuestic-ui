import { getCurrentInstance } from 'vue'

export const useCurrentComponentId = () => {
  const instance = getCurrentInstance()!

  // WebComponents build
  if (!instance.appContext.app) {
    return String(instance.uid)
  }

  // Return ID with app, so it will be unique for each vue app
  return `${instance.appContext.app._uid}_${instance.uid}`
}
