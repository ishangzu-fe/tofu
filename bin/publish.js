const { execSync } = require('child_process')

const registry = execSync('npm config get registry', {
    encoding: 'utf-8'
})
if (!~registry.indexOf('https://registry.npmjs.org')) {
    throw new Error(`仓库地址设置错误，当前仓库为：${registry}`)
}
const isWorkingTreeClean = !execSync('git status --porcelain', { encoding: 'utf-8' })
    .trim()
    .split('\n')
    .filter((line) => {
        return line.trim() && !line.match(/^\?\? /)
    }).map((line) => {
        return line.trim()
    }).length

if (!isWorkingTreeClean) throw new Error('请先提交未提交的内容')

const packageJSON = require('../package.json')
const semver = require('semver')
const inquirer = require('inquirer')
const { version } = packageJSON
const { argv } = process

let newVersion = ''
if (argv.length === 3) {
    if (!semver.valid(argv[2])) {
        newVersion = semver.inc(version, 'prerelease', argv[2])
    } else {
        newVersion = argv[2]
    }
} else if (argv.length >= 4 && argv[2] === '--') {
    newVersion = semver.inc(version, ...argv.slice(3))
} else {
    newVersion = semver.inc(version, 'patch')
}

inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    message: `确定发布版本 v${newVersion} 吗？`
}).then(res => {
    if (res.confirm) execSync(`npm version ${newVersion} --allow-same-version && npm publish`)
}).catch(_ => {})
