import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, message } from 'antd';
import './Category.scss';
import axios from 'axios';

const { SubMenu } = Menu;

function handleClick(e) {
    console.log('click', e);
}

export default function Category() {
    const [category, setCategory] = useState([]);
    const history = useHistory();
    async function getCategories() {
        try {
            const res = await axios.get('/category');
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
        <Menu className="category-main" mode="vertical" title='Danh mục' onClick={onCateClick}>
            {
                category
                    .filter(item => item.group_id === -1)
                    .map(item =>
                        <SubMenu key={item.category_id} title={item.name} className="category-main__sub" >
                            {
                                category
                                    .filter(subItem => subItem.group_id === item.category_id)
                                    .map(subItem =>
                                        <Menu.Item key={`${subItem.category_id}`} className="category-main__sub">{subItem.name}</Menu.Item>
                                    )
                            }
                        </SubMenu>
                    )
            }
        </Menu>
    )
}
