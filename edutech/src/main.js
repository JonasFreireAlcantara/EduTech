import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import VueApexCharts from 'vue-apexcharts'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import UUID from 'vue-uuid'
import store from './store'
import VueSimpleAlert from 'vue-simple-alert'
import './app.scss'
import GoogleAuth from './config/google_oAuth.js'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

const gauthOption = {
  client_id: '356262653651-hr7486q88tir6rulnbjmpnqt0qjj5l2o.apps.googleusercontent.com',
  scope: 'profile email https://www.googleapis.com/auth/calendar',
  prompt: 'select_account'
}

Vue.use(GoogleAuth, gauthOption)

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
