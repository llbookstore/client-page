import React from 'react';
import {useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import './Category.scss';

const { SubMenu } = Menu;

export default function Category(props) {
    const { category } = props;
    const history = useHistory();
    const onCateClick = (e) => {
        const { key } = e;
        history.push(`/category/${key}`);
    }
    return (
        <Menu className="category-main" mode="vertical" title='Danh mục'>
            <Menu.Item className='category-title-name'>Danh mục sách</Menu.Item>
            {
                category
                    .filter(item => item.group_id === -1)
                    .map(item =>
                        <SubMenu key={item.category_id} title={item.name} className="category-main__sub" onTitleClick={onCateClick}>
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
