const gulp = require('gulp')
const get = require('lodash/get')
const gutil = require('gulp-util')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const webpackConf = require('../conf/webpack.conf')
const webpackDistConf = require('../conf/webpack-dist.conf')
const gulpConf = require('../conf/gulp.conf')

const CompileMode = Object.freeze({
  Compile: 0,
  CompileAndWatch: 1,
  CompileUsingDevServer: 2
});

gulp.task('webpack:light', done => {
  webpackCompile(CompileMode.CompileUsingDevServer, webpackConf, done)
})

gulp.task('webpack:watch', done => {
  webpackCompile(CompileMode.CompileAndWatch, webpackConf, done)
})

gulp.task('webpack:dist', done => {
  process.env.NODE_ENV = 'production'
  webpackCompile(CompileMode.Compile, webpackDistConf, done)
})

let srv;

function webpackCompile(mode, conf, done) {
  const webpackChangeHandler = (err, stats) => {
    if (err)
      gulpConf.errorHandler('Webpack')(err)

    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));

    if (done) { // Execute callback once
      done()
      done = null
  }
}

  switch (mode) {
    case CompileMode.CompileAndWatch:
      webpack(conf).watch(200, webpackChangeHandler)
      break;

    case CompileMode.CompileUsingDevServer: {
      const webpackBundler = webpack(conf, webpackChangeHandler)
      srv = new WebpackDevServer(webpackBundler, conf.devServer).listen(get(conf, 'devServer.port', 3001), err => {
        if (err)
          gulpConf.errorHandler('WebpackDevServer')(err)

          if (done) { // Execute callback once
            done()
            done = null
          }
      })
      break;
    }

    default:
      webpack(conf).run(webpackChangeHandler);
  }
};
