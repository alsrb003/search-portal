import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config.json'
import actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        timeStamp: 0, // 자동완성할 때, 입력한 시간 체크
        tf: false, // 로딩화면 온오프
        sessionId: "",
        current: "",
        rList: {}, // 관련검색어
        kList: {}, // 인기검색어
        term: "thisWeek", // 인기검색어 필터
        sortdata: {}, // 받아온 전체 데이터
        autoList: {}, // 자동완성 검색 결과
        data: {
            from: 1, // 받아온 데이터의 page
            size: config.defaultSize, // 게시물 몇 개씩 보여줄건지
            fieldname: config.what[2],
            searchword: " ",
            searchwordarr: [], // AND 검색일 경우
            accOrrec: config.what[0],
            aOrd: config.defaultSort, // desc
            class: 'allsearch', // category (all은 전체검색)
            pagenum: 0, // 보낼 데이터의 page
            check: false, // AND 검색을 하는지
            dateType: "all", // 날짜 필터 (all은 모든 날짜)
            gte: "default", // 날짜 필터의 값 (now-1d ...)
            lt: "", // 날짜 필터의 값 (now-1d ...)
            utc: config.timezone,
            created: "", // 현재 시각
        },
        //다국어
        language: {},
        languageoption: config.options,
        languageoptionselected: "ko",
        replaceword: { count: 0, word: "" },
        // 페이지 번호 처리 관련 변수들
        nowpage: 1,
        totalpage: 0,
        remainder: 0,
        remainderpages: [],
        perpagecnt: config.defaultPageCnt,
        perpage: 0,
        lastpage: 0,
        totalperpagecnt: 0,
    },
    mutations,
    actions,
    getters: {

        GetNowpage: (state) => {
            return state.nowpage;
        }
    },
})
