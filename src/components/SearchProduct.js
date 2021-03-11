import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ProductList from './ProductList'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchProduct = (props) => {
    const { user, products } = props;
    const query = useQuery();
    const q = query.get('q');

    const listProduct = products
        .filter(item => item.name.includes(q)
            || item.author.name.includes(q)
            || item.description.includes(q)
        );
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
    const { user, products } = state;
    return { user, products };
}
export default connect(mapStateToProps)(SearchProduct);