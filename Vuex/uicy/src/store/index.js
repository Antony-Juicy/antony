import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
// import {request} from '../utils'
import user from './cart'
import cart from './user'

Vue.use(Vuex);

const store=new Vuex.Store({
    // 全局数据
    state:{a:10,b:20},
    getters:{total(state){
        return state.a+state.b;
    }},
    mutations:{},
    actions:{},

    // 模块
    modules:{
        user,
        cart
    }
})

// // 数据持久化：利用本地存储+Vuex实现
// let user = localStorage.getItem('user');
// try {
//     user = JSON.parse(user) || {};
// } catch (err) {
//     user = {}
// }



// 实例化一个store: 存储仓库
// const store = new Vuex.Store({
//     // 共享数据
//     state: {
//         user,
//         // products: [{
//         //         id: 1,
//         //         name: '鼠标',
//         //         price: 20
//         //     },
//         //     {
//         //         id: 2,
//         //         name: '键盘',
//         //         price: 40
//         //     },
//         //     {
//         //         id: 3,
//         //         name: '耳机',
//         //         price: 60
//         //     },
//         //     {
//         //         id: 4,
//         //         name: '显示屏',
//         //         price: 80
//         //     }
//         // ],
//     },
//     // 判断 是否登录
//     getters: {
//         isLogin(state) {
//             return !!state.user._id;
//         },
//         // 总价
//         // totalPrice(state) {
//         //     return state.products.reduce((prev, item) => prev + item.price, 0);
//         // }
//     },
//     // 修改数据
//     mutations: {
//         login(state, user) { // 退出清除数据

//             console.log('mutation=', state, user)
//             state.user = user;

//             // 存入本地
//             localStorage.setItem('user', JSON.stringify(user));

//         },
//         // 退出 清空
//         logout(state) {
//             state.user = {}
//             localStorage.removeItem('user');
//         }
//     },


//     //  异步操作
//     actions: {
//       async login(context,payload){
//         const {
//             data
//         } = await request.get("/user/login", {
//             params: payload,
//         });
//         if (data.code == 200) {
//             // 跳转
//            router.replace("/home");
           

//             // 把用户信息保存到vuex
//             context.commit('login', data.data);
//         } else {
//             // this.$message.error("用户名或密码错误");
//             this.errMsg = '用户名或密码错误';
//         }
//       }
       
//     }

// })

export default store;