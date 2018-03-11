const conf = require('./gulp.conf');
const get = require('lodash/get');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConf = require('./webpack.conf');
const webpackBundler = webpack(webpackConf);

module.exports = function () {
  return {
    port: get(webpackConf, 'devServer.port', 3001),
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [
        webpackDevMiddleware(webpackBundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConf.output.publicPath,

          // Quiet verbose output in console
          quiet: true
        }),

        // bundler should be the same as above
        webpackHotMiddleware(webpackBundler)
      ]
    },
    open: true
  };
};
