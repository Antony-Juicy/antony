import { Button } from 'antd'
import React from 'react'
import {connect } from 'react-redux'
import { withLogin } from '../utils/hoc';

// 映射数据到组件props
const mapStateToProps=function(state){    // state: redux中的state
    return {
        userInfo:state.userInfo,
        className:2021
    };
}
// 映射修改方法到组件props（默认映射dispatch到组件）
const mapDispatchToProps=function(dispatch){  // 第一个参数默认 dispatch
    return {
        // dispatch,
       changeUser(userInfo){
        dispatch({
                type:'changeuser',
                userInfo
            })
        }
    }
}

@withLogin
@connect(mapStateToProps,mapDispatchToProps)
class Mine extends React.Component{
   
    render(props){
        console.log('Mine.props',this.props)
        const {userInfo,dispatch,changeUser} = this.props;
     
        return (
            <div>
                Mine
                 <Button onClick={()=>{
                    //  dispatch({ type:'changeuser',
                    //      userInfo:{username:'laoxie',password:123456,role:'admin'}})
                    changeUser({username:'laoxie',password:123456,role:'admin'})
                 }} >{JSON.stringify(userInfo)}</Button>
            </div>
        )
    }
}

// mapStateToProps: 映射数据到组件props
// mapDispatchToProps：映射修改方法到组件props（默认映射dispatch到组件）
// Mine=connect(mapStateToProps,mapDispatchToProps)(Mine)

export default Mine;