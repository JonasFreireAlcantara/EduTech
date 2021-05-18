import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VueApexCharts from 'vue-apexcharts'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import UUID from 'vue-uuid'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(UUID)

Vue.use(VueRouter)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
