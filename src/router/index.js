import Vue from 'vue';
import VueRouter from 'vue-router';
import Table from '@/pages/Table';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Table',
    component: Table,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
