import React from 'react'
import { Card, Row, Col, Image, Typography } from 'antd'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { API_HOST } from '../constants/config'
import ProductList from './ProductList'
import UnFindPage from './UnFindPage'

const { Title } = Typography;
const PublishingHouse = (props) => {
    const { publishing_house, products } = props;
    const { id } = useParams();
    const findPublishingHouse = publishing_house.find(item => `${item.publishing_id}` === id);
    const listProduct = products.filter(
        item => `${item.publishing_id}` === id);

    return (
        <div style={{ marginTop: '138px' }}>
            {
                !findPublishingHouse ?
                    <UnFindPage />
                    :
                    <Card>
                        {
                            findPublishingHouse.description &&
                            <Card>
                                <Title level={2}>{findPublishingHouse.name}</Title>
                                <Row gutter={24}>
                                    {
                                        findPublishingHouse.image &&
                                        <Col span={6}>
                                            <img alt={findPublishingHouse.name} src={`${API_HOST}/images/${findPublishingHouse.image}`} alt={findPublishingHouse.name} />
                                        </Col>
                                    }
                                    <Col span={18} style={{ fontSize: '18px' }}>
                                        {findPublishingHouse.description}
                                    </Col>
                                </Row>
                            </Card>
                        }
                        <ProductList
                            products={listProduct}
                            title={`Nhà phát hành: ${findPublishingHouse.name}`}
                        />
                    </Card>
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    const { publishing_house, products } = state;
    return { publishing_house, products };
}
export default connect(mapStateToProps)(PublishingHouse);