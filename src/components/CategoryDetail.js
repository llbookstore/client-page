import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductList from './ProductList'
import UnFindPage from './UnFindPage'
const CategoryDetail = (props) => {
    const { category, products } = props;
    const { id } = useParams();
    const categoryName = category.find(item => `${item.category_id}` === id);
    const listProduct = products.filter(
        item => !!item.category_details
            .find(i => `${i.category_id}` === id));

    return (
        <div style={{marginTop: '138px'}}>
            {
                !categoryName ?
                    <UnFindPage />
                    :
                    <ProductList
                        products={listProduct}
                        title={categoryName.name}
                    />
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    const { category, products } = state;
    return { category, products };
}
export default connect(mapStateToProps)(CategoryDetail);