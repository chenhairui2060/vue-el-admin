# vue-el-admin

# 1.安装vue  
```shell
	$ npm install -g @vue/cli
````
# 2.创建项目
```shell
	$ vue create vue-el-admin
```
##6.安装vuex
```
	npm install vuex --save、
	src目录底下新建store目录
	1.store目录底下新建index.js
	import Vue from 'vue'
	import Vuex from 'vuex'
	Vue.use(Vuex)
	export default new Vuex.Store({
		state:{
			
		},
		mutations:{
			
		}
	})
	2.新建modules目录//模块化
	3.在main.js里面引用vuex
```
## 3.跑项目
```shell
  $ npm run serve
```
## 4.安装element
```
  $ vue add element
```
## 5.安装vue-router
```
  1.$ npm install vue-router --save
  2.在src新建router.js
  3.在main.js 引入import router from "./router.js"
  main.js里面：
	import Vue from 'vue'
	import App from './App.vue'
	import './plugins/element.js'
	import router from "./router.js"
	Vue.config.productionTip = false

	new Vue({
	router,
	render: h => h(App),
	}).$mount('#app')
	router.js里面
	import Vue from "vue"
	import Router from "vue-router"

	Vue.use(Router)
	import layout from "./views/layout.vue"

	export default new Router({
		routes:[
			{
				path:'/',
				name:'layout',
				component:layout
			}
		]
	})
```
##6.安装拖拽排序
```
$ npm install awe-dnd --save
	//main.js
	import VueDND from 'awe-dnd'
	Vue.use(VueDND)
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
