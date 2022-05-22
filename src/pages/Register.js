import React, { useRef, useState } from 'react'
import Button from '../components/Button'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import DTOs from '../models/DTOs';
import toast from 'react-hot-toast'
import loginService from '../services/loginService'
import Loader from '../assets/Loader.gif'
import validator from 'validator';
import { FcInfo } from 'react-icons/fc'


function Register() {


    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState(DTOs.loginDetails);
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
        // email validate

        if (loginDetails.password.trim() === '') {
            toast((t) => (
                <span style={{ fontSize: '1rem' }}><FcInfo />&nbsp;&nbsp;Please enter password
                </span>
            ))
            return;
        }

        if (!validator.isEmail(loginDetails.username)) {
            toast.error("Enter valid Email")
        } else {
            setLoading(true);
            let JWT = DTOs.JWTs;
            await loginService.registerUser(loginDetails).then(
                (res) => {
                    toast.success("Registration successful");
                    loginService.loginUser(loginDetails).then(
                        (res) => {
                            localStorage.removeItem("JWT");
                            JWT = res.data;
                            JWT.userId = null;
                            localStorage.setItem("JWT", JSON.stringify(JWT));
                            navigate('/');
                        }, (error) => {
                            if (error.response.status === 500) {
                                toast((t) => (
                                    <span style={{ fontSize: '1rem' }}><FcInfo />&nbsp;&nbsp;There is some issue from our server.please try after some time
                                    </span>
                                ))
                            } else {
                                toast((t) => (
                                    <span style={{ fontSize: '1rem' }}><FcInfo />&nbsp;&nbsp;{error.response.data.message}
                                    </span>
                                ))
                            }

                        }
                    ).catch((ex) => {
                        toast((t) => (
                            <span style={{ fontSize: '1rem' }}><FcInfo />&nbsp;&nbsp;There is some issue from our server.please try after some time
                            </span>
                        ))
                    }).finally(() => {
                        setLoading(false);

                    });
                }, (error) => {
                    if (error.response.status === 500) {
                        toast.error('Server error!');
                    } else {
                        toast.error(error.response.data.message);
                    }
                }
            ).catch((ex) => {
                toast.error("Server error!")
            }).finally(() => {
                setLoading(false);
            });
        }

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
                        <span>SIGN UP</span>
                    </div>
                    <form className='login' onSubmit={handleSubmit}>
                        <input ref={usernameRef} name='username' className='username' onChange={handleChange} type='text' placeholder='email' required />
                        <input ref={passwordRef} name='password' className='password' onChange={handleChange} type='password' placeholder='password' required />
                        <div className='login_options'>
                            <span className='privacy_policy_span'>By clicking register you are agreeing to the <Link className='privacy_policy' to='/privacy-policy'>privacy policies</Link> </span>
                            <div className='register_btn'>
                                <Button text='SIGN UP' type='dark' size='medium' button_type='submit' />
                            </div>
                            <div className='already_registered'>
                                <span >Already a member?&nbsp;<Link className='goto_login' to='/login'>LOGIN HERE</Link></span>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Register