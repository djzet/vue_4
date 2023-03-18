<template>
  <div id="app">
    <app-top-bar></app-top-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppTopBar from "@/components/TopBar.vue";
import {actionTypes} from "@/store";

export default {
  name: "App",
  components: {
    AppTopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getToken);
  },
};
</script>
