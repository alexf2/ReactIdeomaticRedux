const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')

/*
//root dir
console.log(process.cwd());

//file dir
console.log(__dirname);
*/

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|__tests__)|(\.(test|spec)\.(tsx?|jsx?)$)/,
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
        test: /\.tsx?$/,
        exclude: /(node_modules|__tests__)|(\.(test|spec)\.(tsx?|jsx?)$)/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {configFile: require.resolve('../tsconfig-cli.json')}
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // See https://github.com/facebookincubator/create-react-app/issues/186
    // new WatchMissingNodeModulesPlugin(path.join(process.cwd(), 'node_modules'))
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: 'index.js',
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.jsx',
      '.ts',
      '.tsx'
    ]
  },
  entry: [
    //'react-hot-loader/patch',
    'webpack/hot/dev-server',
     'webpack-hot-middleware/client',
    /*'webpack-dev-server/client',
    'webpack/hot/only-dev-server',*/
    require.resolve('./polyfills.js'),
    `./${conf.path.src('index')}`
  ],
  node: {
    __dirname: true,
    __filename: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  devServer: {
    contentBase: conf.paths.tmp,
    publicPath: '/',
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    quiet: false,
    inline: true,
    open: true,
    openPage: '',
    stats: {
      colors: true,
      hash: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false,
      moduleTrace: false,
      assets: true,
      version: true,
      reasons: true,
      errorDetails: true
    }
  }
};
