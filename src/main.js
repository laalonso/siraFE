import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import qs from 'qs';

 Vue.prototype.qs = qs;

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

Vue.use(require('vue-chartist'));
 
Vue.use(VueAxios, axios)
// Agregamos la URL base de nuestra API BACKEND de SIRA
axios.defaults.baseURL = 'http://3.137.167.134:8080/sira-login-master_war/';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
