import { ComputedRef } from 'vue'

export const TabsViewKey = Symbol('TabsView')
export const TabKey = Symbol('Tab')
export const TabsServiceKey = Symbol('TabsService')

export type ClassComputed = {
  [prop: string]: boolean
}

export type ComputedStyle = {
  [prop: string]: string | ComputedRef<string> | undefined
}
