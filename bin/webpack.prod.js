const path = require('path');
const webpack = require('webpack');
const config = require('../config').build;
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base')(config);
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const env = config.env

function getAssetsPath(_path) {
    var assetsSubDirectory = config.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

const webpackConfig = merge(baseWebpackConfig, {
    devtool: config.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.assetsRoot,
        filename: getAssetsPath('[name].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        // new CopyWebpackPlugin([{
        //     from: path.resolve(process.cwd(), 'static'),
        //     to: config.assetsSubDirectory,
        //     ignore: ['.*']
        // }])
    ]
})

if (config.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.analysis) {
    webpackConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
            reportFilename: 'report.html',
            defaultSizes: 'parsed',
            openAnalyzer: true,
            generateStatsFile: false,
            statsFilename: 'stats.json',
            statsOptions: null,
            logLevel: 'info'
        })
    )
}

module.exports = webpackConfig