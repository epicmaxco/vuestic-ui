
import yargs from "yargs";

export const args = yargs(process.argv)
  .option('es', {
    type: 'boolean',
    description: 'Builds the library in ES format',
    default: true,
  })
  .option('cjs', {
    type: 'boolean',
    description: 'Builds the library in CommonJS format',
    default: true,
  })
  .option('iife', {
    type: 'boolean',
    description: 'Builds the library in IIFE format',
    default: true,
  })
  .option('es-node', {
    type: 'boolean',
    description: 'Builds the library in ES Node format (Optimized for SSR)',
    default: true,
  })
  .option('web-components', {
    type: 'boolean',
    description: 'Builds the library in Web Components format',
    default: true,
  })
  .option('nuxt', {
    type: 'boolean',
    description: 'Builds the nuxt module',
    default: true,
  })
  .option('meta', {
    type: 'boolean',
    description: 'Builds package meta',
    default: true,
  })
  .option('types', {
    type: 'boolean',
    description: 'Builds types',
    default: true,
  })
  .option('styles', {
    type: 'boolean',
    description: 'Builds /styles folder',
    default: true,
  })
  .option('entry', {
    type: 'string',
    description: 'Entry point of the library',
    default: 'src/main.ts',
  })
  .option('nuxtDir', {
    type: 'string',
    description: 'Directory of the nuxt module',
  })
  .option('outDir', {
    type: 'string',
    description: 'Output directory of the library',
    default: 'dist',
  })
  .help(true)
  .parseSync()
