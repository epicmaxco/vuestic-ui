export * from './components'

import * as components from './components'

export const createLibraryPlugin = () => {
  return {
    install: (app: any) => {
      // Register components
      Object.keys(components).forEach((key) => {
        app.component(`Lib${key}`, components[key as keyof typeof components])
      })
    }
  }
}