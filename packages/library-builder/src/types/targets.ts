import { type LibraryFormat } from "./vite";

export type BuildTarget = (LibraryFormat | 'esm-node' | 'web-components' | 'types' | 'nuxt' | 'styles')
