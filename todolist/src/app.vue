<template>
   <div id="app">
       <Header></Header>
       <Todo></Todo>
       <Footer></Footer>

   </div>
</template>

<script>
import Header from './todo/header.vue';
import Footer from './todo/footer.jsx';
import Todo from './todo/todo.vue'
export default {
    components:{
        Header,
        Footer,
        Todo
    }

};
</script>

<style scoped lang="stylus">
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
</style>