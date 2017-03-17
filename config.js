const path = require('path')

module.exports = {
    devPort: 8080,
    devProxy: {
        // '/app_web_cheap': {
        //     target: 'http://192.168.0.76/app_web_cheap',
        //     changeOrigin: true,
        //     pathRewrite: function (path) {
        //         return path.replace('/app_web_cheap', '');
        //     }
        // }
    },
    zipPath: '/Users/wchen/Desktop/',
    root: '/app_service'
}
