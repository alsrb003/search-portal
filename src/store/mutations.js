// 검색어 @에 대한 #건의 검색 결과입니다. 문자 처리
const replaceString = {
    fetch(relanguage, sortdata, data, replaceword) {
        if (Object.keys(relanguage).length > 0) {
            // 건수 변환
            var cnt = 0;
            if (!(sortdata.total_cnt == undefined)) {
                cnt = sortdata.total_cnt;
            }
            relanguage.searchresult =
                relanguage.searchresult.replace(new RegExp(replaceword.count), ` ${cnt}`);
            // 검색어 변환
            var rereplace = '" "';

            if (relanguage.searchresult.indexOf('" "') == -1) {
                rereplace = `"${data.searchwordarr}"`;
            }
            relanguage.searchresult =
                relanguage.searchresult.replace(new RegExp(rereplace), `"${data.searchwordarr}"`);
        }
        return relanguage;

    }
}
import config from '../config.json';
export default {
    // 검색
    ResearchCheck(state, checked) {
        state.data.check = checked;
        // if (state.data.check === true) {
        //     state.data.searchwordarr.push(state.data.searchword);
        // }
    },
    SearchData(state, { res, word, replaceword, what, whatfield, page, size }) {

        var result = {};

        if (typeof res === 'string') {
            result.total_cnt = 0;
        } else {
            result = res;
        }

        var data = state.data;
        if (word !== undefined && page !== undefined) {
            data.searchword = word;
            data.pagenum = page;
            // data fetch

            state.data.searchword = word;
            state.data.pagenum = page;
            state.nowpage = config.defaultNowPage;
            state.data.pagenum = config.defaultPageNum - 1;
        }
        else if (what !== undefined && whatfield !== undefined) {
            data[whatfield] = what;
            // data fetch
            state.data[whatfield] = what;
            state.nowpage = config.defaultNowPage;
            state.data.pagenum = config.defaultPageNum - 1;
        }
        else if (page !== undefined && size !== undefined) {
            state.data.pagenum = page;
            state.data.size = size;
        }
        // language별 String을 replace 시켜줄 데이터 바인딩 
        var sortdata = result;
        var replace = state.replaceword;

        // total_cnt
        state.sortdata = result;

        // 전체 결과 건수
        state.sortdata.total_cnt = 0;
        if (state.sortdata.approval) {
            state.sortdata.total_cnt += state.sortdata.approval.total_cnt;
        }
        if (state.sortdata.board) {
            state.sortdata.total_cnt += state.sortdata.board.total_cnt;
        }
        if (state.sortdata.person) {
            state.sortdata.total_cnt += state.sortdata.person.total_cnt;
        }
        if (state.sortdata.mail) {
            state.sortdata.total_cnt += state.sortdata.mail.total_cnt;
        }

        // 새로운 데이터 별 바뀐 language
        var relanguage = replaceString.fetch(state.language, sortdata, data, replace);

        // // 받아온 created에 +09:00
        // var moment = require("moment");
        // for (var i = 0; i < state.sortdata.length; i++) {
        //     state.sortdata[i].created = moment(state.sortdata[i].created).add(9, "h").format("YYYYMMDDTHHmmssZ");
        // }

        // state.nowpage = 1;
        state.language = relanguage;
        state.replaceword.word = replaceword;
        state.replaceword.count = state.sortdata.total_cnt;
        // page 계산
        // 마지막페이지-1
        var settotalpage = parseInt(state.sortdata.total_cnt / config.defaultSize);
        state.totalpage = settotalpage;
        // 마지막페이지 객체수
        state.remainder = state.sortdata.total_cnt % config.defaultSize;
        // 마지막 디스플레이 객체수
        state.perpage = settotalpage % state.perpagecnt;
        // 총 디스플레이 페이지수
        state.totalperpagecnt = parseInt(settotalpage / state.perpagecnt);
    },
    // 카테고리
    BigCategory(state, { res, category }) {
        state.sortdata = res.data;
        state.data.class = category;
        state.data.pagenum = config.defaultPageNum - 1;
        state.data.size = config.defaultSize;
        state.nowpage = config.defaultNowPage;
    },
    // 다국어
    LanguageData(state, { data }) {
        state.language = data;
    },
    // 페이지
    PageNum(state, { page, size }) {
        state.data.pagenum = page - 1;
        state.data.size = size;
    },
    NowPageChange(state, change) {
        state.nowpage = change;
    },
    // 자동완성
    autoList(state, { relation }) {
        state.autoList = relation;
    },
    // 시간 설정
    setTime(state) {
        // 지금 이 순간
        var moment = require("moment");
        state.data.created = moment().utc().format("YYYYMMDDTHHmmss");
        state.current = moment().format("YYYYMMDDTHHmmss");

        // // 받아온 created에 +09:00
        // var moment = require("moment");
        // for (var i = 0; i < state.sortdata.length; i++) {
        //     state.sortdata[i].created = moment(state.sortdata[i].created).add(9, "h").format("YYYYMMDDTHHmmssZ");
        // }
    },
    // 검색시 인기검색어, 관련검색어 가져오기
    setList(state, { popular, relation }) {
        state.kList = popular;
        
        for (var k = 0; k < relation.length; k++) {
            if (relation[k].key === state.data.searchword) {
                relation.splice(k, 1);
            }
        }
        state.rList = relation;

        // 인기순 정렬
        for (var i = 0; i < state.kList.length; i++) {
            for (var j = i + 1; j < state.kList.length; j++) {
                if (state.kList[i].key === "") {
                    state.kList.splice(i, 1);
                } else {
                    if (state.kList[i].doc_count < state.kList[j].doc_count) {
                        var temp = state.kList[i];
                        state.kList[i] = state.kList[j];
                        state.kList[j] = temp;
                    }
                }
            }
        }
    },
    // 인기검색어
    popularList(state, { popular, term }) {
        state.term = term;
        state.kList = popular;

        // 인기순 정렬
        for (var i = 0; i < state.kList.length; i++) {
            for (var j = i + 1; j < state.kList.length; j++) {
                if (state.kList[i].key === "") {
                    state.kList.splice(i, 1);
                } else {
                    if (state.kList[i].doc_count < state.kList[j].doc_count) {
                        var temp = state.kList[i];
                        state.kList[i] = state.kList[j];
                        state.kList[j] = temp;
                    }
                }
            }
        }
    }
}