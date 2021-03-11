import React from 'react'
import { Card } from 'antd';
import ProductItem from './ProductItem';
import './ProductList.scss';
const ProductList = (props) => {
    const { title, products, showMore } = props;
    console.log(products)
    return (
        <Card
            title={title}
            extra={showMore}
            bodyStyle={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly' }}
        >
            {
                products.map(item => <ProductItem product={item} key={item.book_id} />)
            }
        </Card>
    )
}
export default ProductList;