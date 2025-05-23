import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState(localStorage.getItem('rememberUsername') || '');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberUsername'));
    const [errorMessage, setErrorMessage] = useState(''); // 👈 Xatolikni chiqarish uchun

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // eski xabarni tozalaymiz

        try {
            const response = await axios.post('http://172.18.18.196:5000/api/account/login/', {
                username,
                password,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            const {
                access, refresh, full_name,
                is_active, is_staff, is_superuser,
                uuid, groups, permissions, organization
            } = response.data;

            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('user_info', JSON.stringify({
                full_name,
                is_active,
                is_staff,
                is_superuser,
                uuid,
                groups,
                permissions,
                organization
            }));

            if (rememberMe) {
                localStorage.setItem('rememberUsername', username);
            } else {
                localStorage.removeItem('rememberUsername');
            }

            navigate('/dashboard'); // ✅ login muvaffaqiyatli bo‘lsa, to‘g‘ridan-to‘g‘ri o'tkazamiz

        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage("❌ Login yoki parol noto‘g‘ri.");
            } else {
                setErrorMessage("⚠️ Tizimda xatolik. Iltimos, keyinroq urinib ko‘ring.");
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Kirish</h2>

                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}

                <input
                    type="text"
                    placeholder="Foydalanuvchi nomi"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Parol"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '👁️‍🗨️' : '🙈'}
                    </button>
                </div>

                <label className="remember-me">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Eslab qolish
                </label>

                <button type="submit">Kirish</button>
            </form>
        </div>
    );
}

export default Login;
