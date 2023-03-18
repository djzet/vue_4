<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        AppShop
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }"
            >Главная</router-link
          >
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'orderPost' }">
              Создать заказ
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" @click="logout" :to="{ name: 'logout' }">
                Выход
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">
              Войти
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'signup' }">
              Зарегистрироваться
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import {getterTypes, mutationTypes as authActionTypes} from "@/store";

export default {
  name: "AppTopBar",
  computed: {
    ...mapGetters({
      currentUser: getterTypes.tokenUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous,
    }),
  },
  methods:{
    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => {
        this.$router.push({ name: "home" });
      });
    },
  }
};
</script>
