<template>
  <div class="pageAside">
    <section class="asideSection">
      <h2>{{ language.associatedsearchterm }}</h2>
      <ol class="relatedList" v-if="rList.length > 0">
        <li v-for="(item, index) in rList" :key="index">
          <pre><font style="font-family:'Apple SD Gothic Neo','Apple Gothic','NanumGothic','나눔고딕','맑은고딕','Malgun Gothic';"><router-link :to="`/ematesearch/${data.class}?q=${item.key}`" class="keyword" @click="keywordSearch(item.key)">{{ setKeyword(item.key) }}</router-link></font></pre>
          <a class="btnDel" @click="deleteKeyword(index)"
            ><span class="hidden">삭제</span></a
          >
        </li>
      </ol>
    </section>
    <section class="asideSection">
      <h2>{{ language.popularsearchterm }}</h2>
      <ul class="tabMenu" style="border: 0px">
        <br v-if="language.locale == 'en'" />
        <li class="on">
          <a @click="kListFilter('thisWeek')">{{ language.thisweek }}</a>
        </li>
        <li>
          <a @click="kListFilter('thisMonth')">{{ language.thismonth }}</a>
        </li>
      </ul>
      <br v-if="language.locale == 'en'" />
      <ol
        class="popularList tabContent"
        id="popularWeekList"
        style="display: block"
        v-if="kList.length > 0"
      >
        <li v-for="(item, index) in kList" :key="index">
          <a v-if="index < 5"
            ><em class="num">{{ index + 1 }}</em
            ><span class="keyword" @click="keywordSearch(item.key)">
              <pre><font style="font-family:'Apple SD Gothic Neo','Apple Gothic','NanumGothic','나눔고딕','맑은고딕','Malgun Gothic';"><router-link :to="`/ematesearch/${data.class}?q=${item.key}`" class="keyword" @click="keywordSearch(item.key)">{{ setKeyword(item.key) }}</router-link></font></pre>
            </span></a
          >
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      language: (state) => state.language,
      kList: (state) => state.kList,
      rList: (state) => state.rList,
      term: (state) => state.term,
      data: (state) => state.data,
    }),
  },
  created() {
    this.$store.dispatch("KSearch", { term: this.term });
  },
  methods: {
    keywordSearch(keyword) {
      this.$store.dispatch("SearchWord", { word: keyword });
    },
    kListFilter(term) {
      this.$store.dispatch("KSearch", { term: term });
    },
    deleteKeyword(index) {
      this.rList.splice(index, 1);
    },
    setKeyword(keyword) {
      if (keyword.length > 15) {
        keyword = keyword.substring(0, 14) + "...";
      }
      return keyword;
    },
  },
};
</script>

<style>
</style>