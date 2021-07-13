import typescriptPlugin from 'rollup-plugin-typescript'
import typescript from 'typescript'
import multiInput from 'rollup-plugin-multi-input'
import vuePlugin from 'rollup-plugin-vue'
import scssPlugin from 'rollup-plugin-scss'
import nodeResolvePlugin from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: ['./src/components/vuestic-components/va-*/index.ts'],
  output: {
    format: 'esm',
    dir: 'dist/esm',
  },
  plugins: [
    commonjs(), typescriptPlugin({ typescript }), multiInput(), scssPlugin({ output: 'dist/esm/vuestic-ui.css' }), vuePlugin(),
  ],
  external: ['vue'],
}
