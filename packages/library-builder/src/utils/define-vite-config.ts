import { type InlineConfig } from 'vite';

export const defineViteConfig = <T extends InlineConfig>(config: T) => {
  config.configFile = false
  config.logLevel = 'warn'
  return config;
}