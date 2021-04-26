import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Pagination } from 'antd'
import ProductList from './ProductList'
import UnFindPage from './UnFindPage'
const CategoryDetail = (props) => {
    const { category, products } = props;
    const { id } = useParams();
    const categoryName = category.find(item => `${item.category_id}` === id);
    const listProduct = (page = 1, pageSize = 8) => {
        return products.filter(
            item => !!item.category_details
                .find(i => `${i.category_id}` === id))
                .slice(pageSize*(page -1), pageSize*page)
    }
    const [data, setData] = useState(listProduct(1,8));

    return (
        <div style={{ marginTop: '138px' }}>
            {
                !categoryName ?
                    <UnFindPage />
                    :
                    <>
                        <ProductList
                            products={data}
                            title={categoryName.name}
                        />
                        <Pagination
                            total={listProduct(1,10000).length}
                            pageSize={8}
                            onChange={page => setData(listProduct(page,8))}
                        />
                    </>
            }
        </div>
    )
}
const mapStateToProps = (state) => {
    const { category, products } = state;
    return { category, products };
}
export default connect(mapStateToProps)(CategoryDetail);