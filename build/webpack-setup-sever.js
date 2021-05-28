const path = require('path')
const webpack = require('webpack')
const MFS = require('memory-fs')
const clientConfig = require('./webpack.prod.conf')
const serverConfig = require('./webpack.server.conf')

module.exports = function setupDevServer (app, cb) {
  let bundle
  let template

  // 修改客户端配置添加 热更新中间件
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.clinet]
  clientConfig.output.filename = '[name].js'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  // DEV Middleware
  const clientCompiler = webpack(clientConfig) // 执行webpack
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  })
  app.use(devMiddleware)

  clientCompiler.plugin('done', () => {
    const fs = devMiddleware.fileSystem
    console.log(fs,'fsfsfsfsfs')
    const filePath = path.join(clientConfig.output.path, 'index.ssr.html') // 模板为打包后的html文件
    console.log(filePath,'filePath--------------------------------------')
    if (fs.existsSync(filePath)) {
      template = fs.readFileSync(filePath, 'utf-8')   
      if (bundle) {
        cb(bundle, template)
      }
    }
  })

  // HOT Middleware
  app.use(require('webpack-hot-middleware')(clientCompiler))

  // 监听 server renderer
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS() // 内存文件系统，在JavaScript对象中保存数据。
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))

    // 读取使用vue-ssr-webpack-plugin生成的bundle（vue-ssr-bundle.json）
    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    console.log(bundlePath, 'path')
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log(333333333333333333333333333333333333333)
    if (template) {
      console.log(2222222222)
      cb(bundle, template)
    }
  })
}