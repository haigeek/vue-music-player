import Vue from 'vue'
import App from './App.vue'
import {Col,Row,Header,Container,Menu,Submenu,MenuItem} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Row);
Vue.use(Col)
// Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
