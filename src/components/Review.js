import React, { useState } from 'react'
import {
    Rate,
    Radio,
    Card,
    Row,
    Col,
    List,
    Avatar,
    Pagination
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { timestampToDate } from '../utils/common'
function Review({ rating, reviews }) {
    const reviewNumberRating = (rating) => {
        if (rating)
            return reviews.filter(item => item.rating === rating).length;
    }
    const getReviews = (page = 1, pageSize = 5, rating) => {
        if (rating > -1) {
            return reviews
                .filter(item => item.rating === rating)
                .slice(pageSize * (page - 1), pageSize * page)
        }
        return reviews.slice(pageSize * (page - 1), pageSize * page)
    }
    const [data, setData] = useState(getReviews(1, 5));
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(reviews.length);
    const [selectedRating, setSelectedRating] = useState(-1);
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
        setData(getReviews(page, 5, selectedRating));
    }
    const handleSelectedRatingChange = e => {
        const rating = parseInt(e.target.value);
        setSelectedRating(rating);
        setCurrentPage(1);
        if (rating === -1) {
            setData(getReviews(1, 5));
            setTotal(reviews.length);
        }
        else {
            setData(getReviews(1, 5, rating));
            setTotal(reviewNumberRating(rating));
        }
    }
    return (
        <>
            <Card bordered={false}>
                <Row gutter={[12, 24]}>
                    <Col style={{ textAlign: 'center' }}>
                        <Rate defaultValue={rating} disabled /> <br />
                        {rating && <b>{rating}/5</b>}
                    </Col>
                    <Col style={{ display: 'flex', alignItems: 'center' }}>
                        <Radio.Group
                            defaultValue="-1"
                            buttonStyle="solid"
                            size='small'
                            style={{ display: 'block' }}
                            onChange={handleSelectedRatingChange}
                        >
                            <Radio.Button value="-1">Tất cả</Radio.Button>
                            <Radio.Button value="5">
                                5 sao {rating && <>({reviewNumberRating(5)})</>}
                            </Radio.Button>
                            <Radio.Button value="4">
                                4 sao {rating && <>({reviewNumberRating(4)})</>}
                            </Radio.Button>
                            <Radio.Button value="3">
                                3 sao {rating && <>({reviewNumberRating(3)})</>}
                            </Radio.Button>
                            <Radio.Button value="2">
                                2 sao {rating && <>({reviewNumberRating(2)})</>}
                            </Radio.Button>
                            <Radio.Button value="1">
                                1 sao {rating && <>({reviewNumberRating(1)})</>}
                            </Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </Card>
            {
                rating &&
                <Card bordered={false}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        size="large"
                                        icon={<UserOutlined />}
                                        // src={getImageURL(getUser(item.acc_id).avatar)}
                                    />}
                                    title={item.full_name}
                                    description={<>
                                        <Rate value={item.rating} size='small' disabled style={{ fontSize: '1em' }} />
                                        <br />
                                        <b>{item.comment}</b>
                                        <br />
                                        {timestampToDate(item.created_at, 'DD/MM/YYYY, HH:mm')}
                                    </>}
                                />
                            </List.Item>
                        )}
                    />
                    <Pagination
                        total={total}
                        pageSize={5}
                        onChange={handlePaginationChange}
                        current={currentPage}
                    />
                </Card>
            }
        </>
    )
}

export default Review;