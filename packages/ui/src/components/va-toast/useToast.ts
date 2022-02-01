import { createToastInstance, closeById, closeAllNotifications, NotificationOptions } from './toast'
import { getCurrentInstance } from 'vue'

/** This hook can be used without plugin used */
export const useToast = () => {
  const appContext = getCurrentInstance()?.appContext

  const createdInThisSetupContext: string[] = []

  /**
   * @param options can be options object or message string
   */
  const init = (options: string | NotificationOptions) => {
    const id = createToastInstance(options, appContext)

    if (id) { createdInThisSetupContext.push(id) }

    return id
  }

  const close = (id: string) => closeById(id)

  /**
   * Closes all VaToast instances in current App instance.
   * @param allApps if you have multiple vue apps on page, set allApps to true to close it for all apps.
   */
  const closeAll = (allApps = false) => closeAllNotifications(allApps ? undefined : appContext)

  /** Use this method if you need to close only toasts that created with this hook */
  const closeAllCreatedInThisHook = () => {
    createdInThisSetupContext.forEach((id) => closeById(id))
  }

  return {
    init, close, closeAll, closeAllCreatedInThisHook,
  }
}
