import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false


import Tool from '@/common/js/Tool.js'
Vue.prototype.$Tool = Tool;

import DicJson from '@/common/js/DicJson.js'
Vue.prototype.$DicJson = DicJson;

import Api from '@/api/api.js'
Vue.prototype.$Api = Api;

import sysApi from '@/api/sysApi.js'
Vue.prototype.$SysApi = sysApi;

import functionTool from '@/common/js/FunctionTool.js'
Vue.prototype.$FunctionTool = functionTool;

Vue.filter('dateTimeFilter',date=>{
	
	return Tool.dateTime2Str(date);
});

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  bind: function (el) {
    // 聚焦元素
    el.focus()
	console.log("focus")
  }
})



App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
