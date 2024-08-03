// @2024/08/04 Add
// 引入 Node.js 的 path 模塊，用於處理和轉換文件路徑
const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      // 為 Node.js 的 stream 模塊指定一個瀏覽器端的替代模塊
      // 當 Webpack 遇到 stream 模塊時，會使用 stream-browserify 來代替
      "stream": require.resolve("stream-browserify")
    }
  },
  // 其他配置可以在這裡添加
};
