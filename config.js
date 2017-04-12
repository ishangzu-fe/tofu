const path = require('path');

module.exports = {
    dev: {
        env: { NODE_ENV: '"development"' },
        port: 8081,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    },
    build: {
        env: { NODE_ENV: '"production"' },
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, './dist'),
        assetsSubDirectory: './',
        assetsPublicPath: '/',
        productionSourceMap: true,
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
    }
}