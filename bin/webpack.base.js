var path = require('path')
var config = require('./config')
var vueLoaderConfig = require('./vue-loader.conf')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
    return path.posix.join(__dirname, '..', dir)
}

function getAssetsPath(_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    entry: {
        views: resolve('src/main.js'),
        // app: './frame/index.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            '@': resolve('src'),
            'http$': resolve('lib/services.js'),
            'core$': resolve('core/index.js'),
            'config$': resolve('config.js'),
            'views': resolve('src/views'),
            'portal': resolve('src/portal'),
            'services$': resolve('serc/services')
        }
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'style-loader!css-loader!sass-loader'
                    }
                }
            },
            // {
            //   test: /\.(css|scss)$/,
            //   use: ExtractTextPlugin.extract({
            //       fallback: 'style-loader',
            //       use: ['css-loader', 'sass-loader'] 
            //   })
            // },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js(x)*$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: getAssetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: getAssetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
