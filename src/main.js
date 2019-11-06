import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router.js"
Vue.config.productionTip = false
//引入全局配置文件
import $conf from "./common/config/config.js"
import store from "./store"

//引入拖拽排序
import VueDND from "awe-dnd"
Vue.use(VueDND)

Vue.prototype.$conf=$conf
new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
