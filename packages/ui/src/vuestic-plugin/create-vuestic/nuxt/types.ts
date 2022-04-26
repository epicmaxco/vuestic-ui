import type { App } from 'vue'

type NuxtPlugin = (context: { vueApp: App }) => any

export const defineNuxtPlugin = (plugin: NuxtPlugin) => plugin
