const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          sourceMap: true
        }
      })
    ],
    /*runtimeChunk: { name: 'vendor' },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /\.tsx?$/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }*/

    /*runtimeChunk: { name: 'vendor' },
    splitChunks: {
        cacheGroups: {
          default: false,
          commons: { //vendor
                test: /\.jsx?$/,
                name: "vendor",
                chunks: "all", //initial
                enforce: true,
                minSize: 1,
                minChunks: 2,
            }
        }
    }*/


    splitChunks: {
      cacheGroups: {
        commons: {
          test: /\.jsx?$/,
          name: 'vendor',
          chunks: "all",
          enforce: true,
          minSize: 1,
          minChunks: 2
        }
      }
    }
  },
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: true,
                sourcemap: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|__tests__)|(\.(test|spec)\.(tsx?|tsx?)$)/,
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new ExtractTextPlugin('index-[contenthash].css'),
    new webpack.LoaderOptionsPlugin({
      debug: false
    })
  ],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[hash].js',
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
  entry: {
    app: [require.resolve('./polyfills.js'), `./${conf.path.src('index')}`],
    vendor: Object.keys(pkg.dependencies)
  },
  node: {
    __dirname: true,
    __filename: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
