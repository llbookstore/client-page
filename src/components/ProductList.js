import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import './ProductList.scss';
const ProductList = (props) => {
    const { category_id, category_name, products } = props;
    const categoryLink = `/category/${category_id}`;
    const listProduct = products.filter(
        item => !!item.category_details
            .find(i => i.category_id == category_id));
    listProduct.length = 8;
    console.log(listProduct)
    const ShowMore = (
        <Link to={categoryLink} style={{ color: 'yellowgreen' }}>xem thêm</Link>
    )

    return (
        <Card
            title={category_name}
            extra={ShowMore}
            bodyStyle={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly' }}
        >
            {
                listProduct.map(item => <ProductItem product={item} key={item.book_id} />)
            }
        </Card>
    )
}
const mapStateToProps = (state) => {
    const { products } = state;
    return { products };
}
export default connect(mapStateToProps)(ProductList);