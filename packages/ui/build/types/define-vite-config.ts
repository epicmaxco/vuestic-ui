import { UserConfig, Plugin } from 'vite'

export const defineViteConfig = <T extends UserConfig>(p: T): UserConfig & T => p
