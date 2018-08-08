const path = require('path')
// 引入安装后的插件，类似java中的import
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 把非js的东西单独打包成静态文件，如有些css要单独做浏览器缓存等
const ExtractPlugin = require('extract-text-webpack-plugin')

// 判断是否是开发环境
// 启动脚本时候，设置的环境变量都存在process.env里
const isDev = process.env.NODE_ENV === 'development'
const config = {
    // webpack编译目标是web平台
    target: 'web',
    // __dirname项目根目录，指定项目路口文件
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        // 把index.js里的依赖等设置打包成一个可以直接运行的js文件并输出到下方指定路径
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                // 正则表达式的.需要转义
                test: /\.vue$/,
                loader: 'vue-loader'

            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'

            },


            {
                test: /\.(gif|jpg|png|jpeg|svg)$/,
                use: [
                    {
                        // 把图片转化为base-64代码直接写在js里而不用生成一个新的文件，能够减少Http请求
                        // url-loader依赖于file-loader
                        loader: 'url-loader',
                        options: {
                            // 如果资源小于1024，则使用base-64方法处理
                            limit: 1024,
                            // 指定输出文件名字，[ext]——文件扩展名
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            // 在此处定义后，在我们自己写的Js代码中可以引用到
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

// 如果在开发环境下，就加些配置
if (isDev) {
    config.module.rules.push({
        // styl文件写样式可以不用在乎括号冒号等，比较简洁
        test: /\.styl/,
        use: [
            // 把css文件内容加入到html的style标签中
            'style-loader',
            // 从css文件读出内容
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                }
            },
            // 用来读取stylus文件处理后是css文件
            'stylus-loader'
        ]

    })
    // 帮助在页面上调试代码
    config.devtool = '#cheap-module-eval-source-map'
    // 写webpack-dev-server的配置
    // 启动后是一个服务，需要监听一个端口
    config.devServer = {
        port: '8000',
        host: '127.0.0.1',
        // 在webpack编译时如果有错误可以显示在网页上 
        overlay: {
            errors: true,
        },
        // open:true
        // 改了组件代码只重新渲染组件，而不刷新页面
        hot: true
    }
    // 需安装热模块代替相关插件
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // 减少一些不需要显示的错误信息展示
        new webpack.NoEmitOnErrorsPlugin()
    )
} else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    // 生产环境文件命名要用chunkhash,开发环境不能用
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            // stylus-loader编译后会生成sourceMap,因此postcss-loader可以直接使用，提升编译效率
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]


            })

        }
    )
    config.plugins.push(
        // 指定单独输出的css的名字（默认Vue中的css不会打包））
        new ExtractPlugin('styles.[contentHash:8].css'),
        // 指定单独输出js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // 在app.js中一些和webpack相关的代码单独打包（当有新的包插入后，webpack会给模块加入id,如果插入的包在中间，后面的id就会变化，就会导致打包出来的hash值变化，就会失去浏览器长缓存的效果）
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}
module.exports = config