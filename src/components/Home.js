import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Category from './Category';
import ProductList from './ProductList';

const Home = (props) => {
    const { products } = props;
    const [category, setCategory] = useState([]);
    async function getCategories() {
        try {
            const res = await axios.get('/category?active=1');
            setCategory(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);
    const listCategoryFirst = category.filter(item => item.group_id === -1);
    const listGroupProductTop = products.filter(
        item => !!item.category_details
            .find(i => !!listCategoryFirst.find(cat => cat.category_id === i.category_id)));
    console.log('212', listGroupProductTop)
    return (
        <>
            <Category category={category} />
            {
                listCategoryFirst.map(cat => <ProductList category_id={cat.category_id} category_name={cat.name} />)
            }

        </>
    )
}
const mapStateToProps = (state) => {
    const { products } = state;
    return { products };
}
export default connect(mapStateToProps)(Home);
