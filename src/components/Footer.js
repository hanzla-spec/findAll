import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'


function Footer() {
    return (
        <div className='footer_container'>
            <div className='footer_findAll'>
                <h1>findAll</h1>
                <ul>
                    <li><Link to='/questions'>Questions</Link></li>
                    <li><Link to='/blog'>Blog</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </div>
            <div className='footer_legal'>
                <h1>LEGAL</h1>
                <ul>
                    <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
                </ul>
            </div>
            <div className='footer_social'>
                <h1>SOCIAL</h1>
                <ul>
                    <li><a href='/'>Facebook</a></li>
                    <li><a href='/'>Twitter</a></li>
                    <li><a href='/'>LinkedIn</a></li>
                </ul>
            </div>
            <div className='footer_copyright'>
                <span className='footer_copyrightText'>
                    &copy;&nbsp;&nbsp; findAll since 2022.
                </span>

            </div>

        </div>
    )
}

export default Footer