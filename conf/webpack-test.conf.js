const webpack = require('webpack');
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
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {configFile: 'tsconfig.json'}
          }
        ]
      } 
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],  
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts',
      '.tsx'
    ] 
  },
  externals: {
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': 'true',
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  }
};
