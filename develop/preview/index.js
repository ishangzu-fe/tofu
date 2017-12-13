import Vue from 'vue';
import Preview from './src/preview';

const div = document.createElement('div');
document.body.appendChild(div);

const P = Vue.extend(Preview);
const instance = new P({ el: div });

Preview.install = (Ctor) => {
    Ctor.prototype.$preview = instance.preview;
}

export default Preview;