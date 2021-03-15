import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Typography, Collapse, Row, Col, message, InputNumber, Tag, Card } from 'antd';
import { HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import * as actions from '../actions/index';
import axios from 'axios';
import './ProductDetail.scss';
import { API_HOST, MAX_CART } from '../constants/config';
import * as commonFunc from '../ultils/common';
import UnFindPage from './UnFindPage';
const { Title } = Typography;
const { Panel } = Collapse;

const ProductDetail = (props) => {
    const history = useHistory();
    const { products, user, onAddBookFavourite, onRemoveBookFavourte, onAddBookCart } = props;
    const { id } = useParams();
    //product
    const productData = products.find(item => item.book_id == id);
    //user
    const { favourites = [], carts = [] } = user;
    const isLikeBook = favourites.find(item => item.book_id == id);
    //state
    const [amount, setAmount] = useState(1);
    const [maxAmount, setMaxAmount] = useState(10);
    useEffect(() => {
        if (user.carts) {
            const bookCart = user.carts.find(item => item.book_id === +id);
            let newMax = bookCart ? MAX_CART - bookCart.quantity : MAX_CART;
            newMax = Math.min(newMax, productData.quantity);
            // newMax = newMax > productData.quantity ? productData.quantity : newMax;
            setMaxAmount(newMax);
        }
    }, [user.carts])
    const BookSpecific = () => {
        return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
            <Col className="gutter-row" span={12} >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >
                    <Col className="gutter-row" span={6} >
                        {productData.author && <p>Tác giả</p>}
                        {productData.publisher && <p>Nhà xuất bản: </p>}
                        {productData.language && <p>Ngôn ngữ: </p>}
                        {productData.dimension && <p>Kích thước: </p>}
                        {productData.pages && <p>Số trang: </p>}
                    </Col>
                    <Col className="gutter-row" span={12} >
                        {productData.author && <p className='product-detail__content--bold'>{productData.author.name}</p>}
                        {productData.publisher && <p className='product-detail__content--bold'>{productData.publisher}</p>}
                        {productData.language && <p className='product-detail__content--bold'>{productData.language}</p>}
                        {productData.dimension && <p className='product-detail__content--bold'>{productData.dimension}</p>}
                        {productData.pages && <p className='product-detail__content--bold'>{productData.pages}</p>}
                    </Col>
                </Row>
            </Col>
            <Col className="gutter-row" span={12}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6} >
                        {productData.book_translator && <p>Người dịch: </p>}
                        {productData.publishing && <p>Nhà phát hành: </p>}
                        {productData.weight && <p>Khối lượng: </p>}
                        {productData.format && <p>Định dạng: </p>}
                        {productData.published_date && <p>Ngày phát hành: </p>}
                    </Col>
                    <Col className="gutter-row" span={12} >
                        {productData.book_translator && <p className='product-detail__content--bold'>{productData.book_translator}</p>}
                        {productData.publishing && <p className='product-detail__content--bold'>{productData.publishing.name}</p>}
                        {productData.weight && <p className='product-detail__content--bold'><NumberFormat value={productData.weight} displayType={'text'} thousandSeparator={true} /> gam</p>}
                        {productData.format && <p className='product-detail__content--bold'>{productData.format}</p>}
                        {productData.published_date && <p className='product-detail__content--bold'>{commonFunc.timestampToDate(productData.published_date)}</p>}
                    </Col>
                </Row>
            </Col>
        </Row>

    }

    const BookAbout = () => {
        return <>
            <Title level={3}>{productData.name}</Title>
            {parse(decode(productData.description))}
        </>
    }

    const onClickLike = async () => {
        try {
            if (isLikeBook) {
                await axios.delete(`${API_HOST}/book/${id}/favourite`);
                onRemoveBookFavourte(id);
                message.success('Đã loại bỏ cuốn sách này khỏi danh sách yêu thích của bạn');
            }
            else {
                if (!user.favourites) message.warn('Bạn cần đăng nhập để thực hiện tính năng này!');
                else {
                    await axios.post(`${API_HOST}/book/${id}/favourite`);
                    onAddBookFavourite(id);
                    message.success('Đã thêm cuốn sách này vào danh sách yêu thích của bạn');
                }
            }
        } catch (err) {
            console.log(err);
            message.error('Rất tiếc! Hiện tại không thể dùng chức năng này.');
        }
    }

    const onAddCartClick = async () => {
        try {
            const hasCartBook = carts.find(item => `${item.book_id}` === id);
            if (hasCartBook) {
                const res = await axios.post(`${API_HOST}/book/${id}/cart`, { quantity: amount + hasCartBook.quantity });
                const { status } = res;
                if (status === 0) {
                    message.warn('Không thêm được sản phẩm vào giỏ hàng vào lúc này! Bạn hãy thử lại sau.');
                }
                else {
                    onAddBookCart(+id, amount);
                    message.success('Đã thêm sản phẩm này vào giỏ hàng của bạn');
                }
            }
            else {
                const res = await axios.post(`${API_HOST}/book/${id}/cart`, { quantity: amount });
                onAddBookCart(+id, amount);
                message.success('Đã thêm sản phẩm này vào giỏ hàng của bạn');
            }
        } catch (err) {
            console.log(err);
            message.error('Rất tiếc! Hiện tại không thể dùng chức năng này.');
        }
    }

    const onHandleBuyNowClick = async () => {
        try {
            const hasCartBook = carts.find(item => `${item.book_id}` === id);
            if (hasCartBook) {
                await axios.post(`${API_HOST}/book/${id}/cart`, { quantity: amount + hasCartBook.quantity });
                onAddBookCart(+id, amount);
            }
            else {
                await axios.post(`${API_HOST}/book/${id}/cart`, { quantity: amount });
                onAddBookCart(+id, amount);
                history.push('/cart')
            }
        } catch (err) {
            console.log(err);
            message.error('Rất tiếc! Hiện tại không thể dùng chức năng này.');
        }
    }
    const onAmountChange = (num) => {
        if (num > maxAmount)
            message.warn(`Bạn chỉ có thể lấy ${MAX_CART} cuốn sách này!`);
        setAmount(num);
    }
    return (
        !productData ?
            <UnFindPage />
            :
            <Card>
                <div className='product-detail'>
                    <div className='product-detail__image'>
                        <img src={`${API_HOST}/images/${productData.cover_image}`} alt={productData.name} />
                    </div>
                    <div className='product-detail__content'>
                        <Title level={2} title={productData.name}>{productData.name}</Title>
                        {productData.author && <p>Tác giả: <span className='product-detail__content--bold'>{productData.author.name}</span></p>}
                        {productData.book_translator && <p>Người dịch: <span className='product-detail__content--bold'>{productData.book_translator}</span></p>}
                        {productData.publisher && <p>Nhà xuất bản: <span className='product-detail__content--bold'>{productData.publisher}</span></p>}
                        {productData.publishing && <p>Nhà phát hành: <span className='product-detail__content--bold'>{productData.publishing.name}</span></p>}
                        {
                            productData.sale && productData.sale.active === 1 ?
                                <>
                                    <p>Giá bìa: <NumberFormat value={` ${productData.price}`} displayType={'text'} className='card-item__sale-price' thousandSeparator={true} />
                                        <Tag color="#87d068" style={{ marginLeft: '20px' }}>-{productData.sale.percent}%</Tag>
                                    </p>
                                    <p>Giá bán: <NumberFormat value={` ${productData.price - productData.price * (productData.sale.percent / 100)}`} displayType={'text'} className='card-item__price' thousandSeparator={true} />
                                    </p>
                                </>
                                : <p>Giá bìa: <NumberFormat value={` ${productData.price}`} displayType={'text'} className='card-item__price ' thousandSeparator={true} />
                                </p>
                        }
                        <div style={{ display: 'flex' }}>
                            <div
                                className={!isLikeBook ? 'product-detail__button-like' : 'product-detail__button-like product-detail__button-like--liked'}
                                onClick={onClickLike}
                                title='Thích'
                            >
                                <HeartFilled title='Thích' className='product-detail__heart' />
                                <span className='product-detail__like'>THÍCH</span>
                            </div>
                            <Button type="primary" className='product-detail__buy-now' onClick={onHandleBuyNowClick}>Mua ngay</Button>
                        </div>
                        <strong>Số lượng:</strong> <InputNumber min={1} value={amount} max={maxAmount} onChange={onAmountChange} />
                        <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            className='product-detail__add-cart'
                            onClick={onAddCartClick}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </div>
                <Collapse defaultActiveKey={['1']} >
                    <Panel header={<Title level={5}>Giới thiệu sách</Title>} key="1" className='product-detail__description'>
                        <BookAbout />
                    </Panel>
                    <Panel header={<Title level={5}>Thông tin chi tiết</Title>} key="2">
                        <BookSpecific />
                    </Panel>
                </Collapse>
            </ Card>

    )
}
const mapStateToProps = (state) => {
    const { products, user } = state;
    return { products, user }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddBookFavourite: (book_id) => dispatch(actions.addBookFavourite(book_id)),
        onRemoveBookFavourte: (book_id) => dispatch(actions.removeBookFavourite(book_id)),
        onAddBookCart: (book_id, quantity) => dispatch(actions.addBookCart(book_id, quantity))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);