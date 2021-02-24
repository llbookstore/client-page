import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons'
import './Header.scss'
import logo from '../assets/img/logo.jpg'
import { Modal, Button, Tabs, Form, Input, Checkbox } from 'antd';
import Login from './Login'
import Signup from './Signup'
export default function Header() {
    const [inputSearch, setInputSearch] = useState(null);
    const [clickSearch, setClickSearch] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeKeyTabs, setActiveKeyTabs] = useState('1');
    const history = useHistory();
    const { TabPane } = Tabs;
    const panes = [
        { title: 'Đăng nhập', content: <Login  handleVisibleModal={setIsModalVisible} />, key: '1' },
        { title: 'Đăng ký', content: <Signup  covertToLogin={setActiveKeyTabs}/>, key: '2' }
    ]
    const onFormSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?q=${inputSearch}`);
    }


    return (
        <header className='header'>
            <div className='header__logo'>
                <img className='header__logo-img' src={logo} alt='LLBook store' />
                <Link to="/" className='header__logo-llbook '>LL BOOK</Link>
            </div>
            <form className='form-group' method='get' onSubmit={onFormSearchSubmit} >
                <input
                    className='form-field'
                    type='search'
                    value={inputSearch}
                    onClick={() => setClickSearch(true)} onChange={(e) => setInputSearch(e.target.value)}
                    placeholder='Tìm kiếm tựa sách, tác giả'
                />
                <span><FontAwesomeIcon icon={faSearch} /></span>
            </form>
            <div id="searchOverlay" style={{ display: `${clickSearch ? 'block' : 'none'}` }} onClick={() => setClickSearch(false)}></div>
            <div className='header__user'>
                <Link to='/cart'><FontAwesomeIcon icon={faCartArrowDown} className='header__user-icon color-blueviolet' /></Link>
                <Link to='/favourite'><FontAwesomeIcon icon={faHeart} className='header__user-icon' /></Link>
                <span className='header__user-login' onClick={() => { setIsModalVisible(true); setActiveKeyTabs('1') }}>Đăng nhập</span>
                <span className='header__user-sign-up' onClick={() => { setIsModalVisible(true); setActiveKeyTabs('2') }}>Đăng ký</span>
            </div>

            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >

                <Tabs activeKey={activeKeyTabs} onChange={(key) => setActiveKeyTabs(key)}>
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key}>
                            {pane.content}
                        </TabPane>))
                    }
                </Tabs>
            </Modal>
        </header>
    )
}
