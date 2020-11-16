import { Configuration } from 'webpack'

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const resolve = (file: string) => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/main.ts',
  },
  output: {
    path: resolve('../dist'),
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
  module: {
    rules: [
      { test: /\.m?js/, resolve: { fullySpecified: false } },
      {
        test: /\.js?$/,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        loader: 'babel-loader',
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: [
        //       ['@babel/preset-env', { targets: 'defaults' }]
        //     ]
        //   }
        // }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     'vue-style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },
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
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static'
    // }),
  ],
} as Configuration)
