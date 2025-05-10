import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import settingsIcon from '../assets/icons/Settings-Icon.svg'
import profileIcon from '../assets/icons/Profile-Icon.svg'
import cardIcon from '../assets/icons/Card-Icon.svg'
import helpIcon from '../assets/icons/Help-Icon.svg'
import logoutIcon from '../assets/icons/Logout-Icon.svg'

export default function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <div className='sidebar'>
            <div className="my-account-container">
                <img style={{ width: 40, height: 40 }} src={profileIcon} alt="profile" className="icon" />
                <div>
                    <p style={{ color: 333 }} className='desktop-body-xs'>jarek.kon0709@gmail.com</p>
                    <p className='desktop-body-s'>Jarek Konarski</p>
                </div>
                <img src={settingsIcon} alt="settings" className="icon" />
            </div>
            <div className="main-links-container">
                <p style={{ fontSize: 12 }}>MAIN</p>
                <div className="sidebar-buttons">
                    <img src={profileIcon} alt="profile" className="icon" />
                    <p className='desktop-body-s'>My Profile</p>
                </div>
                <div className="sidebar-buttons">
                    <img src={cardIcon} alt="card" className="icon" />
                    <p className='desktop-body-s'>NFC Cards</p>
                </div>
            </div>
            <div className="help-links-container">
                <p style={{ fontSize: 12 }}>HELP</p>
                <div className="sidebar-buttons">
                    <img src={helpIcon} alt="help" className="icon" />
                    <p className='desktop-body-s'>Help</p>
                </div>
            </div>
            <div className="sidebar-buttons logout-button" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <img src={logoutIcon} alt="logout" className="icon" />
                <p className='desktop-body-s' style={{ color: '#FF0000' }}>Logout Account</p>
            </div>
        </div>
    );
}
