<template>
  <div>
    <app-loading v-if="isLoading"></app-loading>
    <div v-if="data">
      <div class="article-preview" v-for="prod in products.data" :key="prod.id">
        <div class="article-meta">
          <h2>{{ prod.name }}</h2>
          <div class="article-meta">
            <h6>{{ prod.description }}</h6>
          </div>
          <div class="article-meta">
            <router-link @click="addProduct" :to="{ name: 'home' }" v-if="this.$store.state.token">
              <h3>Цена: {{ prod.price }}</h3>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import queryString from "query-string";
import { actionTypes } from "@/store";
import AppLoading from "@/components/Loading.vue";
import axios from "axios";

export default {
  name: "AppProducts",
  components: {
    AppLoading,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  data(){
    return{
      products: [],
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.isLoading,
      data: (state) => state.data,
    }),
    baseUrl() {
      return this.$route.path;
    },
  },
  watch: {
    apiUrl() {
      this.fetchFeed();
    },
  },
  mounted() {
    axios.get(this.$store.state.api + '/products').then((response)=>{
      this.products = response.data
    })
    this.fetchFeed();
  },
  methods: {
    addProduct(){

    },
    fetchFeed() {
      const parsedUrl = queryString.parseUrl(this.apiUrl);
      const stringifiedParams = queryString.stringify({
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getProducts, {
        apiUrl: apiUrlWithParams,
      });
    },
  },
};
</script>
