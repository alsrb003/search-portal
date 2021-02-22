<template>
  <div class="pageContainer">
    <div class="pageContent">
      <section class="resultSection">
        <h2 class="title">
          <router-link :to="`/ematesearch/person?q=${data.searchword}`">
            <span @click="setClass('person')"> {{ language.person }} </span>
            <span class="cnt" v-if="this.sortdata.person">
              {{ this.sortdata.person.total_cnt }}
            </span>
            <span class="cnt" v-else> 0 </span>
          </router-link>
        </h2>
        <ul class="employeeList">
          <span v-if="this.personData">
            <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
            <li v-for="(data, index) in personData.data" :key="index">
              <!-- <router-link :to="`/detail/${index} person`"> -->
              <a :href="url.person.url + data.originalurl" target="blank">
                <span class="thumb">
                  <img :src="url.person.url + data.photo" alt="" />
                  <!-- onerror="this.src='http://kms.saerom.co.kr/lib/photo/219009.jpg';" -->
                </span>
                <span class="name kor">{{ data.subject }}</span>
                <span class="team">{{ setWord(data.dept) }}</span>
              </a>
              <!-- </router-link> -->
            </li>
          </span>
        </ul>
        <span @click="setClass('person')">
          <router-link
            :to="`/ematesearch/person?q=${data.searchword}`"
            class="btnMore"
          >
            MORE
          </router-link>
        </span>
      </section>

      <span>
        <section
          class="resultSection"
          v-for="(cate, index) in category"
          :key="index"
        >
          <span v-if="cate.id !== 'person' && cate.id !== 'allsearch'">
            <h2 class="boardTitle">
              <router-link :to="`/ematesearch/${cate.id}?q=${data.searchword}`">
                <span @click="setClass(cate.id)">
                  {{ language[cate.id] }}
                </span>
              </router-link>
            </h2>
            <ul class="boardList">
              <span v-if="sortdata[cate.id]">
                <!-- <span v-if="Array.isArray(this.sortdata.category.approval) && this.sortdata.category.approval.length>0"> -->
                <li
                  v-for="(data, index) in sortdata[cate.id].data"
                  :key="index"
                >
                  <!-- <router-link :to="`/detail/${index} approval`"> -->
                  <a>
                    <span
                      class="attch"
                      v-if="data.attached !== ''"
                      :title="atta(data.attached)"
                    ></span>
                    <a
                      :href="url[cate.id].url + data.originalurl"
                      target="blank"
                      style="margin: 0; padding: 0"
                    >
                      <span class="location">{{ setWord(data.nav) }}</span>
                      <span class="subject">{{ data.subject }}</span>
                      <span class="write"
                        >{{ setWord(data.author) }} / {{ setWord(data.dept) }} /
                        <span class="date">{{
                          getTime(data.created)
                        }}</span></span
                      >
                      <span class="content">{{ data.body }}</span>
                    </a>
                  </a>
                  <!-- </router-link> -->
                </li>
              </span>
            </ul>
          </span>
          <span @click="setClass(cate.id)">
            <router-link
              :to="`/ematesearch/${cate.id}?q=${data.searchword}`"
              class="btnMore"
              >MORE
            </router-link></span
          >
        </section>
      </span>
    </div>

    <PageSide></PageSide>
  </div>
</template>

<script>
import PageSide from "./PageSide";
import { mapState } from "vuex";
import config from "../config.json";

export default {
  components: {
    PageSide,
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
      sortdata: (state) => state.sortdata,
      approData: (state) => state.approData,
      boardData: (state) => state.boardData,
      personData: (state) => state.personData,
      data: (state) => state.data,
    }),
    category() {
      return config.category;
    },
    url() {
      return config.category;
    },
  },
  methods: {
    setClass(className) {
      this.$store.dispatch("BigCategory", className);
    },
    getTime(date) {
      var moment = require("moment");
      var localTime = moment.utc(date).toDate();
      localTime = moment(localTime).format("YYYY년 MM월 DD일 HH시 mm분 ss초");
      return localTime;
    },
    setWord(word) {
      if (
        typeof word == "undefined" ||
        typeof word == undefined ||
        word == null ||
        word == ""
      ) {
        return "";
      } else {
        if (word.includes(this.language.locale)) {
          if (JSON.parse(word)[this.language.locale].length > 0) {
            word = JSON.parse(word)[this.language.locale];
          }
        }
      }
      return word;
    },
    atta(list) {
      var text = "";
      if (Array.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
          text += list[i] + "\n";
        }
      } else {
        text = list;
      }
      return text;
    },
  },
};
</script>

<style>
</style>