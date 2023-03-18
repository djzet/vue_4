<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Зарегистрироваться</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Need an account?
            </router-link>
          </p>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="ФИО"
                v-model="fio"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Почта"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Пароль"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store";
export default {
  name: "AppSignup",
  data() {
    return {
      email: "",
      password: "",
      fio: "",
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.isSubmitting,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          fio: this.fio,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
  },
};
</script>
