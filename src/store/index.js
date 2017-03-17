import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';

import tabs from './modules/tabs';

Vue.use(Vuex);

const listener = store => {
    if(!sessionStorage){
        return;
    }
    store.subscribe((mutation,state) => {
        sessionStorage.setItem('state',JSON.stringify(state))
    });
}

export default new Vuex.Store({
    state:{
        dict:{}
    },
    modules:{
        tabs
    },
    actions,
    mutations,
    getters,
    plugins:[listener]
});

