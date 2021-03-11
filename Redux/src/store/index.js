import {createStore} from 'redux'

import reducer from './reducer'

// const initState={
//     userInfo:{
//         username:"jingjing",
//         password:123,
//         role:'svip'
//     },
//     money:300000
// }

// //  修改 state  纯函数 必须返回一个新的 state
// const reducer=function (state=initState,action){
//     // 定义修改state的逻辑  格式
//     switch(action.type){
//         case 'changeusername':
//             return {
//                 ...state,userInfo:{
//                     ...state.userInfo,
//                     username:action.username
//                 }
//             }
//         case 'changemoney':
//           return {
//             ...state,userInfo:{
//                 ...state.userInfo,
               
//             },
//             money:action.money
//           }
//           case 'changeuser':
//               return {
//                   ...state,
//                   userInfo:action.userInfo
//               }

//     }
//     return state;
// }

//  创建 store
const store =createStore(reducer)  

// 监听修改,state只要有修改 就执行回调函数
store.subscribe(()=>{
console.log(666,store.getState()); //获取最新的数据
})


// console.log(store);
console.log(store.getState());

export default store;