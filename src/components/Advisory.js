import React, { useState } from 'react'
import {
    Modal,
    Form,
    Button,
    Input,
    message
} from 'antd'
import { callApi } from '../utils/callApi'
import './Advisory.css'

const { TextArea } = Input;
export default function Advisory() {
    const [showAdvisory, setShowAdvisory] = useState(false);
    const [form] = Form.useForm();
    const onFinish = async({ full_name, phone, note, address }) => {
        const data = { username: full_name, phone, address, user_note: note };
        try {
            const res = await callApi(`/advisory`, 'POST', data);
            if(res && res.status === 1){
                message.success('GỬI THÀNH CÔNG! Chúng tôi sẽ liên hệ với bạn sớm nhất, cám ơn bạn!', 1.5)
                setShowAdvisory(false);
            }
            else {
                message.warn('Có lỗi xảy ra');
            }

        } catch (err) {
            message.warn('Hệ thống đang xảy ra lỗi! Bạn vui lòng thử lại sau.')
        }
    }
    return (
        <div>
            <p className="BtnPopupSupport" onClick={() => setShowAdvisory(true)} >Đăng ký nhận tư vấn</p>
            <Modal
                visible={showAdvisory}
                footer={null}
                onCancel={() => setShowAdvisory(false)}
                title='Đăng ký nhận tư vấn miễn phí!'
            >
                <Form
                    name='advisory_form'
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError
                // initialValues={{}}
                >
                    <Form.Item
                        name='full_name'
                        rules={[{ required: true, message: 'Họ và tên không được để trống!' }]}
                    >
                        <Input autoFocus placeholder="Họ và tên" />
                    </Form.Item>
                    <Form.Item
                        name='phone'
                        rules={
                            [
                                { required: true, message: 'Số điện thoại không được để trống!' },
                                { pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g, message: 'Số điện thoại không hợp lệ!' },
                            ]
                        }
                    >
                        <Input placeholder="Số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        name='address'
                        rules={
                            [
                                { max: 255, message: 'Địa chỉ không thể vượt quá 255 ký tự!' },
                            ]
                        }
                    >
                        <Input placeholder='Địa chỉ' />
                    </Form.Item>
                    <Form.Item
                        name='note'
                        rules={
                            [
                                { required: true, message: 'Ghi chú tư vấn không được để trống!' },
                                { max: 255, message: 'Ghi chú tư vấn không thể vượt quá 255 ký tự!' },
                            ]
                        }
                    >
                        <TextArea placeholder="Nội dung cần tư vấn" rows={5} />
                    </Form.Item>
                    <div style={{ display: 'flex' }}>
                        <Button
                            type='primary'
                            value='Đăng ký'
                            htmlType='submit'
                            style={{
                                backgroundColor: 'yellowgreen',
                                borderColor: 'yellowgreen',
                                width: '50%',
                                borderRadius: '5em',
                                margin: '0 auto',
                                textAlign: 'center',
                            }}
                        >
                            Đăng ký
                    </Button>
                    </div>
                </Form>
                {/* <div className='framePopup popupSupport'>
                    <div className="wrapContent">
                        <div className="content">
                            <button className="bntClose" onClick={() => setShowAdvisory(false)}></button>
                            <div className={statusSubmit ? "wrap dnone" : "wrap"}>

                                <h3 className="textBlack">Đăng ký nhận tư vấn miễn phí!</h3>
                                <form>
                                    <div className="wrapInput">
                                        <input type="text" value={''} placeholder="Họ và tên" onChange={(event, value) => this.handleChange(event, 'fullname')} />
                                    </div>
                                    <div className="wrapInput">
                                        <input type="text" value={''} placeholder="Số điện thoại" onChange={(event, value) => this.handleChange(event, 'tel')} />
                                    </div>
                                    <div className="wrapInput">
                                        <textarea name="" value={'ss'} placeholder="Nội dung cần tư vấn" onChange={(event, value) => this.handleChange(event, 'contentSupport')}></textarea>
                                    </div>
                                </form>
                                <a className="frameButton bgGreen1" >Đăng ký</a>
                            </div>
                            <div className={statusSubmit ? "thongBao" : "thongBao dnone"}>
                                <p className="txt textBlack clGreen1">GỬI THÀNH CÔNG!</p>
                                <p>Chúng tôi sẽ liên hệ với bạn sớm nhất, cám ơn bạn!</p>
                            </div>

                        </div>
                    </div>
                </div> */}
            </Modal>
        </div >
    )
}

