import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Menu, Row, Col, Card, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons'
import './Category.scss';
import Carousel from './Carousel'
const { Title } = Typography;
const Category = (props) => {
    const { category, author, products } = props;
    const [listCateId, setListCateId] = useState(null);
    const history = useHistory();
    const onCateClick = (e) => {
        const { key } = e;
        history.push(`/category/${key}`);
    }
    const ShowListCateBook = () => {
        const listCate = category.filter(item => item.group_id === listCateId);
        const listProductOfCateId = products.filter(item => item.category_details.find(i => i.category_id === listCateId));
        const listAuthor = author
            .filter(item =>
                listProductOfCateId.
                    find(i => i.author && i.author.active === 1 && i.author.author_id === item.author_id)
            )
        const onCateAuthorClick = (e) => {
            const { key } = e;
            history.push(`/author/${key}`);
        }
        return (
            <Card
                className='category-content'
                onMouseEnter={() => {
                    setListCateId(listCateId)
                }}
                onMouseLeave={() => setListCateId(null)}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Title level={3}>DANH MỤC</Title>
                        <Menu >
                            {
                                listCate
                                    .map(subItem =>
                                        <Menu.Item onClick={onCateClick} key={`${subItem.category_id}`} >{subItem.name}</Menu.Item>
                                    )
                            }
                        </Menu>
                    </Col>
                    <Col span={8}>
                        <Title level={3}>TÁC GIẢ </Title>
                        <Menu >
                            {
                                listAuthor
                                    .map(subItem =>
                                        <Menu.Item onClick={onCateAuthorClick} key={`${subItem.author_id}`} >{subItem.name}</Menu.Item>
                                    )
                            }
                        </Menu>
                    </Col>
                    <Col span={8}>
                        <Title level={3}>NHÀ PHÁT HÀNH</Title>
                        <Menu >
                            {
                                category
                                    .filter(subItem => subItem.group_id === listCateId)
                                    .map(subItem =>
                                        <Menu.Item onClick={onCateClick} key={`${subItem.category_id}`} >{subItem.name}</Menu.Item>
                                    )
                            }
                        </Menu>
                    </Col>
                </Row>
            </Card>
        )
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Menu className="category-main" mode="vertical" title='Danh mục'>
                {
                    listCateId &&
                    <ShowListCateBook />
                }
                <Menu.Item className='category-title-name'>
                    Danh mục sách
                    </Menu.Item>
                {
                    category
                        .filter(item => item.group_id === -1)
                        .map(item =>
                            <Menu.Item
                                key={item.category_id}
                                title={item.name}
                                className="category-main__sub"
                                onClick={onCateClick}
                                onMouseEnter={() => setListCateId(item.category_id)}
                                onMouseLeave={() => setListCateId(null)}
                            >
                                <Row justify='space-between'>
                                    <Col>
                                        {item.name}
                                    </Col>
                                    <Col>
                                        <RightOutlined style={{ fontSize: '10px', }} />
                                    </Col>
                                </Row>
                            </Menu.Item>
                        )
                }
            </Menu>
            <Carousel />
        </div>
    )
}
const mapStateToProps = (state) => {
    const { author } = state;
    return { author };
}
export default connect(mapStateToProps)(Category);