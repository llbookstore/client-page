import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Typography, Form, Input, Button, message } from 'antd';
import * as actions from '../../actions/index'
import axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;

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
const Address = (props) => {
    const {
        user,
        userStore,
        onFullnameChange,
        onPhoneChange,
        onAddressChange,
        onNoteChange,
        onUpdateUser
    } = props;

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(user);
    }, [user, form])
    const onFinish = async (values) => {
        const { fullname, address, phone, note } = values;
        onFullnameChange(fullname);
        onPhoneChange(phone);
        onAddressChange(address);
        onNoteChange(note);
        if (address !== userStore.address) {
            onUpdateUser({ address: address });
            try {
                await axios.put(`/account/${userStore.account_id}`, { address: address })
            }
            catch (err) {
                console.log(err);
            }
        }
        message.success('Lưu thông tin thành công')
    }
    return (
        <div>
            <Title level={3} style={{ textAlign: 'center' }} > ĐỊA CHỈ</Title>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                style={{ width: '60%', margin: 'auto' }}
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="account_name"
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

                    <Input disabled />
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ giao hàng"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ!',
                        }
                    ]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="Ghi chú giao hàng"
                >
                    <TextArea />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                </Button>
                </Form.Item>
            </Form>
        </div >
    )
}
const mapStateToProps = (state) => {
    const { user } = state;
    return { userStore: user };
}
const mapDispatchToProps = (dispatch, state) => {
    return {
        onUpdateUser: (user) => {
            dispatch(actions.updateAccount(user));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Address);
