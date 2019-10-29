const contextConfigStorageKey = '$ContextConfig';


export const makeContextPluginOptions = () => {
  const defaultOptions = { VaBadge: { color: 'danger', label: 'badge' } }

  const localStorageOptions = window.localStorage.getItem(contextConfigStorageKey)

  if (localStorageOptions) {
    return JSON.parse(localStorageOptions)
  }

  return defaultOptions
}


export const setInStorageContextPluginOptions = (value) => {
  if (window && window.localStorage) {
    window.localStorage.setItem(contextConfigStorageKey, JSON.stringify(value))
  }

  return null
}

export const clearStorageContextPluginOptions = () => {
  if (window && window.localStorage) {
    window.localStorage.clear()
  }

  return null
}
