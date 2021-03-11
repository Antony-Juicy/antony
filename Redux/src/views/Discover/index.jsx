import React from 'react'
import { Menu, Layout, Button } from 'antd';


// import store from '../../store'

import Vue from './Vue'
import ReactComponent from './React'
import Node from './Node'
import jQuery from './jQuery'
import { Redirect, Route, Switch } from 'react-router-dom'

import { withUser, withStorage,withStore } from '@/utils/hoc'


// ES7装饰器
// @withUser // 类组件高阶组件 获取写法 需要安装模块
// @withStorage('token') // 参数高阶组件获取
@withStore()

class Discover extends React.Component {
    state = {
        menu: [{
            path: '/vue',
            text: 'Vue'
        }, {
            path: '/react',
            text: 'React'
        }, {
            path: '/node',
            text: 'NodeJS'
        }, {
            path: '/jq',
            text: 'jQuery'
        }],
        current: '/vue'


    }
    goto = (e) => {
        const { key } = e;
        const { url } = this.props.match
        this.props.history.push(url + key);
    }
    componentDidMount() {
        // store.subscribe(()=>{  // 监听
        //    this.forceUpdate() //获取最新的数据
        //     })

    }
    render(props) {
        const { menu, current } = this.state;
        const { match} = this.props;

        console.log('Discover.props', this.props)
        return (
            <div>
                <Layout style={{ backgroundColor: '#fff', margin: '0 -20px' }} >
                    <Layout.Sider>
                        <Menu
                            onClick={this.goto}

                            defaultSelectedKeys={[current]}
                            mode="inline"
                        >
                            {menu.map(item => <Menu.Item key={item.path}>{item.text}</Menu.Item>)}

                        </Menu>

                    </Layout.Sider>
                    <Layout.Content style={{ padding:20}}>
                        {/* <Button type='primary' onClick={()=>{
                            let action={type:'changeusername',username:"laoxie"}
                           dispatch(action) //  触发修改
                        }}>{user.userInfo.username}</Button>
                           <Button type='primary'ghost onClick={()=>{
                            let action={type:'changemoney',money:user.money+1000}
                           dispatch(action) //  触发修改
                        }}>{user.money}</Button> */}
                        <Switch>
                            <Route path={match.path + '/vue'} component={Vue}></Route>
                            <Route path={match.path + '/react'} component={ReactComponent}></Route>
                            <Route path={match.path + '/node'} component={Node}></Route>
                            <Route path={match.path + '/jq'} component={jQuery}></Route>
                            <Route path={match.path + '/vue'} component={Vue}></Route>
                            <Route path={match.path + '/nf'} render={() => <div>404</div>} />
                            <Redirect from={match.path} to={match.path + '/vue'} exact />
                            <Redirect to={match.path + '/nf'} />
                        </Switch>
                    </Layout.Content>
                </Layout>
            </div>
        )
    }
}

// Discover = withUser(Discover)

export default Discover;