/**
 * Created by 柏松 on 2017/10/7.
 */
const webpack = require('webpack')
const merge = require('webpack-merge') // 引入merge插件
const config = require('./webpack.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')// css打包
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // js压缩插件
const HtmlWebpackPlugin = require('html-webpack-plugin') // html插件
const CleanWebpackPlugin = require('clean-webpack-plugin') // 清理插件
const ImageminPlugin = require('imagemin-webpack-plugin').default
// const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 处理多个css文件的冲突问题
module.exports = merge(config, {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{loader: 'css-loader', options: {minimize: true}}]// 进行css压缩
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].[hash].css'), // 将css打包到指定的目录
    new webpack.optimize.UglifyJsPlugin(), // 使用 webpack 自带的 webpack 插件
    // new UglifyJSPlugin(), // 使用js压缩插件
    new CleanWebpackPlugin(['dist']), // 每次构建之前清理dist文件夹，只会生成使用过的文件
    // 图片压缩
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production',
      pngquant: {quality: '95-100'}
    }),
    // 不同页面的css可以被安全识别
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: {
    //     safe: true
    //   }
    // }),
    // html 插件
    new HtmlWebpackPlugin({
      // date: new Date(), // 这里指做演示用
      title: 'test', // 设置title（基本没什么用）
      template: 'index.html', // 基于index.html来生成才能的文件
      filename: 'index.html', // 指定生成的文件目录名（可以是hash: index-[hash].html）
      inject: 'body', // 指定所有加载的文件放在哪个标签里面 （这里放在body标签里面)
      /*
       * 注：chunks一般只在多页面应用中使用
       */
      // chunks: ['app', 'home'], // 指定给html所需要引入的js(这里引入两个js)
      // excludeChunks: ['home'], // 表示引入除了home之外的js（即app.js）
      // html文件压缩配置
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格
        removeAttributeQuotes: true // 删除特殊属性
      }
    })
  ]
})