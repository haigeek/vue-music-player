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
import { Cell, CellGroup } from 'vant';
import APlayer from '@moefe/vue-aplayer';
import { Switch } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);

Vue.use(Switch);

Vue.use(APlayer, {
  defaultCover: 'http://test.haigeek.xyz/njlizhi/music/default.png',
  productionTip: true,
});

Vue.use(Cell);
Vue.use(CellGroup);


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
