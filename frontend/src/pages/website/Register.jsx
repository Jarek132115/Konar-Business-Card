import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import backgroundImg from '../../assets/images/background.png';
import facebookIcon from '../../assets/icons/Facebook-Icon.svg'
import appleIcon from '../../assets/icons/Apple-Icon.svg'
import googleIcon from '../../assets/icons/Google-Icon.svg'
import LogoIcon from '../../assets/icons/Logo-Icon.svg'


export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = data;

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/register', {
                name,
                email,
                password,
                confirmPassword,
            });

            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success('Account created successfully');
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                navigate('/myprofile');
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <nav className="nav-login">
                <div className="nav-container">
                    <Link to="/" className="logo-link">
                        <img src={LogoIcon} alt="Logo" className="logo" />
                    </Link>
                </div>
            </nav>
            <div className='login-container'>
                <div className='form-container'>
                    <div className='form-container-white'>
                        <div className='login-title-container'>
                            <p className='desktop-h5 text-center'>Create Your Account</p>
                            <p className='desktop-body-s text-center'>Please enter your details to create an account</p>
                        </div>
                        <div className='login-buttons-container'>
                            <div className='login-button'>
                                <img src={googleIcon} alt='Google' className='login-icon' />
                            </div>
                            <div className='login-button'>
                                <img src={facebookIcon} alt='Facebook' className='login-icon' />
                            </div>
                            <div className='login-button'>
                                <img src={appleIcon} alt='Apple' className='login-icon' />
                            </div>
                        </div>
                        <form onSubmit={registerUser}>
                            <div className='login-input-container'>
                                <label className='desktop-body-s'>Name</label>
                                <input
                                    className='desktop-body-xs'
                                    type='text'
                                    placeholder='Enter name...'
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </div>
                            <div className='login-input-container'>
                                <label className='desktop-body-s'>Email</label>
                                <input
                                    className='desktop-body-xs'
                                    type='email'
                                    placeholder='Enter email...'
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                />
                            </div>
                            <div className='login-input-container'>
                                <label className='desktop-body-2'>Password</label>
                                <input
                                    className='desktop-body-xs'
                                    type='password'
                                    placeholder='Enter password...'
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                />
                            </div>
                            <div className='login-input-container'>
                                <label className='desktop-body-s'>Confirm Password</label>
                                <input
                                    className='desktop-body-xs'
                                    type='password'
                                    placeholder='Confirm password...'
                                    value={data.confirmPassword}
                                    onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                                />
                            </div>
                            <div className='terms-container'>
                                <label className='terms-label'>
                                    <input type='checkbox' required className='terms-checkbox' />
                                    <span className='desktop-body-xs'>
                                        I agree to the <a href='/terms'>Terms of Service</a> & <a href='/privacy'>Privacy Policy</a>
                                    </span>
                                </label>
                            </div>
                            <button className='blue-button-login desktop-button' type='submit'>
                                Register
                            </button>
                        </form>
                        <p className='login-redirect text-center desktop-body-s'>Already have An Account?  <a href="/login"><span style={{ fontWeight: 600, color: 'black' }}>Login Now</span></a></p>
                    </div>
                </div>
                <div className='login-image-container'>
                    <img src={backgroundImg} alt='Background' className='login-bg' />
                </div>
            </div>
        </>
    );
}
