import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Route, Routes } from 'react-router-dom'
import Main from '../Blog/Main'


function Blog() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='*' element={<><div style={{ margin: '0px auto', marginTop: '100px', minHeight: '50vh', fontSize: '2rem' }}>404! page not found</div></>} />
            </Routes>

            <Footer /></div>
    )
}

export default Blog