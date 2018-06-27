const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// 使用 webpack 了，在命令行中输入  node_modules/.bin/webpack 
// 或者你嫌麻烦,要在package.json"start": "webpack"...(详情查看本项目里面的webpack：从入门到真实项目配置.mhtml) 之后你要使用webpack,只有npm run start即可
module.exports = {
    entry: './app/index.js', // 入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
        filename: 'bundle.js', // 打包后输出文件的文件名
        publicPath: 'build/', // 知道如何寻找资源
    },
    module: {
        rules: [ // 规则
            { // 我个人觉得是针对js文件的编译
                test: /\.js$/, // js 文件才使用bable(使用 ES2015/16/17 写代码而不用顾忌浏览器的问题，Babel 可以帮你转换代码)  babel安装: npm i --save-dev babel-loader babel-core babel-preset-env

                use: 'babel-loader', // 使用哪个loader    要注意.babelrc文件

                exclude: /node_modules/, // 不包括路径

                
            },
            { // 图片正则
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,

                use: [
                    {
                        loader: 'url-loader',

                        //配置url-loader的可选项
                        options: {
                            // 限制图片大小 10000B, 如果小于限制会将图片转换为base64格式
                            limit: 10000,

                            //超出限制,创建的文件格式
                            //build/images/[图片名].[hash].[图片格式]
                            name: 'images/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            // {   // 个人理解是使用css 运行后我们在 addImage.css 文件中写的代码被加入到了 style 标签中，并且因为我们开启了 CSS 模块化的选项，所以 .test 被转成了唯一的哈希值，这样就解决了 CSS 的变量名重复问题,但是将 CSS 代码整合进 JS 文件也是有弊端的，大量的 CSS 代码会造成 JS 文件的大小变大，操作 DOM 也会造成性能上的问题，所以接下来我们将使用 extract-text-webpack-plugin插件将 CSS 文件打包为一个单独文件
            //     test: /\.css$/,

            //     use: [
            //             'style-loader', {
            //                 loader: 'css-loader',
            //                 options: {
            //                     modules: true
            //                 }
            //             }
            //         ]
            // }




            // {  // 运行失败!!!!
            //     test: /\.css$/,

            //     loader: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',

            //         use: [
            //                 {
            //                     loader: 'css-loader',
            //                     options: {
            //                         modules: true
            //                     }
            //                 }
            //         ]

            //     })

               
            // }
            //注意!!! 如果编译过程中遇到DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead 错误,则在命令窗口输入
            // npm install extract-text-webpack-plugin@next即可!!!
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: { 
                            modules: true
                        }
                    }]
                })
            },
        ]
    },

    // // 插件列表
    // plugins: [
    //   // 输出的文件路径
    //   new ExtractTextPlugin("css/[name].[hash].css")
    // ]
    plugins: [
        new ExtractTextPlugin("css/[name].[hash].css")
      ]
}