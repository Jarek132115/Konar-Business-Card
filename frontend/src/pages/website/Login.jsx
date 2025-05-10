import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import backgroundImg from '../../assets/images/background.png';
import facebookIcon from '../../assets/icons/Facebook-Icon.svg'
import appleIcon from '../../assets/icons/Apple-Icon.svg'
import googleIcon from '../../assets/icons/Google-Icon.svg'
import LogoIcon from '../../assets/icons/Logo-Icon.svg'


export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginUser = async (e) => {
        e.preventDefault()
        const { email, password } = data

        try {
            const response = await axios.post('/login', { email, password })

            if (response.data.error) {
                toast.error(response.data.error)
            } else {
                toast.success('Login successful')
                setData({ email: '', password: '' })
                navigate('/myprofile')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong. Please try again.')
        }
    }

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
                            <p className='desktop-h5 text-center'>Welcome Back</p>
                            <p className='desktop-body-s text-center'>Please enter your details to log in</p>
                        </div>

                        <div className='login-buttons-container'>
                            <div className="login-button">
                                <img src={googleIcon} alt="Google" className="login-icon" />
                            </div>
                            <div className="login-button">
                                <img src={facebookIcon} alt="Facebook" className="login-icon" />
                            </div>
                            <div className="login-button">
                                <img src={appleIcon} alt="Apple" className="login-icon" />
                            </div>
                        </div>

                        <form onSubmit={loginUser}>
                            <div className="login-input-container">
                                <label className='desktop-body-s'>Email</label>
                                <input type="email" placeholder="Enter email..." value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            </div>
                            <div className="login-input-container">
                                <label className='desktop-body'>Password</label>
                                <input type="password" placeholder="Enter password..." value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            </div>
                            <label className='terms-label'>
                                <input type='checkbox' className='terms-checkbox' />
                                <span className='desktop-body-xs'>
                                    Remember Me
                                </span>
                            </label>
                            <button className='blue-button-login desktop-button' type="submit">Login</button>
                        </form>
                        <p className='login-redirect text-center desktop-body-s'>Don't have An Account?  <a href="/register"><span style={{ fontWeight: 600, color: 'black' }}>Register Now</span></a></p>
                    </div>

                </div>
                <div className='login-image-container'>
                    <img src={backgroundImg} alt="Background" className="login-bg" />
                </div>
            </div>
        </>
    )
}
