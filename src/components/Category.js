import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, message } from 'antd';
import './Category.scss';
import axios from 'axios';

const { SubMenu } = Menu;

export default function Category() {
    const [category, setCategory] = useState([]);
    const history = useHistory();
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

    const onCateClick = (e) => {
        const { key } = e;
        history.push(`/category/${key}`);
    }
    return (
        <Menu className="category-main" mode="vertical" title='Danh mục'>
            <Menu.Item  className='category-title-name'>Danh mục sách</Menu.Item>
            {
                category
                    .filter(item => item.group_id === -1)
                    .map(item =>
                        <SubMenu key={item.category_id} title={item.name} className="category-main__sub" >
                            {
                                category
                                    .filter(subItem => subItem.group_id === item.category_id)
                                    .map(subItem =>
                                        <Menu.Item onClick={onCateClick} key={`${subItem.category_id}`} className="category-main__sub">{subItem.name}</Menu.Item>
                                    )
                            }
                        </SubMenu>
                    )
            }
        </Menu>
    )
}
