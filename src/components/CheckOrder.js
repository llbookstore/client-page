import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table,
    Typography,
    Pagination
} from 'antd'
import NumberFormat from 'react-number-format'
import { callApi } from '../utils/callApi'
import { timestampToDate } from '../utils/common'
import { ORDER_STATUS, RPP } from '../constants/config'
import UnFindPage from './UnFindPage'
const { Title } = Typography;

const getOrderStatusName = (status) => {
    for (const key in ORDER_STATUS) {
        if (ORDER_STATUS[key].status === status)
            return ORDER_STATUS[key].name;
    }
    return ''
}
const columns = [
    {
        title: 'Mã đơn hàng',
        key: 'bill_id',
        dataIndex: 'bill_id',
        align: 'center',
        render: (text) => (
            <Link to={`check-order/${text}`} style={{ color: 'blue' }}>{text}</Link>
        )
    },
    {
        title: 'Ngày mua',
        key: 'date_bought',
        dataIndex: 'created_at',
        render: (text) => (
            <>{timestampToDate(text)}</>
        )
    },
    {
        title: 'Sách đã mua',
        key: 'item',
        render: (record) => (
            <>
                {
                    record.bill_details.map((item, index) =>
                        <div key={index}>
                            <Link to={`book/${item.book_id}`} >{item.book.name}</Link><br />
                        </div>)
                }
            </>
        )
    },
    {
        title: 'Tổng tiền',
        key: 'total',
        dataIndex: 'total_price',
        render: (text) => (
            <>
                <NumberFormat value={text} displayType={'text'} thousandSeparator={true} />
                đ
            </>
        )
    },
    {
        title: 'Trạng thái đơn hàng',
        key: 'status',
        dataIndex: 'status',
        render: (text) => (
            <>
                {getOrderStatusName(text)}

            </>
        )
    }
]
const CheckOrder = ({ user }) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const getUserOrder = async () => {
            const getOrder = await callApi('bill', 'GET', {
                user_id: user.account_id,
                current_page: currentPage
            });
            setTotal(getOrder.data.count);
            setData(getOrder.data.rows);
        }
        getUserOrder();
    }, [currentPage, user.account_id])
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            {
                !user.account_id ? <UnFindPage /> :
                    <div style={{ paddingBottom: '20px', paddingTop: '80px' }}>
                        <Title level={3}>Đơn hàng của bạn</Title>
                        <Pagination
                            defaultCurrent={1}
                            onChange={(page) => setCurrentPage(page)}
                            total={total}
                            current={currentPage}
                            pageSize={RPP}
                            style={{ marginBottom: '14px' }}
                        />
                        <Table
                            rowKey={record => record.bill_id}
                            bordered={true}
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                        />
                    </div>
            }
        </>
    )
}

const mapStateToProps = ({ user }) => {
    return { user }
}
export default connect(mapStateToProps)(CheckOrder);
