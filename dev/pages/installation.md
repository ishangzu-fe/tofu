### npm安装
1. 配置好 Node.js 和 npm 环境，其中 npm 需要 <code>3.0</code> 或以上版本，node版本需要 <code>4.0</code> 以上。
2. 如果网络不是很理想，可以用国内镜像下载, 镜像配置：<code>npm install -g cnpm --registry=https://registry.npm.taobao.org</code>
3. 以下选择添加（如果墙外无法更新）

<highlight-code lang="javascript">
// operadriver 二进制包镜像
$ npm set operadriver_cdnurl http://cdn.npm.taobao.org/dist/operadriver
// chromedriver 二进制包镜像
$ npm set chromedriver_cdnurl http://cdn.npm.taobao.org/dist/chromedriver
// phantomjs 二进制包镜像
$ npm set phantomjs_cdnurl http://cdn.npm.taobao.org/dist/phantomjs
// fsevents 二进制包镜像
$ npm set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents
// node-sass 二进制包镜像
$ npm set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass
// electron 二进制包镜像
$ npm set electron_mirror http://cdn.npm.taobao.org/dist/electron/
</highlight-code>

### 开始使用
1. 安装模块：<code>npm install</code>
2. 启动开发模式：<code>npm run dev</code>
3. 启动生产模式：<code>npm run build</code>
