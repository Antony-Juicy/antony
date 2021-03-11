import React from 'react'
import request, { baseURL } from '@/utils/request';
import { Avatar,Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import querystring from 'querystring';
// const querystring = require('querystring')
import './style.scss';

class IQ extends React.PureComponent {
    state = {
        data: {}
    }

    // 获取id 发请求 
    async componentDidMount() {
        // console.log('IQ.props',this.props)
        let {match:{params:{id}},location:{search}} = this.props;
        const { data: { data } } = await request.get('/iq/' + id)
        this.setState({
            data
        });

          // 处理search参数
          search= search.slice(1);
          const res = querystring.parse(search);
          console.log('res',res);
  
         
    }
    render() {
        const { data } = this.state
        return (
            <div>
                <h1>{data.question}</h1>
                <div>
                    {/* 判断user 是否存在 */}
                    {data.user ?
                        <>
                            <Avatar
                                icon={<UserOutlined />}
                                scr={baseURL + data.user.avatar}
                                size="small"
                            ></Avatar>{data.user.username}
                        </>
                        :
                        null
                    }
                    {data.hot}浏览
                    难度:<Rate disabled value={data.difficulty}></Rate>
                </div>
            </div>
        )

    }
}
export default IQ;