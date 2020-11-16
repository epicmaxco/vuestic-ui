import type { Configuration } from 'webpack'

require('dotenv').config()

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const scssLoaders = [
  // https://github.com/webpack-contrib/mini-css-extract-plugin#user-content-advanced-configuration-example
  // TODO: remove style-loader: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/34
  MiniCssExtractPlugin.loader,
  { loader: 'css-loader', options: { sourceMap: false } },
  { loader: 'postcss-loader', options: { sourceMap: false } },
  {
    loader: 'sass-loader',
    options: {
      implementation: require('sass'),
      sassOptions: {
        indentedSyntax: false,
      },
    },
  },
]

const plugins: Configuration['plugins'] = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true,
  }),
]

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts'],
  },
  // node: {
  //   fs: false
  // },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: scssLoaders,
      },
    ],
  },
  plugins,
  performance: {
    hints: false,
  },
  stats: { children: false },
} as Configuration
