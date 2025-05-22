// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { hasRole } from '../utils/auth';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/dashboard">🏠 Bosh sahifa</Link></li>
                <li><Link to="/documents">📄 Hujjatlar</Link></li>

                {hasRole('admin') && (
                    <>
                        <li><Link to="/feedbacks">📊 Fikrlar</Link></li>
                        <li><Link to="/monitoring">📈 Monitoring</Link></li>
                        <li><Link to="/users">👥 Foydalanuvchilar</Link></li>
                    </>
                )}

                {hasRole('idoravakili') && (
                    <>
                        <li><Link to="/responses">📝 Fikr Bildirish</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
