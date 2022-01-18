import Vue from 'vue'
import App from './App.vue'
import router from './router';
import VDatePicker from 'v-calendar';

Vue.config.productionTip = false

Vue.use(VDatePicker);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
