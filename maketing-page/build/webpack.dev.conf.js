const path = require('path'); //node的路径模块
const config = require('../config/devServerConf.js') // devServer 配置
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(baseConfig,{
  devtool: '#source-map',
  devServer: {
    host: config.dev.host,
    hot: config.dev.hot,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    contentBase: path.resolve(__dirname,'../'),
    quiet: false,
    historyApiFallback: { // 兼容vue-router history模式
      disableDotRule: true,
      rewrites: [
        {
          from: /marketing-.*\.html/g,
          to: '/index.html'
        },
        {
          from: /.*/g,
          to: 'index.html'
        }
      ]
    },
    proxy: config.dev.proxyTable
  },
  plugins :[
    // 设置环境变量
    new webpack.DefinePlugin({  // 设置node 全局变量 判断当前build 环境
      'process.env': config.dev.env
    }),
     //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.dev.html',
      favicon: path.resolve('favicon.ico'),
      inject: true
    }),
  ]
})