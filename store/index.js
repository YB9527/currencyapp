
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);//vue的插件机制

import A from './module/A.js'
import B from './module/B.js'

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    modules: {
       a: A,
       b: B
     }
})
export default store