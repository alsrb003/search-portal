module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/emate_search/'
    : '/',
  configureWebpack: {
    entry: ["babel-polyfill", "./src/main.js"],
  },
  // 개발 서버 설정
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '/api': {
        // 프록시 요청을 보낼 서버의 주소
        target: 'http://localhost:3000'
      },
      '/search': {
        target: 'http://localhost:4000/search',
        changeOrigin: true,
        pathRewrite: {
          '^/search': ''
        }
      },
      '/getlanguages': {
        target: 'http://localhost:4000/getlanguages',
        changeOrigin: true,
        pathRewrite: {
          '^/getlanguages': ''
        }
      },
      '/popular': {
        target: 'http://localhost:4000/popular',
        changeOrigin: true,
        pathRewrite: {
          '^/popular': ''
        }
      },
    }
  },
};