import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Needhelp from './pages/Needhelp'
import PrivacyPolicy from './pages/PrivacyPolicy';
import Question from './pages/Question'
import About from './pages/About'
import Blog from './pages/Blog'

function App() {
    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <Router>
                <Routes>
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/needhelp' element={<Needhelp />} />
                    <Route exact path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path="/*" element={<Main />} />
                    <Route path="/questions/*" element={<Question />} />
                    <Route path="/about/*" element={<About />} />
                    <Route path="/blog/*" element={<Blog />} />
                </Routes>
            </Router>
        </>
    )
}

export default App