// postcss帮助我们后处理css（把stylus文件编译成css后去优化css代码）
// 优化过程通过一系列组件去优化
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins:[
        // 自动加浏览器前缀，如web-kit等
        autoprefixer()
    ]
}