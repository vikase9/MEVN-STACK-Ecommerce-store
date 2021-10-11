import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'

Vue.use(VueRouter);
export default new VueRouter({
  routes,
  mode: "hash",
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});