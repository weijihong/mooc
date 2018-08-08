import './assets/styles/global.styl'
//静态资源需要import才能用
import Vue from 'vue'
import App from './app.vue'




const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    // 声明组件渲染出来的是App的内容，后面还需要挂载到html上
    render: (h) => h(App)
    // 通过$mount挂在到root节点
}).$mount(root)
