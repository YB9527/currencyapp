import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false

import my_link from '@/components/my/my_link';
Vue.component('myLink', my_link);

import my_form_item from '@/components/my/form/my_form_item';
Vue.component('myFormItem', my_form_item);

/* 全局工具 */
import * as Checker from '@/common/js/Checker.js'
Vue.prototype.$Checker = Checker;



import  DicJson from '@/common/js/DicJson.js'
Vue.prototype.$DicJson = DicJson;

import * as  functionTool from '@/common/js/FunctionTool.js'
Vue.prototype.$FunctionTool = functionTool;

import $Router from '@/router/Router.js';
Vue.prototype.$Router = $Router;

import * as Tool from '@/common/js/Tool.js'
Vue.prototype.$Tool = Tool;

import * as UniTool from '@/common/js/UniTool.js'
Vue.prototype.$UniTool = UniTool;

/* 全局api */
import  Api from '@/api/Api.js'
Vue.prototype.$Api =new  Api();

import  SysApi from '@/api/SysApi.js'
Vue.prototype.$SysApi =new  SysApi();


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
