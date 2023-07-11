import { type UserConfig } from 'vite';

export const defineViteConfig = <T extends UserConfig>(config: T) => {
  return config;
}