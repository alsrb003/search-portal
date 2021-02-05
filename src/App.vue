<template>
  <div id="app">
    <spinner :loading="tf"></spinner>
    <div class="page">
      <Header></Header>
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import testa from './js/jquery';
import testb from './js/jquery-ui';
import testc from './portal/js/test2';
import testd from './portal/js/test';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner.vue";
import { mapState } from "vuex";

export default {
  mixin: [testa, testb, testc, testd],
  name: "App",
  computed: {
    ...mapState({
      data: (state) => state.data,
      tf: (state) => state.tf,
    }),
  },
  components: {
    Header,
    Footer,
    Spinner,
  },
  created() {
    // var locale = this.$cookies.get("language");
    this.$store.dispatch("LanguageFetchData");
  },
};
</script>

<style>
@import "./portal/css/common.css";
@import "./portal/css/search.css";
@import "./portal/css/lib.min.css";
</style>