const config = require('./webpack.config.js')
const merge = require('webpack-merge') // 引入merge插件
module.exports = merge(config, {
  module: {
    devtool: 'inline-source-map', // 错误定位（告诉你错误的来源）
    rules: [
      // css-loader
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!css-loader'
      }
    ]
  },
  plugins: []
})