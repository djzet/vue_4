<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Оформить заказ</h1>
          <p class="text-xs-center">
          </p>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Номер заказа"
                v-model="order_id"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Заказать
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
  name: "AppOrders",
  data() {
    return {
      order_id: "",
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
        .dispatch(actionTypes.createOrder, {
          order_id: this.order_id,
        })
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
  },
};
</script>
