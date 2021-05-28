const merge = require('webpack-merge');
const webpack  = require('webpack');
const config = require('../config')
const baseConfig  = require('./webpack.base.conf.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
process.env.NODE_ENV = 'production'
const serveConfig = merge(baseConfig, {
  target: 'node',
  // mode: 'production',
  entry: './marketing/entry-ssr-server.js',
  output: {
    libraryTarget: 'commonjs2',
    path: config.build.assetsRoot,
    filename: 'server-bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  // 只打包dependencies配置 里面所依赖的包模块
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin()
  ]
});
console.log(serveConfig,"SERVERS")
module.exports = serveConfig