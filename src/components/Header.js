import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons'
import './Header.scss'
import logo from '../assets/img/logo.png'
//antd
import { Modal, Tabs, Menu, Dropdown, message, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
//redux
import { connect } from 'react-redux';
import * as actions from '../actions'
//component
import Login from './Login'
import Signup from './Signup'
const Header = (props) => {
    const { userInfo, onLogout } = props;
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
            <Menu.Item onClick={() => history.push('/check-order')}>
                Đơn hàng của tôi
            </Menu.Item>
            <Menu.Item danger onClick={onLogoutClick}>Đăng xuất</Menu.Item>
        </Menu>
    );
    const onFormSearchSubmit = (e) => {
        e.preventDefault();
        history.push(`/search?q=${inputSearch}`);
    }

    const onFavouriteHeartClick = () => {
        if (!userInfo.favourites) {
            message.warn('Bạn cần đăng nhập để thực hiện chức năng này!');
        }
        else {
            history.push('/favourite');
        }
    }

    const onCartIconClick = () => {
        if (!userInfo.carts) {
            message.warn('Bạn cần đăng nhập để thực hiện chức năng này!');
        }
        else {
            history.push('/cart');
        }
    }
    return (
        <header className='header'>
            <div className='header__logo'>
                <img className='header__logo-img' src={logo} alt='Sách trí tuệ' />
                <Link to="/" className='header__logo-llbook '>SÁCH TRÍ TUỆ</Link>
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
                <Badge count={userInfo.carts ? userInfo.carts.length : 0} offset={[-15, 0]}>
                    <FontAwesomeIcon icon={faCartArrowDown} className='header__user-icon color-blueviolet' onClick={onCartIconClick} />
                </Badge>
                <Badge count={userInfo.favourites ? userInfo.favourites.length : 0} offset={[-15, 0]}>
                    <FontAwesomeIcon icon={faHeart} className='header__user-icon' onClick={onFavouriteHeartClick} />
                </Badge>
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
        onLogout: () => dispatch(actions.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);