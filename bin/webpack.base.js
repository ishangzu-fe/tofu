const path = require('path');

function resolve(dir) {
    return path.posix.join(__dirname, '..', dir)
}

function getAssetsPath(_path, config) {
    var assetsSubDirectory = config.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

module.exports = function (config) {

    const env = JSON.parse(config.env.NODE_ENV)

    return {
        entry: {
            app: env == 'production' ? resolve('src/index.js') : resolve('src/dev/index.js'),
        },
        output: {
            path: resolve('dist'),
            filename: '[name].js',
            publicPath: config.assetsPublicPath
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.common.js',
                '@': resolve('src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'style-loader!css-loader!sass-loader'
                        }
                    }
                },
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
                        name: getAssetsPath('img/[name].[hash:7].[ext]', config)
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: getAssetsPath('fonts/[name].[hash:7].[ext]', config)
                    }
                }
            ]
        }
    }
}

