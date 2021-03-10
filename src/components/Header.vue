<template>
  <header class="pageHeader">
    <button @click="checkApi">{{ this.voice }}</button>
    <!-- <select @change="(e) => ChangeLanguage(e)">
      <option
        v-for="option in options"
        :key="option.value"
        v-bind:value="option.value"
      >
        {{ option.text }}
      </option>
    </select> -->
    <div class="searchArea">
      <div class="searchBox">
        <div class="keyword">
          <input
            type="text"
            :placeholder="language.inputsearch"
            v-on:input="searchQuery = $event.target.value"
            @keyup="autoComplete"
            v-model="data.searchword"
            @focusin="focus(true)"
          />
          <!-- @focusout="focus(false)" -->
        </div>
        <button type="submit" class="btnSearch" @click="btnSearch"></button>
        <div class="acKeywordBox">
          <ul v-for="(data, index) in autoList" :key="index">
            <li>
              <a @click="wordClick(data.key)" :style="`background: ${data.bg}`"
                ><em>{{ data.key }}</em></a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="searchOption">
        <label
          ><input
            type="checkbox"
            @click="(e) => ResearchCheck(e)"
            class="hidden"
          /><span class="txt">{{ language.searchofresult }}</span></label
        >
      </div>
    </div>
    <div class="lnb">
      <div class="lnbMenu">
        <ul>
          <!-- <li :class="{ on: CategoryOn('all') }" @click="CategoryBtn('all')">
            <router-link :to="`/all`">
              {{ language.allsearch }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('person') }"
            @click="CategoryBtn('person')"
          >
            <router-link :to="`/person/person`">
              {{ language.person }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('mail') }"
            @click="CategoryBtn('mail')"
          >
            <router-link :to="`/mail`">
              {{ language.mail }}
            </router-link>
          </li>
          <span v-for="(item, index) in category" :key="index">
            <li :class="{ on: CategoryOn(item) }" @click="CategoryBtn(item)">
              <router-link :to="`/board/${item}`">
                {{ language[item] }}
              </router-link>
            </li>
          </span> -->

          <span v-for="(item, index) in category" :key="index">
            <li
              :class="{ on: CategoryOn(item.id) }"
              @click="CategoryBtn(item.id)"
            >
              <router-link :to="`/ematesearch/${item.id}?q=${data.searchword}`">
                {{ language[item.id] }}
              </router-link>
            </li>
          </span>

          <!-- <li :class="{ on: CategoryOn('all') }" @click="CategoryBtn('all')">
            <router-link :to="`/all`">
              {{ language.allsearch }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('person') }"
            @click="CategoryBtn('person')"
          >
            <router-link :to="`/person/person`">
              {{ language.person }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('approval') }"
            @click="CategoryBtn('approval')"
          >
            <router-link :to="`/board/approval`">
              {{ language.approval }}
            </router-link>
          </li>
          <li
            :class="{ on: CategoryOn('board') }"
            @click="CategoryBtn('board')"
          >
            <router-link :to="`/board/board`">
              {{ language.board }}
            </router-link>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="filterArea">
      <div class="filterItem">
        <a class="btnToggle">{{ language.sortdate }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('desc', 'aOrd')">{{ language.sortdate }}</a>
          </li>
          <li>
            <a @click="SortBtn('accuracy', 'aOrd')">{{
              language.accuracyorder
            }}</a>
          </li>
        </ul>
      </div>
      <div class="filterItem">
        <a class="btnToggle">{{ language.alldates }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('all', 'dateType', 'default')">{{
              language.alldates
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('ago', 'dateType', 'now-1h/s')">{{
              language.anhourago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-1d/d')">{{
              language.adayago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-7d/d')">{{
              language.aweekago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-1M/d')">{{
              language.amonthago
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('season', 'dateType', 'now-1y/d')">{{
              language.ayearago
            }}</a>
          </li>
          <li>
            <a class="btnPeriod">{{ language.periodsetting }}</a>
            <div class="datepickerArea">
              <div class="datepickerBox">
                <input
                  type="text"
                  class="datepicker"
                  id="datepicker1"
                  v-model="startDate"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <div class="datepickerBox">
                <input
                  type="text"
                  class="datepicker"
                  id="datepicker2"
                  v-model="endDate"
                  placeholder="MM/DD/YYYY"
                />
              </div>
              <a class="btnSubmit" @click="SortBtn('custom', 'dateType')">{{
                language.apply
              }}</a>
            </div>
          </li>
        </ul>
      </div>
      <div class="filterItem">
        <a class="btnToggle">{{ language.atthe }}</a>
        <ul class="toggleBox">
          <li class="on">
            <a @click="SortBtn('all', 'fieldname')">{{ language.atthe }}</a>
          </li>
          <li>
            <a @click="SortBtn('subject', 'fieldname')">{{
              language.atthetitle
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('body', 'fieldname')">{{
              language.atthecontent
            }}</a>
          </li>
          <li>
            <a @click="SortBtn('author', 'fieldname')">{{
              language.attheauthor
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <p class="resultMessage" v-text="language.searchresult">
      <!-- 검색어 <span class="highlight">&quot;플랫폼&quot;</span>에 대한
        <span class="highlight">307</span>건의 검색 결과입니다. -->
    </p>
  </header>
</template>

<script>
import { mapState } from "vuex";
import config from "../config.json";
import $ from "jquery";

let qwe = null;

export default {
  data() {
    return {
      searchname: "",
      startDate: "",
      endDate: "",
      searchQuery: "",
      fo: false,
      cNum: 0,
      runtimeTranscription: "",
      transcription: [],
      voice: "음성 검색",
    };
  },
  methods: {
    checkApi() {
      if (
        typeof window.webkitSpeechRecognition == "undefined" ||
        typeof window.webkitSpeechRecognition == undefined ||
        window.webkitSpeechRecognition == null ||
        window.webkitSpeechRecognition == ""
      ) {
        // 인터넷 익스플로러 음성 인식 X
        alert("현재 브라우저에서 지원하지 않는 서비스입니다.     ");
      } else {
        if (this.voice == "듣는중") {
          // empty
          qwe.stop();
        } else {
          this.voice = "듣는중";
          window.SpeechRecognition =
            window.webkitSpeechRecognition || window.SpeechRecognition;
          const recognition = new window.SpeechRecognition();
          qwe = recognition;
          recognition.lang = "ko-KR";
          recognition.addEventListener("result", (event) => {
            const text = Array.from(event.results)
              .map((result) => result[0])
              .map((result) => result.transcript)
              .join("");
            this.runtimeTranscription = text;
          });
          recognition.addEventListener("end", () => {
            if (this.runtimeTranscription !== "") {
              this.transcription.push(this.runtimeTranscription);
              this.$store.dispatch("SearchWord", {
                word: this.runtimeTranscription,
                category: this.data.class,
              });
              this.runtimeTranscription = "";
              recognition.stop();
              alert("검색 성공!");
            } else {
              alert("종료!");
            }
            this.voice = "음성 검색";
            // recognition.start();
          });
          recognition.start();
        }
      }
    },
    CategoryOn(category) {
      // 카테고리에 따라서 하이라이트 주기
      var fullPath = this.$route.fullPath.split("/");
      var path = fullPath[fullPath.length - 1].split("?");
      if (path[0] == category) return true;
      else false;
    },
    removeClass() {
      // 자동완성 창 안보이게
      var $search = $(".searchBox");
      $search.removeClass("on");
    },
    addClass() {
      // 자동완성 창 보이게
      var $search = $(".searchBox");
      $search.addClass("on");
    },
    btnSearch() {
      // 검색
      this.removeClass();
      var word = this.data.searchword;
      word = word.trim();
      this.$store.dispatch("SearchWord", {
        word: word,
        category: this.data.class,
      });
    },
    wordClick(word) {
      // 자동완성 창에서 검색어 클릭시
      this.removeClass();
      word = word.trim();
      this.$store.dispatch("SearchWord", {
        word: word,
        category: this.data.class,
      });
    },
    CategoryBtn(category) {
      // 카테고리 메뉴 클릭시
      this.removeClass();
      this.$store.dispatch("BigCategory", category);
    },
    autoComplete(e) {
      // 자동완성으로 연관검색어 가져오기
      const now = new Date();
      const timeStamp = Date.parse(now) + now.getMilliseconds();

      for (var i = 0; i < this.autoList.length; i++) {
        this.autoList[i].bg = "white";
      }

      if (e.keyCode == 13) {
        // 엔터키
        this.removeClass();
        this.btnSearch();
      } else if (e.keyCode == 27) {
        // esc키
        this.removeClass();
        this.cNum = 0;
      } else if (e.keyCode == 40) {
        // 아래 방향키
        if (this.autoList.length > 0) {
          this.cNum++;
          if (this.cNum >= 100) {
            this.cNum = 0;
          }
          if (this.cNum >= this.autoList.length) {
            this.cNum = -1;
            this.data.searchword = "";
          } else {
            this.data.searchword = this.autoList[this.cNum].key;
            this.autoList[this.cNum].bg = "#FFFF00";
          }
        }
        this.searchQuery = this.data.searchword;
      } else if (e.keyCode == 38) {
        // 위 방향키
        if (this.autoList.length > 0) {
          this.cNum--;
          if (this.cNum < -1 || this.cNum >= 90) {
            this.cNum = this.autoList.length - 1;
          } else if (this.cNum == -1) {
            this.data.searchword = "";
          }
          if (this.cNum >= 0) {
            this.data.searchword = this.autoList[this.cNum].key;
            this.autoList[this.cNum].bg = "#FFFF00";
          }
        }
        this.searchQuery = this.data.searchword;
      } else {
        // 연관검색어
        this.cNum = 100;
        this.addClass();
        var word = this.searchQuery;
        this.$store.dispatch("autoComplete", {
          word: word,
          category: this.data.class,
          timeStamp: timeStamp,
        });
      }
    },
    focus(value) {
      this.fo = value;
      if (this.fo == true) {
        this.addClass();
      } else {
        this.removeClass();
      }
    },
    SortBtn(it, fieldname, whatDate) {
      // 정렬, 필터 클릭시
      var id = this.$route.params.id;

      var moment = require("moment");
      // moment().format("YYYY-MM-DD HH:mm:ss Z");
      var lt = "";
      if (it == "custom") {
        if (this.startDate == "") {
          this.startDate = $("input#datepicker1").datepicker().val();
        }
        this.startDate = moment(new Date(this.startDate)).format(
          "YYYYMMDDHHmmss"
        );
        if (this.endDate == "") {
          this.endDate = $("input#datepicker2").datepicker().val();
          // this.endDate = moment(this.endDate).add(1, "days").format("YYYYMMDD");
        }
        this.endDate = moment(new Date(this.endDate))
          .add(1, "days")
          .format("YYYYMMDDHHmmss");
        if (this.startDate != "") {
          whatDate = this.startDate;
        }

        if (this.endDate != "") {
          lt = this.endDate;
        }

        // if (this.startDate != "" && this.endDate != "") {
        //   var dateArr = [this.startDate, this.endDate];
        //   whatDate = dateArr;
        // }
      }

      if (
        typeof whatDate == "undefined" ||
        typeof whatDate == undefined ||
        whatDate == null ||
        whatDate == ""
      ) {
        whatDate = this.data.gte;
      }

      this.$store.dispatch("FilterData", {
        what: it,
        whatfield: fieldname,
        category: id,
        gte: whatDate,
        lt: lt,
      });

      this.startDate = "";
      this.endDate = "";
    },
    // ChangeLanguage(e) {
    //   console.log(e.target.value);
    //   var value = e.target.value;
    //   this.$store.dispatch("LanguageFetchData", value);
    // },
    ResearchCheck(e) {
      // 결과내 재검색
      var checked = e.target.checked;
      this.$store.commit("ResearchCheck", checked);
    },
    // dateFilter() {
    //   var moment = require("moment"); // moment 모듈불러오기

    //   var now = moment(); //오늘
    //   var now = moment("2020-01-01"); //특정일 셋팅
    //   console.log("ffffffffffffffff", now._d);

    //   //moment().add(number,String); 추가
    //   //moment().subtract(number,String); 빼기

    //   var tomorrow = moment().add(1, "days"); //내일
    //   var yesterday = moment().subtract(1, "days"); //어제
    //   var addMonth = moment().add(1, "months"); //한달 뒤
    //   var subMonth = moment().subtract(1, "months"); //한달 전
    //   var addYear = moment().add(1, "years"); //일년 뒤
    //   var subYear = moment().subtract(1, "years"); //일년 전

    //   moment().format("YYYY-MM-DD HH:mm:ss Z");
    //   console.log("now ", now.format());
    //   console.log("tomorrow ", tomorrow.format());
    //   console.log("yesterday ", yesterday);
    //   console.log("addMonth ", addMonth);
    //   console.log("subMonth ", subMonth);
    //   console.log("addYear ", addYear);
    //   console.log("subYear ", subYear);
    // },
  },
  computed: {
    ...mapState({
      selected: (state) => state.languageoptionselected,
      language: (state) => state.language,
      options: (state) => state.languageoption,
      data: (state) => state.data,
      autoList: (state) => state.autoList,
    }),
    category() {
      return config.category;
    },
  },
  created() {
    // 시작화면에서 전체검색에 하이라이트 주기
    this.CategoryOn(this.category);

    // 라우터로 쿼리스트링 받아오기
    // var q = this.$route.query.q;

    // 쿼리스트링 넘기기
    //  <router-link :to="{path:'ematesearch/person', query:{text:'다시'}}">

    // if (
    //   typeof q == "undefined" ||
    //   typeof q == undefined ||
    //   q == null ||
    //   q == ""
    // ) {
    //   return;
    // }
    // q = q.trim();
    // this.$store.dispatch("SearchWord", { word: q });

    // 처음 시작시 검색어 받아와서 검색
    let uri = window.location.href.split("?");
    if (uri.length == 2) {
      let vars = uri[1].split("&");
      let getVars = {};
      let tmp = "";
      vars.forEach(function (v) {
        tmp = v.split("=");
        if (tmp.length == 2) getVars[tmp[0]] = tmp[1];
      });

      getVars.q = decodeURI(getVars.q);

      var fullPath = uri[0].split("/");
      var path = fullPath[fullPath.length - 1].split("?");
      this.$store.dispatch("SearchWord", {
        word: getVars.q,
        category: path[0],
      });
    }
    if (uri.length <= 1) {
      this.$store.dispatch("SearchWord", {
        word: " ",
        category: "allsearch",
      });
    }
  },
  // 뒤로가기
  watch: {
    // to, from
    $route(to) {
      var fullPath = to.path.split("/");
      var path = fullPath[fullPath.length - 1].split("?");
      this.$store.dispatch("SearchWord", {
        word: this.$route.query.q,
        category: path[0],
      });
    },
  },
};
</script>

<style>
</style>