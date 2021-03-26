import React from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import ProductList from './ProductList'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchProduct = (props) => {
    const { products } = props;
    const query = useQuery();
    const q = query.get('q');
    const listProduct = products
        .filter(item => item.name.includes(q)
                || (item.author && item.author.name.includes(q))
                || item.description.includes(q)
        );
    console.log('list', listProduct)
    return (
        <>
            {
                <ProductList
                    products={listProduct}
                    title={`Kết quả tìm kiếm: ${q}`}
                />
            }
        </>
    )
}
const mapStateToProps = (state) => {
    const { products } = state;
    return { products };
}
export default connect(mapStateToProps)(SearchProduct);