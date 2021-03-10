import React from 'react';
import { connect } from 'react-redux';
import Category from './Category';
import ProductList from './ProductList';

const Home = (props) => {
    const { category } = props;
    const listCategoryFirst = category.filter(item => item.group_id === -1);
    return (
        <>
            <Category category={category} />
            {
                listCategoryFirst.map(cat => <ProductList category_id={cat.category_id} category_name={cat.name} key={cat.category_id}/>)
            }

        </>
    )
}
const mapStateToProps = (state) => {
    const { category } = state;
    return { category };
}
export default connect(mapStateToProps)(Home);
