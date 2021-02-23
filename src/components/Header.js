import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCartArrowDown, faHeart } from '@fortawesome/free-solid-svg-icons'
import './Header.scss'
import logo from '../assets/img/logo.jpg'

export default function Header() {
    const [inputSearch, setInputSearch] = useState(null);
    const [clickSearch, setClickSearch] = useState(false);

    return (
        <header className='header'>
            <div className='header__logo'>
                <img className='header__logo-img' src={logo} alt='LLBook store' />
                <Link to="/" className='header__logo-llbook'>LL BOOK</Link>
            </div>
            <form className='form-group'>
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
                <Link to='/login' className='header__user-login'>Đăng nhập</Link>
                <Link to='/signup'>Đăng ký</Link>
            </div>
        </header>
    )
}
