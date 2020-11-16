import type { Configuration } from 'webpack'
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.prod.config')
const version = process.env.VERSION || require('../package.json').version
const isProd = process.env.NODE_ENV === 'production'

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'vuestic-ui.min.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'vuestic-ui.min.css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      // new TerserPlugin({
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true,
      // }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          postcssZindex: false,
          reduceIdents: false,
        },
        canPrint: false,
      }),

      //       new webpack.BannerPlugin({
//         banner: `/*!
// * Vuestic v${version}
// * Forged by John Leider
// * Released under the MIT License.
// */     `,
//         raw: true,
//         entryOnly: true,
//       }),
    ],
  },
} as Configuration)
