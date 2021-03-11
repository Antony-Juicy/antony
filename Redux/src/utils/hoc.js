import React from 'react';
import store from '../store'
import Discover from '../views/Discover';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {myapi} from '@/utils/request';

// 定义高阶组件方式一：属性代理
export function withUser(InnerComponent) {
    // 参数为组件，并返回新的组件
    // return  function OuterComponent(props){
    //     let user=localStorage.getItem('name');
    //     try{
    //         user=JSON.parse(user)||{}
    //     }catch(e){
    //         user=user
    //     }

    //     return <InnerComponent user={user} {...props}></InnerComponent>
    // }

    return class OuterComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                user: {}
            }
        }
        componentDidMount() {
            let user = localStorage.getItem('name');
            try {
                user = JSON.parse(user) || {}
            } catch (e) {
                user = user;
            }
            this.setState({
                user
            })
        }
        render() {
            let {user}=this.state
           return <InnerComponent  user={user} {...this.props}></InnerComponent>
        }
    }
}

// 具有参数的高阶组件
export function withStorage(key){
    return function (InnerComponent){
        return function OuterComponent(props){
            let data = localStorage.getItem(key);
            try{
                data = JSON.parse(data) || {}
            }catch(e){
                data = data;
            }
            let propData = {
                [key]:data
            }
            return <InnerComponent {...propData} {...props} />
        }
   } 
    
}


// 使用
// App = withStorage('currentUser')(App)

// 定义高阶组件方式一：反向继承
// export const withStorage = (InnerComponent) => {
//     return class extends InnerComponent {
//       componentDidMount() {
//         let data = localStorage.getItem("data");
//         this.setState({ data });
  
//         // 调用父类生命周期函数，使之不被覆盖
//         super.componentDidMount();
//       }
  
//       render() {
//         // 调用父类render方法实现渲染
//         return super.render();
//       }
//     };
// };

// export function withStore(InnerComponent){
//     return class OuterComponent extends React.Component{
//         constructor(props){
//             super(props);
//             this.state=store.getState();
//         };
//         componentDidMount(){
//             store.subscribe(()=>{  // 监听修改
//                 this.setState(store.getState())
//             })
//         }
//       render(){
//     return <InnerComponent dispatch={store.dispatch} {...this.props} {...this.state}></InnerComponent>
// }
//     }
// }


// withStore('money','userInfo')(Discover)  使用
export function withStore(...keys){    // 这里是 'money','userInfo'   ... 变成数组
    return function(InnerComponent){  // 这里是 Discover
        return class OuterComponent extends React.Component{
            constructor(props){
                super(props);
               this.state=this.filterData()
                
            };
            componentDidMount(){
                store.subscribe(()=>{  // 监听修改
                    this.setState(this.filterData())
                })
            }

            // 过滤
            filterData(){
                let reduData=store.getState();
                let shareData={}
          
                keys.forEach(key=>{
                    shareData[key]=reduData[key]
                });
                return keys.length>0 ? shareData:reduData;
            }
            render(){
        return <InnerComponent dispatch={store.dispatch} {...this.props} {...this.state}></InnerComponent>
        }
    }
}
}

export function withLogin(InnerComponent) {
    const mapStateToProps = function(state){
        return {
            userInfo:state.user.userInfo
        }
    }
    const mapDispatchToProps = function(dispatch){
        return {
            logout(){
                dispatch({type:'logout'})
            }
        }
    }
    @connect(mapStateToProps,mapDispatchToProps)
    class OuterComponent extends React.Component{
        componentDidMount(){
            const {userInfo,logout,history,location} = this.props;
            // 校验token有效性
            myapi({
                url:'/user/verify',
                headers:{
                    Authorization:userInfo.Authorization
                }
            }).then(({data})=>{
                if(data.code === 400){
                    logout();
                    // history.push('/login?redirectTo='+location.pathname)
                    history.push({
                        pathname:'/login',
                        search:'?redirectTo='+location.pathname
                    })
                }
            })
        }
        
        componentWillUnmount(){
            // 取消ajax请求
        } 

        render(){
            const {userInfo} = this.props;
            if(userInfo._id){
                return <InnerComponent {...this.props} />
            }else{
                return <Redirect to={"/login?redirectTo="+location.pathname} />
            }
        }
    }
    return OuterComponent
}