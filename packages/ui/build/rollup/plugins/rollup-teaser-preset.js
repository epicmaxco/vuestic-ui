import { terser, Options } from 'rollup-plugin-terser'

/** @param { Options } options  */
export const terserPlugin = (options) => terser({
  keep_classnames: true,
  keep_fnames: true,
  ...options,
})
