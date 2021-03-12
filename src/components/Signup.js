import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Form,
    Input,
    message,
    Select,
    Radio,
    Button,
    DatePicker,
} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import * as commonFunc from '../ultils/common'
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const Signup = (props) => {
    const { covertToLogin, isUpdateAccount, title, userInfo, onUpdateUser } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        const userValue = {};
        if (userInfo.account_name) userValue.username = userInfo.account_name;
        if (userInfo.full_name) userValue.fullname = userInfo.full_name;
        if (userInfo.email) userValue.email = userInfo.email;
        if (userInfo.gender === 0 || userInfo === 1) 
        {
            userValue.gender = `${userInfo.gender}`;
        }
        if (userInfo.phone) userValue.phone = userInfo.phone;
        if (userInfo.birth_date) userValue.birth_date = moment(`${userInfo.birth_date}`, 'DD/MM/YYYY');
        form.setFieldsValue(userValue);

    }, [userInfo])

    const onFinish = async (values) => {
        let { email, fullname, gender, username, password, phone, birth_date } = values;
        birth_date = commonFunc.momentObjectToDateString(birth_date, 'DD/MM/YYYY');
        try {
            if (!isUpdateAccount) { //đăng ký
                const data = { email, fullname, gender, username, password, phone, birth_date };
                const res = await axios.post('/account', data);
                const { code, msg, status } = res.data;
                if (code === '410') message.warning(msg);
                if (status === 1) {
                    message.success(`${title} tài khoản thành công!`);
                    message.info('Mời bạn đăng nhập')
                    form.resetFields();
                    covertToLogin('1');//change tabs pain (key 1)
                }
            } else {
                const data = { email, fullname, gender, phone, birth_date };
                const { account_id } = userInfo;
                const res = await axios.put(`/account/${account_id}`, data);
                const { status } = res.data;
                onUpdateUser(data);
                if (status === 1) {
                    message.success(`${title} tài khoản thành công!`);
                }
            }
        } catch (err) {
            console.log(err);
            message.error(`Có lỗi! Hiện tại không thể ${title}!`);
        }
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="username"
                label={
                    <span>
                        Tên tài khoản
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên tài khoản!',
                        whitespace: true,
                    },
                    {
                        min: 6,
                        max: 20,
                        message: 'tên tài khoản phải lớn hơn 6 ký tự và nhỏ hơn 20 ký tự'
                    }
                ]}
            >

                <Input autoFocus disabled={isUpdateAccount} />
            </Form.Item>

            <Form.Item
                name="fullname"
                label={
                    <span>
                        Họ và tên
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập họ và tên!',
                        whitespace: true,
                    }
                ]}
            >
                <Input />
            </Form.Item>
            {
                !isUpdateAccount &&
                <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu!',
                        },
                        {
                            min: 6,
                            max: 50,
                            message: 'Mật khẩu từ 6-50 ký tự.'
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
            }
            { !isUpdateAccount &&
                <Form.Item
                    name="confirm"
                    label="Xác nhận mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập lại mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject('Mật khẩu không khớp!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            }
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'Email không hợp lệ!',
                    },
                    {
                        required: true,
                        message: 'Vui lòng nhập E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số điện thoại!',
                    },
                    {
                        pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                        message: 'Số điện thoại không hợp lệ!'
                    }
                ]}
            >
                <Input
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Giới tính"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn giới tính!',
                    }
                ]}
            >
                <Radio.Group>
                    <Radio value="0">Nam</Radio>
                    <Radio value="1">Nữ</Radio>
                </Radio.Group>

            </Form.Item>

            <Form.Item
                name="birth_date"
                label="Ngày sinh"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập số ngày sinh!'
                    },
                ]}
            >
                <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            {/* <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('B'),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                   Tôi đã đọc và đồng ý với <a href="">điều khoản</a>
                </Checkbox>
            </Form.Item> */}
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    {title}
                </Button>
            </Form.Item>
        </Form>
    )
}

const mapStateToProps = (state) => {
    return { userInfo: state.user }
}
const mapDispatchToProps = (dispatch, state) => {
    return {
        onUpdateUser: (user) => {
            dispatch(actions.updateAccount(user));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);