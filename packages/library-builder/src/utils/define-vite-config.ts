import { type InlineConfig } from 'vite';

export const defineViteConfig = <T extends InlineConfig>(config: T) => {
  config.configFile = false
  config.logLevel = 'warn'
  config.appType = 'custom'
  config.build!.ssr = true

  return config;
}