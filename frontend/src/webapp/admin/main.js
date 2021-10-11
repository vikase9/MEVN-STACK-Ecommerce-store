import "@/scss/style.scss";
import App from "./App.vue";
import Vue from "vue";
import router from "@/webapp/admin/router";
import store from "./store";
import jQuery from "jquery";
import VueSimpleAlert from "vue-simple-alert";
import VueFormPlugin from "@e9ine/vue-form-plugin/src";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;

Vue.use(VueSimpleAlert);
Vue.use(VueFormPlugin);
Vue.use(VueCookies);

window.$ = window.jQuery = jQuery;

const token = $cookies.get("accessToken")
console.log(token);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#admin");
