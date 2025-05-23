// src/components/Header.jsx
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {getUser} from '../utils/auth';

const Header = () => {
    const user = getUser();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="header">
            <div className="user-info">{user?.full_name} - {user?.organization}</div>
            <button className="logout-btn" onClick={logout}>Chiqish</button>
        </div>
    );
};

export default Header;
