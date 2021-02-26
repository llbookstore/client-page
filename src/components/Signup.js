import React, { useState } from 'react';
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
export default function Signup(props) {
    const { covertToLogin } = props;
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let { email, fullname, gender, username, password, phone, birth_date } = values;
        birth_date = moment(birth_date, 'DD/MM/YYYY').format('DD/MM/YYYY');
        console.log(birth_date)
        const data = { email, fullname, gender, username, password, phone, birth_date };
        try {
            const res = await axios.post('/account', data);
            console.log('res', res);
            const { code, msg, status } = res.data;
            if(code === '410') message.warning(msg);
            if(status === 1) {
                message.success('Đăng ký tài khoản thành công!');
                message.info('Mời bạn đăng nhập')
                form.resetFields();
                covertToLogin('1');//change tabs pain (key 1)
            }
        } catch (err) {
            console.log(err);
            message.error('Có lỗi! Hiện tại không thể đăng ký!');
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
                ]}
            >
                <Input autoFocus/>
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
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                    Đăng ký
              </Button>
            </Form.Item>
        </Form>
    )
}
