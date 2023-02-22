import { resolve } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs'

import scss from 'rollup-plugin-scss'

export default {
  input: resolve(__dirname, 'src/styles/index.scss'),
  plugins: [
    scss({
      name: 'ag-theme-vuestic',
      fileName: 'ag-theme-vuestic.css',
      sass: require('sass'),
      failOnError: true,
      outputStyle: 'compressed',
      output: (styles) => {
        if (!existsSync('./dist')) {
          mkdirSync('./dist')
        }

        writeFileSync('./dist/ag-theme-vuestic.css', styles)
      }
    })
  ],
}
