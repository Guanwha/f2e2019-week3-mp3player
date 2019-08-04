// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './stores';
import './styles/_reset.css';
import './styles/_variables.scss';
import './styles/_normalize.scss';

// scrollview
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.config.productionTip = false;
Vue.component('RecycleScroller', RecycleScroller);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
});
