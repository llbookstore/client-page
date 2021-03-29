import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Category from './Category';
import ProductList from './ProductList';

const Home = (props) => {
    const { category, products } = props;
    const listCategoryFirst = category.filter(item => item.group_id === -1);
    const listProduct = (category_id) => {
        const filterProducts = products.filter(
            item => !!item.category_details
                .find(i => i.category_id === category_id));
        filterProducts.length = 4;
        return filterProducts;
    }
    const ShowCatMore = (category_id) => {
        const categoryLink = `/category/${category_id}`;
        return (
            <Link to={categoryLink} style={{ color: 'yellowgreen' }}>xem thêm</Link>
        )
    }
    return (
        <>
            <Category category={category} />
            {
                listCategoryFirst
                    .map(cat => <ProductList
                        products={listProduct(cat.category_id)}
                        title={cat.name}
                        key={cat.category_id}
                        showMore={ShowCatMore(cat.category_id)}

                    />)
            }

        </>
    )
}
const mapStateToProps = (state) => {
    const { category, products } = state;
    return { category, products };
}
export default connect(mapStateToProps)(Home);
