const express = require('express')
const fs = require('fs')
const path = require('path')
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)
const jsdom = require('jsdom')
const { JSDOM } = jsdom

/* 模拟window对象逻辑 */
const resourceLoader = new jsdom.ResourceLoader({
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
});// 设置UA
const dom = new JSDOM('', {
  url:'https://app.nihaoshijie.com.cn/index.html',
  resources: resourceLoader
});
 
global.window = dom.window
global.document = window.document
global.navigator = window.navigator
window.nodeis = true //给window标识出node环境的标志位

const clientBundle = require('./distMarket/vue-ssr-client-manifest.json') // 客户端 bundle
const serverBundle = require('./distMarket/vue-ssr-server-bundle.json')   // 服务的 bundle
const template = fs.readFileSync(resolve('./distMarket/index.html'), 'utf-8')  // 渲染模板
 
let renderer

  // 生成服务端渲染函数
function createRenderer (serverbundle ,template) {
  // 生成服务端渲染函数
  return createBundleRenderer(serverbundle, {
    // 推荐
    runInNewContext: false,
    // 模板html文件
    template: template,
    // client manifest
    // clientManifest: clientBundles
  })
}

// const serve = (path, cache) => express.static(resolve(path), { // 静态资源设置缓存
//   maxAge: cache ? 60 * 60 * 24 * 30 : 0 
// })

// require('./build/webpack-setup-sever')(server, (bundle, template) => {
//   renderer = createRenderer(bundle, template)  
// })
server.use(express.static('./distMarket'));
renderer = createRenderer(serverBundle, template)

// 
function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

server.get('*',async(req, res) => {
  console.log(req.url)
  // if(req.url.indexOf("/favicon.ico") ===-1){
  //      res.end();
  // }
  // 未渲染好返回
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }
  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404')
    } else {
      res.status(500).send('500')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }
 try {
    res.setHeader('Content-Type', 'text/html')
    const context = { title: 'SSR我来啦', url: req.url  }
    const html = await renderToString(context)
    res.send(html)
  } catch (error) {
    handleError(error)
  }
}) 
server.listen(8022, () => {
  console.log('访问：http://127.0.0.1:8022');
});









