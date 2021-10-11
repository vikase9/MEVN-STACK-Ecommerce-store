import "@/scss/style.scss";
import Login from "./Login.vue";
import Vue from "vue";
import store from "../webapp/admin/store";
import router from "vue-router";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;
Vue.use(VueCookies);

new Vue({
  render: (h) => h(Login),
  store,
  router,
}).$mount("#login");
