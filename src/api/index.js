import axios from 'axios';
// 언어
function GetLanguage(data) {
    return axios({
        method: 'post',
        url: `/getlanguages`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 검색
function Search(data) {
    return axios({
        method: 'post',
        url: `/search`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 인기검색어
function WeekMonth(data) {
    return axios({
        method: 'post',
        url: `/popular`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 자동완성
function Auto(data) {
    return axios({
        method: 'post',
        url: `/searchauto`,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export {
    GetLanguage,
    Search,
    WeekMonth,
    Auto,
}