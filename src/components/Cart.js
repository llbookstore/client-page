import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Typography, InputNumber, message, Card, Button, Row, Col, List, Image } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import NumberFormat from 'react-number-format'
import * as actions from '../actions/index'
import './Cart.scss'
import { MAX_CART } from '../constants/config'
import UnFindPage from './UnFindPage'
import { callApi, getImageURL } from '../utils/callApi'
const { Title } = Typography;

const BookDescription = (props) => {
    const { onAddBookCart } = props;
    const { book_id, name, price, sale, cartQuantity, quantity } = props.item;
    const bookLink = `/book/${book_id}`;
    const [amount, setAmount] = useState(cartQuantity);
    const [maxAmount, setMaxAmount] = useState(MAX_CART);
    useEffect(() => {
        const newMax = Math.min(MAX_CART, quantity);
        setMaxAmount(newMax);
    }, [quantity])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const onAmountChange = (value) => {
        if (value > maxAmount) {
            message.warn(`Bạn chỉ có thể có tối đa ${maxAmount} sản phẩm`);
        }
        setAmount(value);
    }
    const onHandleUpdateCart = async () => {
        try {
            const res = await callApi(`/book/${book_id}/cart`, 'POST', { quantity: amount });
            if (res.data && res.data.status === 1) {
                message.success('Cập nhật giỏ hàng thành công');
                onAddBookCart(book_id, amount);
            }
        } catch (err) {
            console.log(err);
            message.error('Có lỗi xảy ra! Vui lòng thực hiện lại sau.')
        }
        onAddBookCart(book_id, amount)
        message.success('Cập nhật thành công');
    }
    return (<>
        <Link to={bookLink}><Title level={3}>{name}</Title></Link>
        {
            (sale && sale.percent && sale.active === 1) ?
                <>
                    <NumberFormat value={price} displayType={'text'} className='card-item__sale-price' thousandSeparator={true} />
                    <br />
                    <NumberFormat value={price - price * (sale.percent / 100)} displayType={'text'} className='card-item__price' thousandSeparator={true} />
                </>
                :
                <NumberFormat value={price} displayType={'text'} className='card-item__price' thousandSeparator={true} />
        }
        <br />
        <strong style={{ lineHeight: '50px' }}>Số lượng:</strong> <InputNumber min={1} value={amount} max={maxAmount} onChange={onAmountChange} />
        <Button type='primary' className='cart-update-button' onClick={onHandleUpdateCart}>Cập nhật </Button>
        <p>
            <span style={{ color: 'black', fontWeight: 'bold' }}>
                Thành tiền:
                {
                    (sale && sale.percent && sale.active === 1) ?
                        <NumberFormat value={(price - price * (sale.percent / 100)) * amount} displayType={'text'} className='card-item__price' thousandSeparator={true} />
                        :
                        <NumberFormat value={price * amount} displayType={'text'} className='card-item__price' thousandSeparator={true} />
                }
            </span>
        </p>
    </>)
}

const Cart = (props) => {
    const history = useHistory();
    const { user, products, onRemoveBookCart, onAddBookCart } = props;
    const onHandleRemoveCart = async (book_id) => {
        try {
            const res = await callApi(`book/${book_id}/cart`, 'DELETE');
            if (res.data) {
                if (res.data.status === 0)
                    message.warn('Xóa không thành công');
                else {
                    onRemoveBookCart(book_id);
                    message.success('Xóa sản phẩm khỏi giỏ hàng thành công');
                }
            }

        } catch (err) {
            console.log(err);
            message.error('Có lỗi xảy ra! Hiện tại bạn không thể thực hiện chức năng này.')
        }

    }

    if (!user.carts) {
        return <UnFindPage />
    }
    const { carts } = user;
    const data = products
        .filter(item => !!carts.find(i => i.book_id === item.book_id))
        .map((item, index) => {
            const bookCart = carts.find(i => i.book_id === item.book_id);
            item.key = index;
            item.cartQuantity = bookCart.quantity;
            return item;
        });
    const totalPrice = () => {
        return data.reduce((pre, item) => {
            const isSale = (item.sale && item.active === 1);
            const realPrice = !isSale ? item.price : item.price - item.price * (item.sale.percent / 100);
            return pre + realPrice * item.cartQuantity;
        }, 0)
    }
    return (
        <>
            {
                data.length === 0 ?
                    <div style={{minHeight: '50vh'}}>
                        <Title level={1} style={{ textAlign: 'center', color: 'blueviolet' }}>Giỏ hàng trống</Title>
                    </div>
                    :
                    <>
                        <Title level={1} style={{ textAlign: 'center', color: 'blueviolet' }}>Giỏ hàng</Title>
                        <Row wrap={true} gutter={24}>
                            <Col style={{ paddingTop: 20 }} span={16}>
                                <List
                                    size="large"
                                    bordered
                                    style={{ width: '100%' }}
                                    dataSource={data}
                                    renderItem={item =>
                                        <List.Item style={{ backgroundColor: 'white' }}>
                                            <List.Item.Meta
                                                avatar={
                                                    <Image src={getImageURL(item.cover_image)} width='100px' height='auto' alt={item.name} />
                                                }
                                                description={<BookDescription item={item} onAddBookCart={onAddBookCart} />}
                                            />
                                            <CloseCircleOutlined title={'Loại bỏ sản phẩm này ra khỏi giỏ hàng'} className={'cart-remove'} onClick={() => onHandleRemoveCart(item.book_id)} />
                                        </List.Item>
                                    }
                                />
                            </Col>
                            <Col style={{ paddingTop: 20 }} >
                                <Card title={<span style={{ color: 'tomato' }}>Tóm tắt đơn hàng</span>} bordered={false} style={{ width: 300, marginLeft: 10 }}>
                                    <table width='100%'>
                                        <tbody>
                                            <tr>
                                                <td>Sản phẩm</td>
                                                <td align='right'>{data.length}</td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid' }}>
                                                <td>Phí vận chuyển:</td>
                                                <td align='right'><strong>Miễn phí</strong></td>
                                            </tr>

                                            <tr>
                                                <td><strong>Tổng cộng</strong></td>
                                                <td align='right'>
                                                    {
                                                        <NumberFormat value={totalPrice()} displayType={'text'} className='card-item__price--black' thousandSeparator={true} />
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <Button type='primary' onClick={() => history.push('/payment')}>Thanh toán</Button>
                                </Card>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}
const mapStateToProps = (state) => {
    const { user, products } = state;
    return { user, products };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddBookCart: (book_id, quantity) => dispatch(actions.addBookCart(book_id, quantity)),
        onRemoveBookCart: (book_id) => dispatch(actions.removeBookCart(book_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);