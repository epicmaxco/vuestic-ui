module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
}

// module.exports = {
//   presets: [
//     ['@babel/preset-env', {
//       modules: false,
//     }],
//   ],
//   plugins: [
//     ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: true }],
//     ['@babel/plugin-proposal-optional-chaining', { loose: true }],
//   ],
//   env: {
//     test: {
//       presets: [
//         ['@babel/preset-env', {
//           targets: { node: true },
//           modules: 'commonjs',
//         }],
//         '@babel/preset-typescript',
//       ],
//       plugins: [
//         ['module-resolver', {
//           root: ['./src'],
//           alias: {
//             '~components': 'components',
//             '~directives': 'directives',
//             '~mixins': 'mixins',
//             '~scss': 'scss',
//             '~util': 'util',
//           },
//         }],
//       ],
//     },
//     es5: {
//       presets: ['@babel/preset-env'],
//     },
//     lib: {
//       presets: [
//         ['@babel/preset-env', {
//           targets: 'last 1 chrome version',
//           modules: false,
//         }],
//       ],
//     },
//   },
// }

// if (['lib', 'es5'].includes(env)) {
//   module.exports.plugins.push('./build/babel-transform-sass-paths.js')
// }
