import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Account from '../pages/Account'
import Home from '../pages/Home'
import Profile from '../Profile/Profile'


function Main() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/account' element={<Account />} />
                <Route path='/profile/:userId' element={<Profile />} />
                <Route path='*' element={<><div style={{ margin: '0px auto', marginTop: '100px', minHeight: '50vh', fontSize: '2rem' }}>404! page not found</div></>} />
            </Routes>
            <Footer />
        </div>
    )
}

export default Main