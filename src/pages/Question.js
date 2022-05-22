import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import AskQuestion from '../Question/AskQuestion'
import EachQuestion from '../Question/EachQuestion'
import Main from '../Question/Main'
import SearchQuestion from '../Question/SearchQuestion'

function Question() {
    return (
        <div style={{ backgroundColor: 'white' }}>
            <Navbar />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/search/*' element={<SearchQuestion />} />
                <Route path='/ask/*' element={<AskQuestion />} />
                <Route path='/:questionId/:title/*' element={<EachQuestion />} />
                <Route path='*' element={<><div style={{ margin: '0px auto', marginTop: '100px', minHeight: '50vh', fontSize: '2rem' }}>404! page not found</div></>} />
            </Routes>

            <Footer />
        </div>
    )
}

export default Question;