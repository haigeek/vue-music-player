import Vue from 'vue'
import App from './App.vue'
import 'vant/lib/index.css'
import { Col, Row } from 'vant';
import { Divider } from 'vant';
import { Card } from 'vant';
import { Grid, GridItem } from 'vant';
import { Image } from 'vant';
import { ActionSheet } from 'vant';
import { Toast } from 'vant';


Vue.use(Toast);

Vue.use(ActionSheet);

Vue.use(Image);

Vue.use(Grid);
Vue.use(GridItem);

Vue.use(Card);



Vue.use(Divider);


Vue.use(Col);
Vue.use(Row);
Vue.config.productionTip = false

Vue.use(Row);
Vue.use(Col)

new Vue({
  render: h => h(App),
}).$mount('#app')
