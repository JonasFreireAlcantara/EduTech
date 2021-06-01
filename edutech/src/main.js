import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VueApexCharts from 'vue-apexcharts'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import UUID from 'vue-uuid'
import store from './store'
import GoogleLogin from 'vue-google-login'
import VueSimpleAlert from 'vue-simple-alert'
import './app.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(GoogleLogin, {
  client_id: '621647520574-lm9unrl07tf1rphcs0pr5i399jtp14l1.apps.googleusercontent.com'
})

Vue.use(VueSimpleAlert)

Vue.use(UUID)

Vue.use(VueRouter)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
