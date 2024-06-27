import { Plugin } from 'vite'

export const defineVitePlugin = <T extends Plugin>(p: T): Plugin & T => p
