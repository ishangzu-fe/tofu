require('./check-versions')()

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('./config')
var webpackConfig = require('./webpack.prod.conf')

const zipPath = config.build.zipPath;

/**
 * 打包结束后压缩成zip
 */
var fs = require('fs');
var archiver = require('archiver');
var cp = require('child_process');

var output = fs.createWriteStream(path.resolve(__dirname, '..', 'dist.zip'));
var archive = archiver('zip', {
    zlib: { level: 0 } // 压缩等级 1-9
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');

  // 将压缩好的zip文件移动到指定的路径
  if (zipPath) {
    cp.exec('mv dist.zip ' + path.relative(path.resolve(__dirname, '..'), zipPath), (err) => {
      if (err) console.error(err)
      else {
        console.log('请在' + zipPath + '查看zip文件')
      }
    })
  }
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    // 将打包好的文件压缩成压缩包
    archive.directory('./dist');
    archive.finalize();
  })
})
