
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 引入 store 实例
import store from './store'
// 从 @escook/request-miniprogram 模块 引入 $http对象  用来发请求 类似axios
import {$http} from '@escook/request-miniprogram'

//设置请求的基地址
$http.baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
//设置请求拦截器 显示loading提示
$http.beforeRequest=function(){
	uni.showLoading({
		title:"加载中..."
	})
}
//设置响应拦截器 关闭loading提示
$http.afterRequest =function(){
	uni.hideLoading()
}
// 在 全局uni对象(类似原生js的window对象)上挂载 $http
uni.$http = $http

//封装一个showMsg提示方法
uni.$showMsg = function(title='数据请求失败',duration=1500){
	uni.showToast({
		title,
		duration
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif