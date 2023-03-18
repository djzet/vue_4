import authApi from "@/api/auth";
import orderApi from '@/api/order'
import productsApi from "@/api/products";
import {getItem, setItem} from "@/helpers/persistanceStorage";
import { createStore } from "vuex";
export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailure: "[auth] loginFailure",

  getTokenStart: "[auth] getTokenStart",
  getTokenSuccess: "[auth] getTokenSuccess",
  getTokenFailure: "[auth] getTokenFailure",

  getProductsStart: "[feed] getProductsStart",
  getProductsSuccess: "[feed] getProductsSuccess",
  getProductsFailure: "[feed] getProductsFailure",

  getCartStart: "[cart] getCartStart",
  getCartSuccess: "[cart] getCartSuccess",
  getCartFailure: "[cart] getCartFailure",

  createOrderStart: "[feed] createOrderStart",
  createOrderSuccess: "[feed] createOrderSuccess",
  createOrderFailure: "[feed] createOrderFailure",

  logout: "[auth] logout",
};

export const actionTypes = {
  register: "[auth] Register",
  login: "[auth] Login",
  getToken: "[auth] getToken",
  logout: "[auth] logout",
  getProducts: "[feed] getProducts",
  getCart: "[feed] getCart",
  createOrder: "[feed] createOrder",
};

export const getterTypes = {
  tokenUser: "[auth] tokenUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};
export default createStore({
  state: {
    isSubmitting: false,
    isLoggedIn: null,
    isLoading: false,
    data: null,
    dataCart: null,
    dataOrder: null,
    api: 'https://jurapro.bhuser.ru/api-shop',
    token: getItem('user_token'),
  },
  getters: {
    [getterTypes.tokenUser]: (state) => {
      return state.token;
    },
    [getterTypes.isLoggedIn]: (state) => {
      return Boolean(state.isLoggedIn);
    },
    [getterTypes.isAnonymous]: (state) => {
      return state.isLoggedIn === false;
    },
  },
  mutations: {
    [mutationTypes.registerStart](state) {
      state.isSubmitting = true;
    },
    [mutationTypes.registerSuccess](state, payload) {
      state.isSubmitting = false;
      state.isLoggedIn = true;
      state.token = payload;
    },
    [mutationTypes.registerFailure](state) {
      state.isSubmitting = false;
    },
    [mutationTypes.loginStart](state) {
      state.isSubmitting = true;
    },
    [mutationTypes.loginSuccess](state, payload) {
      state.isSubmitting = false;
      state.isLoggedIn = true;
      state.token = payload;
    },
    [mutationTypes.loginFailure](state) {
      state.isSubmitting = false;
    },
    [mutationTypes.getTokenStart](state) {
      state.isLoading = true;
    },
    [mutationTypes.getTokenSuccess](state, payload) {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.token = payload;
    },
    [mutationTypes.getTokenFailure](state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.token = null;
    },
    [mutationTypes.logout](state) {
      state.token = null;
      state.isLoggedIn = false;
    },
    [mutationTypes.getProductsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mutationTypes.getProductsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getProductsFailure](state) {
      state.isLoading = false;
    },
    [mutationTypes.getCartStart](state) {
      state.isLoading = true;
      state.dataCart = null;
    },
    [mutationTypes.getCartSuccess](state, payload) {
      state.isLoading = false;
      state.dataCart = payload;
    },
    [mutationTypes.getCartFailure](state) {
      state.isLoading = false;
    },
    [mutationTypes.createOrderStart](state) {
      state.isSubmitting = true;
    },
    [mutationTypes.createOrderSuccess](state, payload) {
      state.isSubmitting = false;
      state.isLoggedIn = true;
      state.dataOrder = payload;
    },
    [mutationTypes.createOrderFailure](state) {
      state.isSubmitting = false;
    },
  },
  actions: {
    [actionTypes.register](context, user) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.registerStart);
        authApi
          .register(user)
          .then((response) => {
            context.commit(mutationTypes.registerSuccess, response.data.data.user_token);
            setItem("user_token", response.data.data.user_token);
            resolve(response.data.data.user_token);
          })
          .catch(() => {
            context.commit(mutationTypes.registerFailure);
          });
      });
    },
    [actionTypes.login](context, user) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.loginStart);
        authApi
          .login(user)
          .then((response) => {
            context.commit(mutationTypes.loginSuccess, response.data.data.user_token);
            setItem("user_token", response.data.data.user_token);
            resolve(response.data.data.user_token);
          })
          .catch(() => {
            context.commit(mutationTypes.loginFailure);
          });
      });
    },
    [actionTypes.getToken](context) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getTokenStart);
        authApi
          .getCurrentUser()
          .then((response) => {
            context.commit(mutationTypes.getTokenSuccess, response.data.data.user_token);
            resolve(response.data.data.user_token);
          })
          .catch(() => {
            context.commit(mutationTypes.getTokenFailure);
          });
      });
    },
    [actionTypes.logout](context) {
      return new Promise((resolve) => {
        setItem("user_token", "");
        context.commit(mutationTypes.logout);
        resolve();
      });
    },
    [actionTypes.getProducts](context, { apiUrl }) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getProductsStart, apiUrl);
        productsApi
            .getFeed(apiUrl)
            .then((response) => {
              context.commit(mutationTypes.getProductsSuccess, response.data);
              resolve(response.data);
            })
            .catch(() => {
              context.commit(mutationTypes.getProductsFailure);
            });
      });
    },
    [actionTypes.getCart](context, { apiUrl }) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.getCartStart, apiUrl);
        productsApi
            .getFeed(apiUrl)
            .then((response) => {
              context.commit(mutationTypes.getCartSuccess, response.data);
              resolve(response.data);
            })
            .catch(() => {
              context.commit(mutationTypes.getCartFailure);
            });
      });
    },
    [actionTypes.createOrder](context, user) {
      return new Promise((resolve) => {
        context.commit(mutationTypes.createOrderStart);
        orderApi
            .create(user)
            .then((response) => {
              context.commit(mutationTypes.createOrderSuccess, response.data);
              setItem("create_order", response.data);
              resolve(response.data);
            })
            .catch(() => {
              context.commit(mutationTypes.createOrderFailure);
            });
      });
    },
  },
  modules: {},
});
