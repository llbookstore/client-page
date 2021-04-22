import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Row, Card, Col, Typography, Table } from 'antd'
import NumberFormat from 'react-number-format'
import { callApi, getImageURL } from '../utils/callApi'
import { timestampToDate } from '../utils/common'
import './OrderDetails.scss'
import { paymentTypes, ORDER_STATUS } from '../constants/config'
import UnFindPage from './UnFindPage';
const { Title } = Typography;
const getOrderStatus = (status) => {
    const statusOrder = ORDER_STATUS.find(item => item.status === status);
    return statusOrder ? statusOrder.name : '';
}
const getPaymentType = (type) => {
    const findType = paymentTypes.find(item => item.key === type);
    return findType ? findType.title : '';
}
const OrderDetails = ({ user }) => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState();
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    useEffect(() => {
        const getUserOrder = async () => {
            const getOrder = await callApi(`bill/${id}`, 'GET', { user_id: user.account_id });
            if (getOrder && getOrder.status === 1) {
                setOrderData(getOrder.data);
            }
        }
        getUserOrder();
    }, [id, user.account_id])
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidthScreen(window.innerWidth);
        })
    }, [])
    const columns = [
        {
            title: 'Sách đã đặt',
            key: 'book',
            render: record => {
                const { book } = record;
                return (
                    <Row gutter={[16, 24]}>
                        { widthScreen >= 620 &&
                            <Col>
                                <img
                                    src={getImageURL(book.cover_image)}
                                    alt={book.name}
                                    width='50px'
                                />
                            </Col>
                        }
                        <Col>
                            <Link to={`/book/${record.book_id}`} style={{ fontSize: '1.4em' }}>{book.name} </Link>
                        </Col>
                    </Row>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'age',
            render: text => {
                return (
                    <NumberFormat className='price-vnd' value={text} displayType={'text'} thousandSeparator={true} />
                )
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: text => {
                return (
                    <span style={{ fontSize: '1.4em' }}>{text}</span>
                )
            }
        },
        {
            title: 'Tạm tính',
            key: 'tempCal',
            render: (record) => {
                return <NumberFormat className='price-vnd' value={record.quantity * record.price} displayType={'text'} thousandSeparator={true} />
            }
        },
    ]
    return (
        <div>
            {
                !orderData ? <UnFindPage /> :
                    <>
                        <Row justify='space-between'>
                            <span className='order-detail__title'>
                                Chi tiết đơn hàng: #{id} - {getOrderStatus(orderData.status)}
                            </span>
                            <span className='order-detail__date-buy'>
                                Ngày đặt hàng: {timestampToDate(orderData.created_at, 'DD/MM/YYYY, LT')}
                            </span>
                        </Row>
                        <hr />
                        <Row gutter={[16, 24]} orientation="left" >
                            <Col flex='3' >
                                <Card title='THÔNG TIN ĐẶT HÀNG' style={{ fontSize: '1.4em', minHeight: '250px' }}>
                                    <Title level={4}>{orderData.user_name}</Title>
                                    <strong>Địa chỉ:</strong> {orderData.address} <br />
                                    <strong>Điện thoại:</strong> {orderData.phone}
                                </Card>
                            </Col>
                            <Col flex='2' >
                                <Card title='HÌNH THỨC THANH TOÁN' style={{ fontSize: '1.4em', minHeight: '250px' }}>
                                    {getPaymentType(orderData.payment_method)}
                                </Card>
                            </Col>
                        </Row>
                        <Table
                            columns={columns}
                            dataSource={orderData.bill_details}
                            rowKey={(record) => record.book_id}
                            style={{ marginTop: '2em' }}
                            pagination={false}
                        />
                        {
                            orderData.user_note &&
                            <Card style={{ fontSize: '1.4em' }}>
                                <strong>Ghi chú:</strong>
                                {orderData.user_note}
                            </Card>
                        }
                        <Card >
                            <Row justify='space-between'>
                                <Title level={4}>
                                    Tổng cộng
                        </Title>
                                <NumberFormat className='price-total' value={orderData.total_price} displayType={'text'} thousandSeparator={true} />
                            </Row>
                        </Card>
                    </>
            }
        </div>
    )
}

const mapStateToProps = ({ user }) => {
    return { user }
}

export default connect(mapStateToProps)(OrderDetails);