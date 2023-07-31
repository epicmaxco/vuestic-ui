import { type Plugin } from 'vite';

export const defineVitePlugin = <T extends Plugin>(plugin: T) => {
  return plugin;
}