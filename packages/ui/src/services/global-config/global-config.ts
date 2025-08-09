import { getCurrentInstance } from 'vue'
import { getCurrentApp } from '../current-app'

export const GLOBAL_CONFIG = Symbol('GLOBAL_CONFIG')

export const provideForCurrentApp = <T>(provide: T) => {
  const provides = getCurrentInstance()?.appContext.provides || getCurrentApp()?._context.provides

  if (!provides) { throw new Error('Vue app not found for provide') }

  provides[GLOBAL_CONFIG] = provide

  return provide
}

export * from './types'
