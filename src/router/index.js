import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '@/views/Home'
import AppLogin from '@/views/Login.vue'
import AppSignup from  '@/views/Signup.vue'
import AppOrders from "@/views/Orders.vue"


const routes = [
  {
    path: "/signup",
    name: "signup",
    component: AppSignup,
  },
  {
    path: "/login",
    name: "login",
    component: AppLogin,
  },
  {
    path: "/",
    name: "logout",
    component: AppHome,
  },
  {
    path: "/",
    name: "home",
    component: AppHome,
  },
  {
    path: "/products",
    name: "products",
    component: AppHome,
  },
  {
    path: "/cart",
    name: "cart",
    component: AppHome,
  },
  {
    path: "/cart/{product_id}",
    name: "cartProduct",
    component: AppHome,
  },
  {
    path: "/cart/{id}",
    name: "cartDelete",
    component: AppHome,
  },
  {
    path: "/order",
    name: "orderPost",
    component: AppOrders,
  },
  {
    path: "/",
    name: "orderGet",
    component: AppHome,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
