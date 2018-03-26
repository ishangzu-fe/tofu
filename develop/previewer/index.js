import Vue from 'vue';
import Previewer from './src/previewer';

const div = document.createElement('div');
document.body.appendChild(div);

const P = Vue.extend(Previewer);
const instance = new P({ el: div })

Previewer.install = (Ctor) => {
    Ctor.prototype.$preview = instance.preview;
}

export default Previewer;
