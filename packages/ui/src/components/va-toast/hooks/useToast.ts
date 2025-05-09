import { createToastInstance, closeById, closeAllNotifications, NotificationOptions } from '../toast'
import { useAppContext } from '../../../composables/std/internal/useAppContext'

/** This hook can be used without plugin used */
export const useToast = () => {
  const appContext = useAppContext()

  const createdInThisSetupContext: string[] = []

  /**
   * @param options can be options object or message string
   */
  const notify = (options: string | NotificationOptions) => {
    const id = createToastInstance(options, appContext.value)

    if (id) { createdInThisSetupContext.push(id) }

    return id
  }

  /**
   * @deprecated Use `notify` instead
  */
  const init = (options: string | NotificationOptions) => {
    return notify(options)
  }

  const close = (id: string) => closeById(id)

  /**
   * Closes all VaToast instances in current App instance.
   * @param allApps if you have multiple vue apps on page, set allApps to true to close it for all apps.
   */
  const closeAll = (allApps = false) => closeAllNotifications(allApps ? undefined : appContext.value)

  /** Use this method if you need to close only toasts that created with this hook */
  const closeAllCreatedInThisHook = () => {
    createdInThisSetupContext.forEach((id) => closeById(id))
  }

  return {
    init, notify, close, closeAll, closeAllCreatedInThisHook,
  }
}
