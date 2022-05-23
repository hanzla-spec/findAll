import React, { useEffect, useState } from 'react'
import './VerifyEmail.css'
import emailService from '../services/emailService'
import toast from 'react-hot-toast';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

function VerifyEmail() {

    const [userOTP, setUserOTP] = useState('');
    const [isShowOtpSent, setShowOtpSent] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();


    const handleChange = (evt) => {
        setUserOTP(evt.target.value);
    }

    const handleSendOTP = async () => {
        console.log('handle-send otp');
        const fetcData = async () => {
            const sendOTP = await emailService.generateOTP();
            setShowOtpSent(true);
            return sendOTP;
        }
        toast.promise(fetcData(), { loading: 'sending...', success: 'OTP sent', error: 'error occured' })
    }

    const validateOTP = async () => {
        console.log('validate otp');
        const fetcData = async () => {
            const sendOTP = await emailService.validateOTP(userOTP);
            return sendOTP;
        }
        toast.promise(fetcData(), {
            loading: 'verifying...',
            success: () => {
                const JWT = JSON.parse(localStorage.getItem("USER"));
                JWT.is_verified = 'true';
                localStorage.setItem("USER", JSON.stringify(JWT));
                navigate('/');
                return 'Email verified';
            },
            error: (err) => (err.response && err.response.status === 403) ? err.response.data.message : 'error occured'
        })

    }

    useEffect(() => {
        console.log('verify effct');
        if (username === '' && localStorage.getItem("USER")) {
            setUsername(JSON.parse(localStorage.getItem("USER")).username)
        }

    }, [isShowOtpSent, username])

    return (
        <div className='verifyEmailMain_container'>

            {
                (username !== '') ?
                    <div className='verifyEmailMain_div'>
                        {
                            isShowOtpSent ?
                                <div>
                                    <span>OTP has been sent to <span style={{ color: 'var(--blue-minded)' }}>{username}</span></span>
                                    <input className='otpInput_Fieled' type='text' value={userOTP} onChange={(evt) => handleChange(evt)} placeholder='Enter OTP' required />
                                    <span onClick={() => validateOTP()}><Button text='Verify' type='dark' size='medium' /></span><br />

                                </div>
                                :
                                <div style={{ marginTop: '10px' }}>
                                    <p style={{ marginBottom: '30px' }}>Verify Email</p>
                                    <span>Send OTP to <span style={{ color: 'var(--blue-minded)' }}>{username}</span></span>
                                    <div style={{ marginTop: '20px' }}><span onClick={() => handleSendOTP()}><Button text='Send' type='dark' size='medium' /></span></div>
                                </div>
                        }
                    </div>
                    :
                    <div className='verifyEmailMain_div'>
                        <span>Enter login details to verify email</span><br />
                        <div style={{ marginTop: '20px' }}><Link to='/login'><Button text='login' type='dark' size='small' /></Link></div>
                    </div>
            }

        </div>
    )
}

export default VerifyEmail