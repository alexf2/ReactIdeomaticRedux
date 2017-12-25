const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FailPlugin = require('webpack-fail-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'tslint-loader',
            options: {configuration: require('../tslint.json')}
          }
        ],
        enforce: 'pre'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',          
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer({
                browsers: ['last 2 versions', 'IE > 10', 'ios_saf >= 8', 'chrome >= 49', 'firefox >= 49', 'edge >= 12', '> 1%'],
                cascade: true,
                remove: true
              })]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader/webpack',
          {
            loader: 'ts-loader',
            options: {configFile: 'tsconfig.json'}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    FailPlugin,
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js'
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    `./${conf.path.src('index')}`
  ]
};
