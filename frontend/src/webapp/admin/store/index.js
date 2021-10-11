import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { sideBarModule } from "./modules/sidebar";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: null,
    loading: true,
    userName: null,
    authError: null,
    products: null,
    cart: [],
  },
  modules: {
    sideBarModule,
  },

  ///////////////////////////// mutations
  mutations: {
    AUTH_SUCCESS(state, loginAPI) {
      state.isAuthenticated = true;
      state.loading = false;
      state.userName = loginAPI.data.user.name;
      state.authError = null;
    },
    AUTH_FAILURE(state, error) {
      state.authError = error.response.data;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    ADD_TO_CART(state, { product, quantity }) {
      const itemExists = state.cart.find(
        (item) => item.product.id === product.id
      );
      if (itemExists) {
        itemExists.quantity++;
        return;
      } else {
        state.cart.unshift({ product, quantity });
      }
    },
    EMPTY_CART(state) {
      state.cart = [];
    },
    REMOVE_CART(state, productId) {
      const result = state.cart.filter(function(item) {
        return item.product.id != productId;
      });
      state.cart = result;
    },
  },

  /////////////////////// actions
  actions: {
    // login
    async doLogin({ commit }, { email, password }) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const loginAPI = await axios.post(
          "http://localhost:5000/user/login",
          { email, password },
          config
        );
        $cookies.set("accessToken", loginAPI.data.user.token);
        console.log(loginAPI.data.user.token);
        commit("AUTH_SUCCESS", loginAPI);
      } catch (error) {
        console.log(error.response.data);
        commit("AUTH_FAILURE", error);
      }
    },
    // logout
    logout({ commit }) {
      $cookies.remove("accessToken");
      commit("LOGOUT");
    },
    // fetch all products
    async fetchProducts({ commit }) {
      const result = await axios.get("https://fakestoreapi.com/products");
      commit("SET_PRODUCTS", result.data);
    },
    // add to cart
    addToCart({ commit }, product, quantity) {
      commit("ADD_TO_CART", product, quantity);
    },
    // remove cart product
    removeCartProduct({ commit }, productId) {
      commit("REMOVE_CART", productId);
    },
    emptyCart({ commit }) {
      commit("EMPTY_CART");
    },
  },
});
