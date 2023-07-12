import { readDirRecursive } from './../utils/read-dir-recursive';
import { defineViteConfig } from "../utils/define-vite-config";
import { replaceNext } from '../plugins/replace-next';

export const nuxtRuntimeDirViteConfig = (options: {
  entryDir: string,
  outDir: string
  external?: string[],
}) => {
  const inputs = readDirRecursive(options.entryDir)

  const { external = [], entryDir, outDir } = options

  return defineViteConfig({
    root: entryDir,

    build: {
      lib: {
        entry: inputs,
        formats: ['es'],
      },

      rollupOptions: {
        // Resolve externals and actual lib name
        external(source, importer, isResolved) {
          // Resolve '#app' imports
          if (source.startsWith('#')) {
            return true
          }

          if (source.includes('node_modules')) {
            return true
          }

          if (source.startsWith('/') || source.startsWith('.')) {
            return false
          }
          return true
        },
      },

      outDir: outDir,

      ssr: true,
    },

    optimizeDeps: {
      disabled: true,
    },

    plugins: [
      replaceNext,
    ]
  })
}