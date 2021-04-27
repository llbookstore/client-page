import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
    Modal,
    Form,
    Button,
    Input,
    message,
    Rate
} from 'antd'
import { callApi } from '../utils/callApi'
import { addBookReview } from '../actions/BookActions'
const desc = ['Rất không hài lòng', 'không hài lòng', 'bình thường', 'hài lòng', 'cực kỳ hài lòng'];
const { TextArea } = Input;
function ReviewForm({ user, showReviewForm, setShowReviewForm, title, bookId, onAddReview }) {
    const [form] = Form.useForm();
    const [rate, setRate] = useState(0);
    const { full_name, account_id } = user;
    const onFinish = async ({ comment }) => {
        const data = {
            acc_id: account_id,
            book_id: bookId,
            full_name,
            comment,
            rating: rate
        };
        try {
            const res = await callApi(`/review`, 'POST', data);
            if (res && res.status === 1) {
                onAddReview(res.data);
                message.success('Bình luận của bạn sẽ được kiểm duyệt! Cám ơn bạn đã bình luận sản phẩm của chúng tôi', 2)
                setShowReviewForm(false);
                form.resetFields();
            }
            else {
                message.warn('Có lỗi xảy ra');
            }
        } catch (err) {
            message.warn('Hệ thống đang xảy ra lỗi! Bạn vui lòng thử lại sau.')
        }
    }
    const handleCloseModal = () => {
        setShowReviewForm(false);
        setRate(0);
        form.resetFields();
    }
    return (
        <div>
            <Modal
                visible={showReviewForm}
                footer={null}
                onCancel={handleCloseModal}
                title={title}
            >
                <Form
                    name='ReviewForm_form'
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError
                    style={{ textAlign: 'center' }}
                >
                    <Form.Item
                        name='rating'
                        rules={[
                            () => ({
                                validator() {
                                    if (rate !== 0) {
                                        return Promise.resolve();
                                    }
                                    console.log(rate);
                                    return Promise.reject('Bạn cần đánh giá trước khi gửi!');
                                },
                            }),
                        ]}
                    >
                        <>
                            <b>{rate === 0 ? 'Vui lòng đánh giá' : desc[rate - 1]}</b> <br />
                            <Rate
                                tooltips={desc}
                                value={rate}
                                onChange={value => setRate(value)}
                            />
                        </>
                    </Form.Item>
                    <Form.Item
                        name='comment'
                        rules={
                            [
                                { max: 500, message: 'Nội dung bình luận không thể vượt quá 500 ký tự!' },
                            ]
                        }
                    >
                        <TextArea placeholder={rate === 5 ? 'Vì sao bạn thích sách này?' : 'Vấn đề bạn gặp phải là gì?'} rows={4} />
                    </Form.Item>
                    <div style={{ display: 'flex' }}>
                        <Button
                            type='primary'
                            value='Đánh giá'
                            htmlType='submit'
                            style={{
                                backgroundColor: 'orange',
                                borderColor: 'orange',
                                width: '50%',
                                borderRadius: '5em',
                                margin: '0 auto',
                                textAlign: 'center',
                            }}
                        >
                            Đánh giá sách
                    </Button>
                    </div>
                </Form>
            </Modal>
        </div >
    )
}

const mapStateToProps = ({ user }) => {
    return { user };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddReview: (data) => dispatch(addBookReview(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);