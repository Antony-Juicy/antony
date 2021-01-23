import Vue from 'vue';

// 引入;
import VueRouter from "vue-router";

import Home from '../views/Home.vue';

import Reg from '../views/Reg.vue';

import Login from '../views/Login.vue';

import Cart from '../views/Cart.vue';

import Discover from '../views/Discover.vue';
// 二级路由
import Omg from '../views/Discover/Omg.vue'
import Kdy from '../views/Discover/Kdy.vue'
import Lls from '../views/Discover/Lls.vue'
import Tissot from '../views/Discover/Tissot.vue'

import Goods from '../views/Goods.vue';


import NotFound from '../views/NotFound.vue'



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
    },{  //重定向
        path:'/',
        redirect:'/home'
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
        name: 'cart',
        // 定义时传参：props
        // 1. Boolean方式：等效于<Cart v-bind="$route.params" />
        // props:true,
        // 2. Object方式：等效于<Cart v-bind="{pageName:'CartPage',step:1}" />
        // props:{pageName:'CartPage',step:1},
        // 3. Function方法：把函数返回值作为props
        // props:function(){
        //     return {
        //         a: true,
        //         b: false,
        //         c: 100
        //       }
        // },
        component: Cart

    }, {
        //  当浏览器地址为/home时 ，渲染Home组件内容
        path: "/discover",

        component: Discover,
        redirect: { name: 'omg' },

          // 子路由 二级
        children: [
            {
              path: '/omg',
              name: 'omg',
              component: Omg
            },
            {
              path: '/kdy',
              name: 'kdy',
              component: Kdy
            },
            {
              path: '/lls',
              name: 'lls',
              component: Lls
            },
            {
              path: '/tissot',
              name: 'tissot',
              component: Tissot
            }
          ]
      
    },{
        name: 'goods',
        path: '/goods/:id', // 路径匹配/goods/xxx这个格式时，才渲染Goods组件
        component: Goods
    },{
        path: '/notfound',   //  404 跳转
        name: 'NotFound',
      
        component: NotFound
    },
    {
        path:'/*',
        redirect:{  //   没定义到组件都跳到  404 NotFound页面
            name:'NotFound'
        }
    }
]
});

// 全局路由守卫
// 开始导航
router.beforeEach(function (to, from, next) {
    console.log('beforeEach=', to.path, from.path);
    next();
  })
  
  // 确认导航
  router.beforeResolve((to, from, next) => {
    console.log('beforeResolve=', to.path, from.path);
    next();
  })
  // 结束导航 没有 next
  router.afterEach(function (to, from) {
    console.log('afterEach=', to.path, from.path);
  })
  

export default router; // 导出路由