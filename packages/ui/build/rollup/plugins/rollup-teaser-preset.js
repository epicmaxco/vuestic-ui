import { terser } from 'rollup-plugin-terser'

export const terserPlugin = (options) => terser({
  ...options,
})
