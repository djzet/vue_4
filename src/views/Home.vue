<template>
  <div class="home-page">
    <app-banner></app-banner>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-products :api-url="apiUrlProd"></app-products>
        </div>
        <div class="col-md-3">
          <app-cart :api-url="apiUrlCart"></app-cart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBanner from "@/components/Banner.vue";
import AppProducts from "@/components/Products.vue";
import AppCart from "@/components/Cart.vue";
export default {
  name: "AppHome",
  components: {
    AppCart,
    AppProducts,
    AppBanner,
  },
  data() {
    return {
      apiUrlProd: "/products",
      apiUrlCart: "/cart",
    };
  },
};
</script>
