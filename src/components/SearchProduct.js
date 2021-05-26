import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import ProductList from './ProductList'
import { Pagination } from 'antd'
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchProduct = (props) => {
    const { products } = props;
    const query = useQuery();
    const q = query.get('q');
    const listProduct = (page = 1, pageSize = 8) => {
        return products
            .filter(item => item.name.includes(q)
                || (item.author && item.author.name.includes(q))
                || item.description.includes(q)
            )
            .slice(pageSize * (page - 1), pageSize * page)
    }
    const [data, setData] = useState(listProduct(1, 8));
    useEffect(() => {
        setData(listProduct(1, 8))
        // eslint-disable-next-line
    }, [q])
    console.log('list', listProduct)
    return (
        <div style={{ marginTop: '138px' }}>

            <ProductList
                products={data}
                title={`Kết quả tìm kiếm: ${q}`}
            />
            <Pagination
                total={listProduct(1, 100000).length}
                // pageSize={8}
                showSizeChanger={false}
                onChange={page => setData(listProduct(page, 8))}
            />
        </div>
    )
}
const mapStateToProps = (state) => {
    const { products } = state;
    return { products };
}
export default connect(mapStateToProps)(SearchProduct);