import ActionButton from "antd/lib/modal/ActionButton"

// 数据持久化
// 刷新页面从新获取本地数据 ，并写入初始值state
let userInfo=localStorage.getItem('userInfo');
try{
    userInfo=JSON.parse(userInfo)||{}
}catch(err){
    userInfo={}
}

const initState = {
    userInfo

}

//  修改 state  纯函数 必须返回一个新的 state
const reducer = function (state = initState, action) {
    // 定义修改state的逻辑  格式
    switch (action.type) {
        case 'changeusername':
            return {
                ...state, userInfo: {
                    ...state.userInfo,
                    username: action.username
                }
            }
            case 'changemoney':
                return {
                    ...state, userInfo: {
                            ...state.userInfo,

                        },
                        money: action.money
                }
                case 'login':
                    return {
                        ...state,
                        userInfo: action.userInfo
                    }
                    // 存入本地
                    localStorage.setItem('userInfo',JSON.stringify(action.userInfo))
                    return{
                        ...state,
                        userInfo:action.userInfo
                    }
                    case 'logout':
                        localStorage.removeItem('userInfo')   // 退出移除
                        return { 
                            ...state,
                            userInfo: {

                            }
                        }
                        default:
                            return state;

    }

}


export default reducer;