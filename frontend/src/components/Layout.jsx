import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => (
    <div className="main-layout">
        <Sidebar />
        <div className="content-area">
            <Header />
            <div className="page-content">
                <Outlet />
            </div>
        </div>
    </div>
);

export default Layout;