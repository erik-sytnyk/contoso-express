import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './vuex/store';
import { configRouter } from './clientRoutes';
const Main = require('./components/main.vue');
const VueValidator = require('vue-validator');

require('../styles/app.css');

// install router
Vue.use(VueRouter);
Vue.use(VueValidator);

//TODO only for dev env
Vue.config.debug = true;

// create router
const router = new VueRouter({
    history: true
});

// configure router
configRouter(router);

// bootstrap the app
const App = Vue.extend({
    template: '<main></main>',
    store,
    components: {Main}
});

router.start(App, '#app div', () => {
    router.go({name: 'home'});
});

// just for debugging
window.router = router;