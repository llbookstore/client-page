import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons'
import './Header.scss'
import logo from '../assets/img/logo.jpg'
//antd
import { Modal, Tabs, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
//redux
import { connect } from 'react-redux';
import * as actions from '../actions'
//component
import Login from './Login'
import Signup from './Signup'
const Header = (props) => {
    const { userInfo, onLogout, onGetProducts, onGetCategories } = props;
    const [inputSearch, setInputSearch] = useState('');
    const [clickSearch, setClickSearch] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeKeyTabs, setActiveKeyTabs] = useState('1');
    const [isLogin, setIsLogin] = useState(false);
    const history = useHistory();
    const { TabPane } = Tabs;
    const panes = [
        { title: 'Đăng nhập', content: <Login handleVisibleModal={setIsModalVisible} onLogin={setIsLogin} />, key: '1' },
        { title: 'Đăng ký', content: <Signup covertToLogin={setActiveKeyTabs} title={'Đăng ký'} />, key: '2' }
    ]
    const onLogoutClick = () => {
        setIsLogin(false);
        onLogout();
        sessionStorage.setItem('userData', 'null');
    }
    const menu = (
        <Menu>
            <Menu.Item onClick={() => { setIsModalVisible(true); setIsLogin(true) }}>
                Chỉnh sửa thông tin
            </Menu.Item>
            <Menu.Item danger onClick={onLogoutClick}>Đăng xuất</Menu.Item>
        </Menu>
    );
    const onFormSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?q=${inputSearch}`);
    }

    useEffect(() => {
        getBooks();
        getCategories();
    }, [])

    async function getBooks() {
        try {
            const res = await axios.get('/books?row_per_page=10000000');
            onGetProducts(res.data.data.rows);
        } catch (err) {
            console.log(err);
        }
    }

    async function getCategories() {
        try {
            const res = await axios.get('/category?active=1');
            onGetCategories(res.data.data);
        } catch (err) {
            console.log(err);
        }
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
                {
                    (Object.keys(userInfo).length === 0) ?
                        (<>
                            <span className='header__user-login' onClick={() => { setIsModalVisible(true); setActiveKeyTabs('1') }}>Đăng nhập</span>
                            <span className='header__user-sign-up' onClick={() => { setIsModalVisible(true); setActiveKeyTabs('2') }}>Đăng ký</span>
                        </>)
                        :
                        (
                            <Dropdown overlay={menu}>
                                <span className='header__user-username ant-dropdown-link'>
                                    {userInfo.account_name} <DownOutlined />
                                </span>
                            </Dropdown>
                        )
                }
            </div>

            <Modal
                title={isLogin ? 'Cập nhật tài khoản' : ''}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {
                    !isLogin ? <Tabs activeKey={activeKeyTabs} onChange={(key) => setActiveKeyTabs(key)}>
                        {panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key}>
                                {pane.content}
                            </TabPane>))
                        }
                    </Tabs>
                        : <Signup title={'Cập nhật'} isUpdateAccount={true} />

                }
            </Modal>
        </header>
    )
}
const mapStateToProps = (state) => {
    const { user, products } = state;
    return { userInfo: user, products };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogout: () => dispatch(actions.logout()),
        onGetProducts: (products) => dispatch(actions.getAllProducts(products)),
        onGetCategories: (categories) => dispatch(actions.getCategories(categories))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);