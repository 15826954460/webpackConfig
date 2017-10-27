/**
 * Created by 柏松 on 2017/10/7.
 */
const path = require('path')
const webpack = require('webpack')
// 清理插件
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    app: './src/index.js' // 入口文件
  },
  output: {
    filename: 'js/[name].bundle.js', // 打包后的文件名（指定生成到js目录下）
    path: path.resolve(__dirname, 'dist'),
    publicPath: './' // 公用路径(注释：这里只配置html的路径，css路径请手动更改)
  },
  // 通用插件
  plugins: [
    // 每次构建之前清理dist文件夹，只会生成使用过的文件
    new CleanWebpackPlugin(['dist']),
    // 删除重复的依赖关系
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // Specify the common bundle's name.
    }),
    /*
     添加html插件(会自动添加所有的软件包:及对一些js的引用)
     HtmlWebpackPlugin中所有的参数都将保存在HtmlWebpackPlugin.options对象中
     在页面中可以通过模板语法直接来获取 <%= htmlWebpackPlugin.options.xxx 来获取显示>
     */
    new HtmlWebpackPlugin({
      // date: new Date(), // 这里指做演示用
      title: 'product', // 设置title（基本没什么用）
      template: 'index.html', // 基于index.html来生成才能的文件
      filename: 'index.html', // 指定生成的文件目录名（可以是hash: index-[hash].html）
      inject: 'body', // 指定所有加载的文件放在哪个标签里面 （这里放在body标签里面)
      /*
       * 注：chunks一般只在多页面应用中使用
       */
      // chunks: ['app', 'math'], // 指定给html所需要引入的js(这里引入两个js)
      excludeChunks: ['math'], // 表示引入除了math之外的js（该demo中和上面的chunks效果一样）
      // html文件压缩配置
      minify: {
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格
        removeAttributeQuotes: true // 删除特殊属性
      }
    })
    /*
     * 这里可以生成多页面应用，可以根据不同的页面对应处理
     */
    // new HtmlWebpackPlugin({
    //  // date: new Date(), // 这里指做演示用
    //  title: 'product', // 设置title（基本没什么用）
    //  template: 'home.html', // 基于index.html来生成才能的文件
    //  filename: 'home.html', // 指定生成的文件目录名（可以是hash: index-[hash].html）
    //  inject: 'body',// 指定所有加载的文件放在哪个标签里面 （这里放在body标签里面)
    //  chunks: ['math'], //  指定给html所需要引入的js(这里只引入math.js)
    //  // html文件压缩配置
    //  minify: {
    //    // removeComments: true,  // 删除注释
    //    // collapseWhitespace: true, // 删除空格
    //    // removeAttributeQuotes: true
    //  }
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader', // 添加url loader
            options: {
              limit: 10000, // 限制图片大小
              name: 'img/[name]-[hash:7].[ext]' // 将图片生成到img文件夹
            }
          }
        ]
      },
      // ulr-loader 视频音频文件
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: path.resolve(__dirname, 'node_modules'), // 编译时，不需要编译哪些文件
        include: path.resolve(__dirname, 'src'), // 编译时，需要包含哪些文件
        options:
            {
              formatter: require('eslint-friendly-formatter')
            }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'), // 编译时，不需要编译哪些文件
        include: path.resolve(__dirname, 'src')// 编译时，需要包含哪些文件
        /*
        *query: {
        *      presets: ['latest'] //按照最新的ES6语法规则去转换
        *}
        *
        */
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'url-loader', // 添加字体
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'// 图片生成到指定目录
        }
      }
    ]
  }
}