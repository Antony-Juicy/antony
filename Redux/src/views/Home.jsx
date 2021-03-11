import React from 'react'
import { withUser } from '@/utils/hoc'
import request from "@/utils/request"
import { List } from 'antd'
import { RightOutlined } from '@ant-design/icons'

// function Home(props){
// request.get('/iq').then(res=>{
//     console.log(res);
// })
//     return (
//         <div>
//             Home
//         </div>
//     )
// }

// 类组件 更新
class Home extends React.PureComponent {

    state = {
        newList: []
    }
    // 实例方法
    getData = () => {

    }
    // 原型方法 传参数
    goto = (path) => {
        // this.props.history.push(path);
        
        this.props.history.push({
            pathname:path,
            search:'?id=123&a=10',
            state:{ //刷新后数据没有了
                username:'laoxie',
                password:123456
            },
          
        });

    }

    async componentDidMount(props) {
       
        const { data } = await request.get('/iq')
        this.setState({
            newList: data.data.result
        });
        console.log(this.props);
    }
   
    render() {
        const { newList } = this.state;
        return (
            <div>
                <h4>最新面试题</h4>
                <List
                    itemLayout="horizontal"
                    dataSource={newList}
                    split  // 分割线
                    // Render Props
                    renderItem={item => (
                        <List.Item onClick={this.goto.bind(this, '/iq/' + item._id)}>
                            <List.Item.Meta
                                title={<>{item.question}</>}
                                description={<div>{item.hot}浏览 {item.answer}回答</div>}
                            />
                            <div><RightOutlined /></div>
                        </List.Item>
                    )}
                />
            </div>
        )

    }


}

Home = withUser(Home)
export default Home;