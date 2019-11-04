import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from "./router.js"
Vue.config.productionTip = false
import $conf from "./common/config/config.js"
import store from "./store"

Vue.prototype.$conf=$conf
new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app')
