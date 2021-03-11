import React from 'react'
import { Route, Link, Redirect, Switch, NavLink, withRouter } from 'react-router-dom'
import Home from './views/Home'
import Login from './views/Login'
import Reg from './views/Reg'
import Discover from './views/Discover'
import Mine from './views/Mine'
import IQ from './views/IQ'

import { Menu, Layout, Row, Col, Button, Avatar } from 'antd';

import {
    HomeOutlined,
    LoginOutlined,
    UserOutlined,
    EyeOutlined,

} from '@ant-design/icons';


import { baseURL } from '@/utils/request'
// import userAction from './store/actions/user'
import 'antd/dist/antd.css'
import './App.scss';
import { connect } from 'react-redux'


function App(props) {
    // console.log(props);
    const currentPath = props.location.pathname
    const nav = [{
        path: '/home',
        text: '首页',
        name: 'home',
        icon:
            <HomeOutlined />

    }, {
        path: '/discover',
        text: '发现',
        name: 'discover',
        icon:
            <EyeOutlined />

    }, {
        path: '/mine',
        text: '我的',
        name: 'mine',
        icon: <UserOutlined />
    }
        // {
        //     path: '/login',
        //     text: '登录',
        //     name: 'login',
        //     icon:
        //         <LoginOutlined />

        // }, {
        //     path: '/reg',
        //     text: '注册',
        //     name: 'reg',
        //     icon:
        //         <UserOutlined />
        // }
    ];

    const changeMenu = function ({ key }) {
        // console.log(e);
        // 跳转
        props.history.push(key);

    }

    const goto = function (path, e) {
        console.log(path, 666, e);
        props.history.push(path)
    }

    return <Layout>
        <Layout.Header style={{ padding: 0 }}>
            {/* {
    nav.map(item=><NavLink key={item.name} to={item.path} // activeStyle={{color:'#f00',fontWeight:'bold'}}
        activeClassName='active'>{item.text}</NavLink>)
    } */}
            <Row gutter={10}>
                <Col span={16}>
                    <Menu mode="horizontal" theme="dark" onClick={changeMenu} defaultSelectedKeys={[currentPath]}>
                        {
                            nav.map(item => <Menu.Item key={item.path} icon={item.icon}>{item.text}</Menu.Item>)
                        }
                    </Menu>

                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    {
                         props.userInfo.username ?
                         <>
                    <Avatar
                        icon={<UserOutlined />}
                        src={baseURL + props.userInfo.avatar}
                        size="small"
                    ></Avatar>
                    <Button type="link" size="small" style={{ color: '#fff' }}>{props.userInfo.username}</Button>
                    <Button type="link" size="small" onClick={props.logout}>退出</Button>
                   </>
                    :
                    <>
                          <Button type="link" onClick={goto.bind(null, '/login?redirectTo='+props.location.pathname)}>登录</Button>
                                <Button type="link" onClick={goto.bind(null, '/reg')}>注册</Button>
                    </>
}
                </Col>

            </Row>



        </Layout.Header>
        {/* <HashRouter>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/reg" component={Reg} />
    </HashRouter> */}

        {/*
    <Link to='/home'>首页</Link>
    <Link to='/login'>登入</Link>
    <Link to='/reg'>注册</Link> */}

        {/* 精确匹配 重定向路由
    <Route path="/" component={Home} exact /> */}
        <Layout.Content>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/reg" component={Reg} />
                <Route path='/mine' component={Mine} />
                <Route path="/iq/:id" component={IQ} />
                <Route path="/notfound" render={() =>
                    <div>404</div>} />
                <Route path="/discover" component={Discover} />
                {/* 重定向路由 */}
                <Redirect from="/" to="/home" exact></Redirect>
                {/*
            <Redirect from="*" to="/notfound" /> */}
                <Redirect to="/notfound" />
                {/* 404 */}
            </Switch>
        </Layout.Content>
    </Layout >
}

const mapStateToProps = function (state) {
    return {
        userInfo: state.user.userInfo
    }
}

const mapDispatchToProps=function(dispatch){
     return {
        // login(){
        //     dispatch(login())
        // },
        logout(){
            dispatch({ type: 'logout' })
        }
    }
}
App = connect(mapStateToProps,mapDispatchToProps)(App)

//withRouter 高阶组件
App = withRouter(App) // 获取history: location: createHref: ƒ, push: ƒ, …}
export default App;