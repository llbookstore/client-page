import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Row } from 'antd'
import { callApi } from '../utils/callApi'
import './OrderDetails.scss'
const OrderDetails = (props) => {
    const { id } = useParams();
    const [orderData, setOrderData] = useState();
    useEffect(() => {
        const getUserOrder = async () => {
            const getOrder = await callApi(`bill/${id}`, 'GET');
            if (getOrder && getOrder.status === 1) {
                setOrderData(getOrder.data);
            }
        }
        getUserOrder();
    }, [])
    return (
        <div>
            {
                orderData && 
                <>
                    <Row justify='space-between'>
                        <span className='order-detail__title'>Chi tiết đơn hàng: #{id}</span>
                        <span className='order-detail__date-buy'>Ngày đặt hàng: {orderData.created_at}</span>
                    </Row>
                    <hr />
                </>
            }
        </div>
    )
}

const mapStateToProps = ({ products }) => {
    return { products }
}

export default connect(mapStateToProps)(OrderDetails);