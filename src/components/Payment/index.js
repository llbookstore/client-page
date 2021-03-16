import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Typography, Steps, Button, message, Card, Row, Col } from 'antd'
import NumberFormat from 'react-number-format'
import Address from './Address';
import SuccessPayment from './SuccessPayment'
import PaymentType from './PaymentType';
import * as actions from '../../actions/index'
import { API_HOST, paymentTypes } from '../../constants/config'
import axios from 'axios'
const { Title } = Typography;
const { Step } = Steps;
const Payment = (props) => {
    const { user, products, onRemoveAllCart } = props;
    const history = useHistory();
    useEffect(() => {
        if (!user.account_name) {
            history.push('/');
        }
    }, [user])
    const { account_name } = user;
    const [fullname, setFullname] = useState(user.full_name);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAdress] = useState(user.address);
    const [note, setNote] = useState('');
    const [type, setType] = useState(0);//payment type
    const [current, setCurrent] = useState(0);
    const [isSuccessPayment, setIsSuccessPayment] = useState(false);
    const userData = { fullname, account_name, phone, address, note };
    const dataCart = products
        .filter(item => !!user.carts.find(i => i.book_id === item.book_id))
        .map((item, index) => {
            const bookCart = user.carts.find(i => i.book_id === item.book_id);
            item.key = index;
            item.cartQuantity = bookCart.quantity;
            return item;
        });
    const totalPrice = dataCart.reduce((pre, item) => {
        const isSale = (item.sale && item.active === 1);
        const realPrice = !isSale ? item.price : item.price - item.price * (item.sale.percent / 100);
        return pre + realPrice * item.cartQuantity;
    }, 0);
    const PaymentConfirm = () => {
        return (
            <Row style={{ justifyContent: 'space-evenly' }}>
                <Col className="gutter-row" >
                    <Title level={3} style={{ color: 'lightblue' }}>Sản phẩm</Title>
                    {
                        dataCart.map(item =>
                            <Row key={item.book_id}>
                                <Col>
                                    <img
                                        src={`${API_HOST}/images/${item.cover_image}`}
                                        alt={item.name}
                                        width='50px'
                                        style={{ marginRight: 20, marginBottom: 10 }}
                                    />
                                </Col>
                                <Col>
                                    <Title level={5}>{item.name}</Title>
                                    <strong><span style={{ color: 'tomato' }}>{item.cartQuantity}</span> x
                                    {
                                            (item.sale && item.sale.percent && item.sale.active === 1) ?
                                                <NumberFormat
                                                    style={{ fontSize: '15px', color: 'tomato' }}
                                                    value={item.price - item.price * (item.sale.percent / 100)}
                                                    displayType={'text'}
                                                    className='card-item__price--black'
                                                    thousandSeparator={true}
                                                />
                                                :
                                                <NumberFormat
                                                    style={{ fontSize: '15px', color: 'tomato' }}
                                                    value={totalPrice} displayType={'text'}
                                                    className='card-item__price--black'
                                                    thousandSeparator={true}
                                                />
                                        }
                                    </strong>
                                </Col>
                            </Row>
                        )
                    }
                </Col>
                <Col className="gutter-row" >
                    <Title level={5} style={{ color: 'blueviolet' }}>Địa chỉ giao hàng</Title>
                    <p><strong>{fullname}</strong> <br />
                        {address} <br />
                        <strong>{phone}</strong></p>
                    <Title level={5} style={{ color: 'blueviolet' }}>Ghi chú giao hàng</Title>
                    <p>{note}</p>
                    <Title level={5} style={{ color: 'blueviolet' }}>Hình thức thanh toán</Title>
                    <p style={{ color: 'yellowgreen' }}>{paymentTypes[type].title}</p>
                    <hr />
                    <p>Tổng tiền hàng: <NumberFormat value={totalPrice} displayType={'text'} className='card-item__price--black' thousandSeparator={true} /></p>
                </Col>
            </Row>
        )
    }
    const steps = [
        {
            title: 'Địa chỉ',
            content: <Address
                user={userData}
                onFullnameChange={setFullname}
                onPhoneChange={setPhone}
                onAddressChange={setAdress}
                onNoteChange={setNote}
            />,
        },
        {
            title: 'Hình thức thanh toán',
            content: <PaymentType type={type} onTypeChange={setType} />,
        },
        {
            title: 'Xác nhận và Đặt hàng',
            content: <PaymentConfirm />,
        },
    ];

    const next = () => {
        if (!phone || !address || !fullname) {
            message.warn('Bạn hãy nhập đủ thông tin. Hãy kiểm tra thông tin của bạn được lưu chưa.');
        }
        else
            setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const onHandlePayment = async () => {
        try {
            if (totalPrice !== 0) {
                const data = {
                    user_name: fullname,
                    phone,
                    address,
                    user_note: note,
                    payment_method: type,
                    total_price: totalPrice,
                    user_id: user.account_id
                }
                const res = await axios.post('/bill', data);
                if (res.data.status === 1) {
                    onRemoveAllCart();
                    setIsSuccessPayment(true);
                }
                else
                    message.error('Đặt hàng không thành công')
            }
        } catch (err) {
            console.log(err);
            message.warn('Có lỗi xảy ra. Rất xin lỗi. Bạn không thể đặt hàng lúc này');
        }
    }
    return (
        <>
            {
                isSuccessPayment ? <SuccessPayment />
                    :
                    (user.carts.length > 0 &&
                        <>
                            <Title level={1} style={{ textAlign: 'center' }}>LLBOOK</Title>
                            <Steps current={current}>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <Card className="steps-content">{steps[current].content}</Card>
                            <div className="steps-action" style={{ textAlign: 'center' }}>
                                {current > 0 && (
                                    <Button size='large' style={{ margin: '0 8px' }} onClick={() => prev()}>
                                        Quay lại
                                    </Button>
                                )}
                                {current === steps.length - 1 && (
                                    <Button type="primary" size='large' onClick={onHandlePayment}>
                                        Xác nhận mua hàng
                                    </Button>
                                )}
                                {current < steps.length - 1 && (
                                    <Button type="primary" size='large' onClick={() => next()}>
                                        Tiếp tục
                                    </Button>
                                )}
                            </div>
                        </>
                    )
            }
        </>
    )
}
const mapStateToProps = (state) => {
    const { user, products } = state;
    return { user, products }
}
const mapDispatchToProps = (dispatch, state) => {
    return {
        onRemoveAllCart: () => {
            dispatch(actions.removeAllBookCart());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);