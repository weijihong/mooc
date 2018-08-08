# mooc

## [1.Vue+Webpack打造todo应用](https://www.imooc.com/learn/935)

#### 1.1 学习目的

通过webpack+vue2的配置运行一个vue的工程，并使用vue开发一个简单的项目

Webpack: 打包所有资源，脚本的工具，模块化...

Vue2：一款渐进式JavaScript框架，特点：数据绑定，把对dom的操作转化为对数据的操作，组件化开发（数据变化后，会执行render方法更新html内容）

#### 1.2 学习内容

- es6语法
- vue父子组件通信，计算属性（数据变动才会再次计算，否则使用缓存）
- Webpack配置前端工程
- Webpack打包优化

#### 1.3 打包过程

1. 新建文件夹，执行`npm init`，让npm管理这个文件夹（以便后期安装我们所需要的包）

2. `npm i webpack vue vue-loader` 安装webpack，vue，vue-loader(用来加载.vue格式文件)，安装后命令行可能会提醒你安装相关依赖，需根据提示安装后即可

3. 新建src目录放置源码，在其下新建app.vue，每个vue文件就是一个组件

4. 在根目录新建webpack.config.js，设置entry路口为/src/index.js，在index.js里进行挂载到html上（项目启动会识别package.json，所以我们要需要在package.json中添加脚本`"build":  "webpack --config webpack.config.js"`才能执行webpack.config.js）

5. 在webpack.config.js里用正则为.vue类型声明loader：

   ```
     module: {
           rules: [
               {
                   test: /\.vue$/,
                   loader: 'vue-loader'
               },
   ```

   关于rules还有很多规则需要加载（如.css，图片资源….）

6. 执行`npm run build` 进行打包，在根目录下生成 /dist/bundle.js

#### 1.4 webpack-dev-server（用于开发环境）

- 安装 cross-env（解决不同平台启动dev-server命令不同问题）:	npm i cross-env

- 在package.json中添加脚本

  ```json
  "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
      "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  ```


- 判断如果是开发环境，加入一些开发环境配置
- 需要一个html文件（作为入口）容纳之前打包好的js，需要安装插件：`npm i html-webpack-plugin` 然后在webpack.config.js中进行引入并完成相关配置
- 执行`npm run dev` 后，在浏览器访问：`127.0.0.1:8000` 访问 

#### 1.5 正式使用VUE2进行项目开发（见业务逻辑代码）

#### 1.6 webpack配置优化

> 由于打包后生成一个js文件，里面包含了css，类库代码，业务代码等复杂代码
>
> 但是有些css可能需要单独作为浏览器缓存（减少服务器流量，用户加载速度加快）
>
> 以及vue.js源码这类稳定性较高的代码也应该单独打包成一份，在浏览器中进行产长缓存，减少每次重复编译的时间

##### .css文件优化

##### 单独打包类库文件

##### chunkhash和hash的区别

生成环境一定要使用chunkhash因为使用hash生成的串是一样的，当业务代码改变，类库也会重新编译，就没意义了。



------

