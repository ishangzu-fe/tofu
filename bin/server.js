require('./check-versions')()

const config = require('../config.js')
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let port = process.env.PORT || config.dev.port
const autoOpenBrowser = !!config.dev.autoOpenBrowser

const express = require('express')
const app = express()
const webpackConfig = require('./webpack.dev')
const compiler = require('webpack')(webpackConfig)
const opn = require('opn')
const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})

compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

// 处理代理配置
const proxyTable = config.dev.proxyTable
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options
        }
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())
app.use(devMiddleware)
app.use(hotMiddleware)

// 静态文件服务
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('static'))


var uri = 'http://localhost:' + port
devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + uri + '\n')
})

app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }

    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})
