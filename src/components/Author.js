import React from 'react'
import { Card, Row, Col, Image, Typography } from 'antd'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { API_HOST } from '../constants/config'
import UnFindPage from './UnFindPage'
import ProductList from './ProductList'
const { Title } = Typography;
function Author(props) {
    const params = useParams();
    const { author, products } = props;
    const { id } = params;
    const findAuthor = author.find(item => item.author_id === +id);
    const findAuthorBook = products.filter(item => item.author.author_id === +id);
    return (
        <Card>
            {
                !findAuthor ? <UnFindPage /> :
                    <>
                        {
                            findAuthor.description &&
                            <Card>
                                <Title level={2}>{findAuthor.name}</Title>
                                <Row gutter={24}>
                                    {
                                        findAuthor.avatar &&
                                        <Col span={6}>
                                            <Image alt={findAuthor.name} src={`${API_HOST}/images/${findAuthor.avatar}`} />
                                        </Col>
                                    }
                                    <Col span={18} style={{fontSize: '18px'}}>
                                        {findAuthor.description}
                                    </Col>
                                </Row>
                            </Card>
                        }
                        <ProductList title={`Sách của tác giả: ${findAuthor.name}`} products={findAuthorBook} />
                    </>
            }
        </Card>
    )
}
const mapStateToProps = (state) => {
    const { author, products } = state;
    return { author, products };
}
export default connect(mapStateToProps)(Author);