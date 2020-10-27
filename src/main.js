// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"

import 'element-ui/lib/theme-chalk/index.css'
import "./assets/css/reset.css"

import http from "./utils/http"

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import API from "./API"
Vue.prototype.$api=API

import qs from "qs"
Vue.prototype.$qs=qs

Vue.prototype.$http=http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
