import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import jwt from 'jsonwebtoken'

import * as actions from '../actions'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const Login = (props) => {
    const [form] = Form.useForm();
    const { handleVisibleModal, onGetUserData } = props;
    const onFinish = async (values) => {
        try {
            const { username, password } = values;
            const res = await axios.post('/login', { username, password });
            const { status, code, data } = res.data;
            if (status === 0) message.error('Tên tài khoản hoặc mật khẩu không chính xác.');
            if (data.token) {
                message.success('Đăng nhập thành công!');
                //get user data
                const { userId } = jwt.decode(data.token);
                const userData = await axios.get(`/account/${userId}`);
                sessionStorage.setItem('token', JSON.stringify(data.token));
                sessionStorage.setItem('userData', JSON.stringify(userData.data.data));
                onGetUserData(userData.data.data);
                //remove fields
                form.resetFields();
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                handleVisibleModal(false);
            }
        } catch (err) {
            console.log(err);
            message.error('Không thể đăng nhập lúc này!');
        }
    };

    return (
        <Form
            {...layout}
            form={form}
            name="login"
            onFinish={onFinish}
        >
            <Form.Item
                label="Tên tài khoản"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Tên tài khoản không được để trống',
                    },
                    {
                        min: 6,
                        message: 'Tên tài khoản phải có ít nhất 6 ký tự!'
                    }
                ]}
            >
                <Input autoFocus/>
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Mật khẩu không được để trống!',
                    },
                    {
                        min: 6,
                        max: 50,
                        message: 'Mật khẩu từ 6-50 ký tự!'
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    )
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetUserData : (user) => {
            dispatch(actions.getUserInfo(user));
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);