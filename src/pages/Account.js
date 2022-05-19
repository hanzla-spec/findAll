import React from 'react'
import './Account.css'
import avatar from '../assets/avatar-1.png'

function Account() {
    return (
        <div className='account_container'>
            <div className='account_card'>
                <div className='profile_card'>
                    <img src={avatar} alt='avatar' />
                </div>

            </div>
        </div>
    )
}

export default Account