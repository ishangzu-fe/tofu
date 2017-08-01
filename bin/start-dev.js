'use strict';

const path = require('path');
const fs = require('fs-extra');
const klaw = require('klaw');
const { Transform } = require('stream');

const devConfig = require('../dev/config');
const components = devConfig.components;

if (!Array.isArray(components))
    throw new Error('The field components in config must be Array.')

const resolve = (p) => {
    return path.resolve(__dirname, p);
}

const oldBasePath = resolve('../src/components');
const tempPath = resolve('../dev/temp');
const newPath = resolve('../dev/new');
const templatePath = resolve('../dev/view/template');

// 新建需要的文件夹
try {
    fs.ensureDirSync(tempPath);
    fs.ensureDirSync(newPath);
} catch (err) {
    throw err;
}

const createNewFiles = (name) => {
    const dest = path.join(newPath, name);


    try {
        if (fs.existsSync(dest)) return;

        fs.copySync(templatePath, dest);
    } catch (err) {
        throw err;
    }

    klaw(dest)
        .on('data', item => {
            if (item.stats.isFile()) {
                fs.createReadStream(item.path)
                    .pipe(new Transform({
                        transform (data, encoding, cb) {
                            let d = data.toString();
                            d = d.replace(/\%name\%/ig, name);
                            this.push(d);
                            cb();
                        }
                    }))
                    .pipe(fs.createWriteStream(item.path, { flags: 'r+' }))
            }

            if (item.path.indexOf('template') !== -1) {
                const newName = item.path.replace('template', name);
                fs.renameSync(item.path, newName);
            }

        })
        .on('error', err => {
            throw err;
        });
}

const writeAppFile = (components) => {
    const appPath = resolve('../dev/App.vue');

    let newImport = '// %new%';
    let oldImport = '// %old%';
    let newComponent = '// %new components%';
    let oldComponent = '// %old components%';

    components.forEach(name => {
        const upperC = name.replace(/\w/, '$&'.toUpperCase());
        const newC = `New${upperC}`;
        const oldC = `Old${upperC}`;
        newImport += `\nimport ${newC} from './new/${name}';`;
        oldImport += `\nimport ${oldC} from './temp/${name}';`;

        newComponent += `\n        ${newC},`;
        oldComponent += `\n        ${oldC},`;
    })

    const _d = [];
    const transform = new Transform({
        transform (data, encoding, cb) {
            _d.push(data);
            cb();
        },
        flush(cb) {
            let contents = Buffer.concat(_d);

            let d = contents.toString('utf-8');
            d = d.replace('// %new%', newImport);
            d = d.replace('// %old%', oldImport);
            d = d.replace('// %new components%', newComponent);
            d = d.replace('// %old components%', oldComponent);
            this.push(d);
            cb(null, d);
        }
    })

    fs.createReadStream(appPath)
        .pipe(transform)
        .pipe(fs.createWriteStream(appPath, { flags: 'r+' }))
}

components.forEach(component => {
    const src = path.join(oldBasePath, component);
    const dist = path.join(tempPath, component);

    if (!fs.existsSync(dist)) {
        try {
            fs.copySync(src, dist)
        } catch (err) {
            throw err;
        }
    }

    createNewFiles(component);
})

writeAppFile(components);
