import { terser } from 'rollup-plugin-terser'

export const terserPlugin = (options) => terser({
  keep_classnames: true,
  keep_fnames: true,
  ...options,
})
