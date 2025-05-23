import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import DocumentsCreate from './pages/DocumentCreate';
import Feedbacks from './pages/Feedbacks';
import Users from './pages/Users';
import Layout from './components/Layout';
import './App.css';
import DocumentCreate from "./pages/DocumentCreate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route element={<Layout/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/documents" element={<Documents/>}/>
                    <Route path="/documents/create" element={<DocumentCreate/>}/> {/* ✅ Qo‘shiladi */}
                    <Route path="/feedbacks" element={<Feedbacks/>}/>
                    <Route path="/users" element={<Users/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;