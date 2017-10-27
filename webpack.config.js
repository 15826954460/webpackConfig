/*  Created by 柏松 on 2017/10/8. */
const path = require('path') // 引入node核心api

// 声明一个webpackConfig 对象进行公共配置
const webpackConfig = {
  entry: {
    main: './src/main.js' // 入口文件 （对象的形式）
  },
  // entry: './src/main.js' // 入口文件 (字符串形式的默认输出为 main.js)
  output: {
    filename: 'js/[name].[hash].js', // 打包后的文件名（指定生成到js目录下）
    path: path.resolve(__dirname, 'dist') // node自身核心api 将会根据执行环境上下文自动生成路径
  },
  module: {
    rules: [
      // scss loader
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!scss-loader'
      },
      // sass loader
      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      // less loader
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      // js babel-loader
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'), // es6编译时，不编译node_module文件
        include: path.resolve(__dirname, 'src'), // es6 编译时，便宜src文件
        loader: 'babel-loader' // 通过babel来进行转码
        /*
        *query: {
        *      presets: ['latest'] //按照最新的ES6语法规则去转换
        *}
        *
        */
      },
      // js eslint-loader
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: path.resolve(__dirname, 'node_modules'), // 编译时，不需要编译哪些文件
        include: path.resolve(__dirname, 'src'), // 编译时，需要包含哪些文件
        options: {formatter: require('eslint-friendly-formatter')}
      },
      // 图片的url-loader
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader', // 添加url loader
        options: {
          limit: 100, // 当图片大小小于限制时会自动转成 base64 码引用
          name: 'img/[name]-[hash:7].[ext]' // 将图片生成到img文件夹
        }
      },
      //  视频音频文件 ulr-loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 当视频音频大小小于限制时会自动转成 base64 码引用
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      // 字体 url-loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader', // 添加字体
        options: {
          limit: 10000, // 表示文件大小小于限制时会自动转成 base64 码引用
          name: 'fonts/[name].[hash:7].[ext]'// 图片生成到指定目录
        }
      }
    ]
  }
}
// common.js 语法
module.exports = webpackConfig