import { existsSync } from 'fs';
import { rmSync, statSync } from 'fs';
import { defineViteConfig } from '../utils/define-vite-config'
import { readDirRecursive } from '../utils/read-dir-recursive'
import { dirname, join, } from 'pathe'
import { strictResolve } from '../utils/strict-resolve';

export const createStylesViteConfig = (options: {
  cwd: string,
  entry: string,
  outDir: string,
}) => {
  const { cwd, entry, outDir } = options

  const entryDir = strictResolve(cwd, dirname(entry), 'styles')

  if (!entryDir) {
    console.log('Skipping building styles, because styles directory does not exist')
    return
  }

  const cssInputs = readDirRecursive(entryDir)
    .filter((el) => ['.css', '.scss']
    .some((elem) => el.includes(elem) && !el.includes('/_')))

  return defineViteConfig({
    resolve: {
      alias: {
        '@': join(cwd, 'src'),
        '~/': join(cwd, 'src'),
      },
    },
  
    build: {
      outDir: join(cwd, outDir, 'styles'),
  
      assetsDir: './',
  
      rollupOptions: {
        input: [...cssInputs],
  
        output: {
          assetFileNames: '[name].[ext]',
        },
      },

      ssr: false,
    },

    plugins: [{
      name: 'vuestic:remove-js-styles',
      enforce: 'post',
      closeBundle() {
        if (!existsSync(join(cwd, outDir, 'styles'))) {
          return
        }

        readDirRecursive(join(cwd, outDir, 'styles'))
          .forEach((file: string) => statSync(file).size <= 1 && rmSync(file))
      },
    }]
  })
}
