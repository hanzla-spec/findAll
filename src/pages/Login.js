import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { FiInfo } from 'react-icons/fi'
import DTOs from '../models/DTOs'
import toast from 'react-hot-toast'
import loginService from '../services/loginService'
import Loader from '../assets/Loader.gif'


function Login() {

    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState(DTOs.loginDetails);
    const userDetails = DTOs.userDetails;
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (evt) => {
        const value = evt.target.value;
        setLoginDetails({
            ...loginDetails,
            [evt.target.name]: value
        })
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (loginDetails.username.trim() === '' || loginDetails.password.trim() === '') {
            toast((t) => (
                <span style={{ fontSize: '1rem' }}><FiInfo />&nbsp;&nbsp;Please enter details
                </span>
            ))
            return;
        }

        setLoading(true);
        let JWT = DTOs.JWTs;
        await loginService.loginUser(loginDetails).then(
            (res) => {
                localStorage.removeItem("JWT");
                JWT = res.data;
                userDetails.userId = res.data.userId;
                JWT.userId = null;
                localStorage.setItem("JWT", JSON.stringify(JWT));
                userDetails.username = loginDetails.username;
                localStorage.setItem("USER", JSON.stringify(userDetails));
                navigate('/');
            }, (error) => {
                if (error.response.status === 500) {
                    toast((t) => (
                        <span style={{ fontSize: '1rem' }}><FiInfo />&nbsp;&nbsp;There is some issue from our server.please try after some time
                        </span>
                    ))
                } else {
                    toast((t) => (
                        <span style={{ fontSize: '1rem' }}><FiInfo />&nbsp;&nbsp;{error.response.data.message}
                        </span>
                    ))
                }
                return;
            }
        ).catch((ex) => {
            toast((t) => (
                <span style={{ fontSize: '1rem' }}><FiInfo />&nbsp;&nbsp;There is some issue from our server.please try after some time
                </span>
            ))
        }).finally(() => {
            setLoading(false);
        }
        );
    }

    return (
        <>
            {
                loading &&
                <div id="loading">
                    <img id="loading-image" src={Loader} alt="Loading..." />
                </div>

            }
            <div className='login_container'>
                <div className='login_color_bar'></div>
                <div className='login_content'>
                    <div className='login_heading'>
                        <span>LOGIN</span>
                    </div>
                    <form className='login' onSubmit={handleSubmit}>
                        <input ref={usernameRef} name='username' className='username' onChange={handleChange} type='text' placeholder='email' value={loginDetails.username} required />
                        <input ref={passwordRef} name='password' className='password' onChange={handleChange} type='password' placeholder='password' value={loginDetails.password} required />
                        <span className='need_help'><Link to='/needhelp'>Need help?</Link></span>

                        <div className='login_options'>
                            <Button text='Login' type='dark' size='medium' button_type='submit' />

                            <div className='new_member'>
                                <span >New member?&nbsp;<Link className='goto_register' to='/register'>REGISTER HERE</Link></span>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login