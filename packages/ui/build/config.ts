import type { Configuration } from 'webpack'

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const version = process.env.VERSION || require('../package.json').version
const isProd = process.env.NODE_ENV === 'production'
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')

require('dotenv').config()

const config = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'eval-cheap-module-source-map',
  entry: {
    app: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vuestic-ui.js',
    publicPath: '/dist/',
    library: 'VuesticUI',
    libraryTarget: 'umd',
    libraryExport: 'default',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({ clearConsole: true }),
    new MiniCssExtractPlugin({ filename: 'vuestic-ui.css' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    // }),
  ],
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      // { test: /\.m?js/, resolve: { fullySpecified: false } },
      {
        test: /\.js?$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        loader: 'babel-loader',
        options: {
          sourceType: 'unambiguous',
        },
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        rules: [
          {
            test: /\.scss$/,
            use: [
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
            ],
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        sourceMap: true,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
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

      new webpack.BannerPlugin({
        banner: `/*!
* Vuestic v${version}
* Released under the MIT License.
*/`,
        raw: true,
        entryOnly: true,
      }),
    ],
  },
  stats: { children: false },
} as Configuration

// eslint-disable-next-line
Object.defineProperty(RegExp.prototype, 'toJSON', {
  // eslint-disable-next-line
  value: RegExp.prototype.toString,
})

// console.log('config', JSON.stringify(config, null, 2))

module.exports = config
