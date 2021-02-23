import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons'
import './Header.scss';
import logo from '../assets/img/logo.jpg';
export default function Header() {
    const [inputSearch, setInputSearch] = useState(null);
    const [clickSearch, setClickSearch] = useState(false);

    return (
        <header className='header'>
            <div className='header__logo'>
                <img className='header__logo-img' src={logo} alt='LLBook store' />
                <span className='header__logo-llbook'>LL BOOK</span>
            </div>
            <form className='form-group'>
                <input className='form-field' type='search' value={inputSearch} onClick={() => setClickSearch(true)} onChange={(e) => setInputSearch(e.target.value)} placeholder='Tìm kiếm tựa sách, tác giả' />
                <span><FontAwesomeIcon icon={faSearch} /></span>
            </form>
            <div id="searchOverlay" style={{ display: `${clickSearch ? 'block' : 'none'}` }} onClick={() => setClickSearch(false)}></div>
            <div className='header__user'>
                <FontAwesomeIcon icon={faCartArrowDown} className='header__user-icon color-blueviolet' />
                <FontAwesomeIcon icon={faHeart} className='header__user-icon' />
                <span className='header__user-login'>Đăng nhập</span>
                <span style={{ cursor: 'pointer' }}>Đăng ký</span>
            </div>
        </header>
    )
}
