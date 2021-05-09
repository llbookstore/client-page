import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ProductList from './ProductList'
const Favourtites = (props) => {
    const { user, products } = props;
    const { favourites = [] } = user;
    const listProduct = products
        .filter(item => favourites.find(i => i.book_id === item.book_id));
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            {
                <ProductList
                    products={listProduct}
                    title={'Danh sách ưa thích của bạn.'}
                />
            }
        </>
    )
}
const mapStateToProps = (state) => {
    const { user, products } = state;
    return { user, products };
}
export default connect(mapStateToProps)(Favourtites);