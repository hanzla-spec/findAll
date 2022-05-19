import React from 'react'
import { Link } from 'react-router-dom'
import './Sidenav.css';

function Sidenav() {
    return (
        <>
            <div className='sidenav_container'>
                <ul className='sidenav'>
                    <br />
                    <li><Link to='/'>Home</Link></li>
                    <br />
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/questions'>Questions</Link></li>
                    <li><Link to='/blog'>Blog</Link></li>
                </ul>
            </div>
        </>
    )
}

export default Sidenav