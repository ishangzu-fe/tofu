var webpackConfig = require('./webpack.test.conf')
const puppeteer = require('puppeteer')
process.env.CHROME_BIN = puppeteer.executablePath()
// (async() => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
// })()

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['mocha'],
        reporters: ['spec', 'coverage'],
        files: ['./components/**/*.test.js'],
        preprocessors: {
            './components/**/*': ['webpack']
        },
        plugins: [
            require("karma-webpack"),
            require("karma-mocha"),
            require("karma-coverage"),
            require("karma-spec-reporter"),
            require('karma-chrome-launcher')
        ],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }
            ]
        }
    })
}