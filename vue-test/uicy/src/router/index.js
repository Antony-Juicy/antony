import Vue from 'vue';

// 引入;
import VueRouter from "vue-router";

import Home from '../views/Home.vue';

import Reg from '../views/Reg.vue';

import Login from '../views/Login.vue';

import Cart from '../views/Cart.vue';

import Discover from '../views/Discover.vue';

import Goods from '../views/Goods.vue';



//2.使用  

Vue.use(VueRouter);


// 实例
const router = new VueRouter({
    // mode:'hash', // history  上线需要改成 http://localhost:8080/home


    //3.配置
    routes: [{
        //  当浏览器地址为/home时 ，渲染Home组件内容
        path: "/home",

        component: Home
    }, {
        //  当浏览器地址为/home时 ，渲染Home组件内容
        path: "/reg",

        component: Reg
    }, {
        //  当浏览器地址为/home时 ，渲染Home组件内容
        path: "/login",

        component: Login
    }, {
        //  当浏览器地址为/home时 ，渲染Home组件内容
        path: "/cart",

        component: Cart
    }, {
        //  当浏览器地址为/home时 ，渲染Home组件内容
        path: "/discover",

        component: Discover
    },{
        name:'goods',
        path:'/goods/:id', // 路径匹配/goods/xxx这个格式时，才渲染Goods组件
        component: Goods
    }]
});

export default router; // 导出路由