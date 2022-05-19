import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import Button from './Button'
import { FaSearch, FaBars, FaWindowClose } from 'react-icons/fa'
import UseMediaQuery from '../hooks/UseMediaQuery'
import UseOutsideClick from '../hooks/UseOutsideClick'
import Sidenav from './Sidenav'
import avatar from '../assets/avatar-1.png'
import loginService from '../services/loginService'

function Navbar() {

    const isMedia1024 = UseMediaQuery('(max-width: 1024px)')
    const isMedia768 = UseMediaQuery('(max-width: 768px)')
    const isMedia400 = UseMediaQuery('(max-width: 400px)')
    const [isNavOpen, setNavOpen] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [isSearchBar, setSearchBar] = useState(false);
    const navToggleRef = useRef(null);

    const handleSidenavRef = () => setNavOpen(false);
    const handleSearch = () => {
        setSearchBar(!isSearchBar);
    }
    UseOutsideClick(navToggleRef, handleSidenavRef)

    const handleSidenav = () => {
        setNavOpen(!isNavOpen)
    }

    useEffect(() => {
        console.log('effect-navbar');
        if (loginService.isUserLogin()) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [isLogin])

    return (
        <>
            <div className='header_container'>

                <div ref={navToggleRef}>
                    {
                        isMedia1024 && (isNavOpen ?
                            <div>
                                <FaWindowClose onClick={handleSidenav} className='header_bar' />
                                <Sidenav />
                            </div> :
                            <FaBars onClick={handleSidenav} className='header_bar' />)
                    }
                </div>



                <div className='header_logo'>
                    <Link to='/'>
                        <span className='logo_find'>find<span className='logo_all'>All</span></span>
                    </Link>
                </div>
                <div className='header_nav'>
                    {isMedia1024 ||
                        <ul className='header_items'>
                            <li><Link to='/about'>About</Link></li>
                            <li><Link to='/questions'>Questions</Link></li>
                            <li><Link to='/blog'>Blog</Link></li>
                        </ul>
                    }
                    {
                        isMedia768 ||
                        <form className='header_search'>
                            <input className='header_search_input' placeholder='Search problems' type='text' />
                            <FaSearch className='header_search_btn' />
                        </form>
                    }
                    {
                        isMedia768 &&
                        <div onClick={handleSearch} className='header_search_btn_after_container'>
                            <FaSearch className='header_search_btn_after' />
                        </div>
                    }
                    {
                        /* to show search bar */
                        isMedia768 && isSearchBar && <form className='header_search_2'>
                            <input className='header_search_input_2' placeholder='Search problems' type='text' />
                            <FaSearch className='header_search_btn_2' />
                        </form>
                    }
                    {
                        isLogin ||
                        <Link className='login_register_btn' to='/login'><Button text='Log in' type='light' size='small' button_type='button' /></Link>
                    }
                    {
                        isLogin || isMedia400 ||
                        <Link className='login_register_btn' to='/register'><Button text='Sign up' type='dark' size='small' button_type='button' /></Link>
                    }
                    {
                        isLogin &&
                        <Link to='/account' className='avatar_container'>
                            <img src={avatar} alt='avatar' className='avatar' />
                        </Link>
                    }
                </div>
            </div>

        </>
    )
}

export default Navbar