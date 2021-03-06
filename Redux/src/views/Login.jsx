import React from 'react'
import { Form, Input, Checkbox, Button, message } from 'antd'
import { myapi,request}  from '@/utils/request'
import { connect } from 'react-redux';

import querystring from 'querystring'

import cryptoJS,{SHA256,enc} from 'crypto-js'  // 加密

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};


const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 16,
    },
};

const mapStateToProps = function (state) {
    return {}
}
const mapDispatchToProps = function (dispatch) {
    return {
        login(userInfo) {
            dispatch({ type: 'login', userInfo })
        }
    }
}

@connect(mapStateToProps,mapDispatchToProps)
class Login extends React.Component {
    state = {
        rules: {
            username: [
                {
                    required: true,
                    message: '请输入用户名',
                },
            ],
            password: [
                {
                    required: true,
                    message: '请输入密码',
                },
            ]
        }

    }
    onFinish = async (values) => {
        // console.log(values, 666);
        const { login,location,history } = this.props;
        let { username, password, md1 } = values;

        password=SHA256(password);
        password = enc.Hex.stringify(password)
        console.log('3',password)

    //    发请求
        const { data } = await myapi.get('user/login', {
            username,
            password, md1
        });

        if (data.code === 200) {
            login(data.data);
            // this.props.history.push('/mine')
            const {redirectTo='/mine'} = querystring.parse(location.search.slice(1))
            history.push(redirectTo)
        }else{
            message.error('用户名或密码错误')
        }
    };

    render() {
        const { rules } = this.state;
        return (
            <div>
                <Form style={{ padding: 60 }}
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}

                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={rules.username}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={rules.password}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>7天免登录</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            登录
                </Button>
                    </Form.Item>
                </Form>
            </div>
        )

    }
}



export default Login;

