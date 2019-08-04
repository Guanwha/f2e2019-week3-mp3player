// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// scrollview
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { RecycleScroller } from 'vue-virtual-scroller';

// common
import Vue from 'vue';
import App from './App';
import store from './stores';
import './styles/_reset.css';
import './styles/_variables.scss';
import './styles/_normalize.scss';

Vue.config.productionTip = false;
Vue.component('RecycleScroller', RecycleScroller);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
});
