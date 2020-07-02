import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import StorageService from './services/storage.service'
import CurrencyFormatterService from './services/currencyFormatter.service'
import Notifications from 'vue-notification'
import AlertService from './services/alert.service'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false
Vue.prototype.$storage = StorageService;
Vue.prototype.$currenctFormatter = CurrencyFormatterService;
Vue.prototype.$alerts = AlertService; 

Vue.use(Notifications);
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
