import React from 'react'
import { connect } from 'react-redux';
import { useParams, useHistory, } from 'react-router-dom';
import { Result, Button, Typography, Collapse, Row, Col, message } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import NumberFormat from 'react-number-format';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import * as actions from '../actions/index';
import axios from 'axios';
import './ProductDetail.scss';
import { API_HOST } from '../constants/config';
import * as commonFunc from '../ultils/common'
const { Title } = Typography;
const { Panel } = Collapse;

const ProductDetail = (props) => {
    const { products, user, onAddBookFavourite, onRemoveBookFavourte } = props;
    const { id } = useParams();
    const history = useHistory();
    //product
    const productData = products.find(item => item.book_id == id);
    //user
    const { favourites = [] } = user;
    console.log('user', user, !!user);
    const isLikeBook = favourites.find(item => item.book_id == id);
    const BookSpecific = () => {
        return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
            <Col className="gutter-row" span={12} >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >
                    <Col className="gutter-row" span={6} >
                        <p>Tác giả</p>
                        {productData.publisher && <p>Nhà xuất bản: </p>}
                        {productData.language && <p>Ngôn ngữ: </p>}
                        {productData.dimension && <p>Kích thước: </p>}
                        {productData.pages && <p>Số trang: </p>}
                    </Col>
                    <Col className="gutter-row" span={12} >
                        <p className='product-detail__content--bold'>{productData.author.name}</p>
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
    return (
        !productData ?
            <Result
                status="404"
                title="404"
                subTitle="Rất tiếc, trang web này không tồn tại!"
                extra={<Button type="primary" onClick={() => history.push('/')}>Trở về trang chủ</Button>}
            />
            :
            <>
                <div className='product-detail'>
                    <div className='product-detail__image'>
                        <img src={`${API_HOST}/images/${productData.cover_image}`} alt={productData.name} />
                    </div>
                    <div className='product-detail__content'>
                        <Title level={2} title={productData.name}>{productData.name}</Title>
                        <p>Tác giả: <span className='product-detail__content--bold'>{productData.author.name}</span></p>
                        {productData.book_translator && <p>Người dịch: <span className='product-detail__content--bold'>{productData.book_translator}</span></p>}
                        {productData.publisher && <p>Nhà xuất bản: <span className='product-detail__content--bold'>{productData.publisher}</span></p>}
                        {productData.publishing.name && <p>Nhà phát hành: <span className='product-detail__content--bold'>{productData.publishing.name}</span></p>}
                        
                        <NumberFormat value={productData.price} displayType={'text'} className='card-item__sale-price' thousandSeparator={true} />
                        <NumberFormat value={productData.price - productData.price * (productData.sale.percent / 100)} displayType={'text'} className='card-item__price' thousandSeparator={true} />
                        <div style={{ display: 'flex' }}>
                            <div
                                className={!isLikeBook ? 'product-detail__button-like' : 'product-detail__button-like product-detail__button-like--liked'}
                                onClick={onClickLike}
                                title='Thích'
                            >
                                <HeartFilled title='Thích' className='product-detail__heart' />
                                <span className='product-detail__like'>THÍCH</span>
                            </div>
                        </div>
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
            </>

    )
}
const mapStateToProps = (state) => {
    const { products, user } = state;
    return { products, user }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddBookFavourite: (book_id) => dispatch(actions.addBookFavourite(book_id)),
        onRemoveBookFavourte: (book_id) => dispatch(actions.removeBookFavourite(book_id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);