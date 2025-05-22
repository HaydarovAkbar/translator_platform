// // import React, { useState } from 'react';
// // import axios from 'axios';
//
// // function Login() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
//
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post('http://172.18.18.196:5000/api/token/', {
// //         username,
// //         password,
// //       });
// //       localStorage.setItem('access_token', response.data.access);
// //       alert("Kirish muvaffaqiyatli!");
// //     } catch (error) {
// //       alert("Login xato!");
// //     }
// //   };
//
// //   return (
// //     <div style={{ margin: '100px' }}>
// //       <h2>Kirish</h2>
// //       <form onSubmit={handleLogin}>
// //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" /><br />
// //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Parol" /><br />
// //         <button type="submit">Kirish</button>
// //       </form>
// //     </div>
// //   );
// // }
//
// // export default Login;
//
// // src/pages/Login.jsx
// import React, { useState } from 'react';
// import './Login.css';
// import axios from 'axios';
//
// function Login() {
//   const [username, setUsername] = useState(localStorage.getItem('rememberUsername') || '');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberUsername'));
//
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://172.18.18.196:5000/api/token/', {
//         username,
//         password,
//       });
//
//       const { access, refresh } = response.data;
//       localStorage.setItem('access_token', access);
//       localStorage.setItem('refresh_token', refresh);
//
//       if (rememberMe) {
//         localStorage.setItem('rememberUsername', username);
//       } else {
//         localStorage.removeItem('rememberUsername');
//       }
//
//       alert("Kirish muvaffaqiyatli!");
//       // TODO: navigate to dashboard
//
//     } catch (error) {
//       alert("Login xato. Foydalanuvchi nomi yoki parol noto‘g‘ri.");
//     }
//   };
//
//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleLogin}>
//         <h2>Kirish</h2>
//
//         <input
//           type="text"
//           placeholder="Foydalanuvchi nomi"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//
//         <div className="password-wrapper">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Parol"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? '👁️‍🗨️' : '🙈'}
//           </button>
//         </div>
//
//         <label className="remember-me">
//           <input
//             type="checkbox"
//             checked={rememberMe}
//             onChange={(e) => setRememberMe(e.target.checked)}
//           />
//           Eslab qolish
//         </label>
//
//         <button type="submit">Kirish</button>
//       </form>
//     </div>
//   );
// }
//
// export default Login;


import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState(localStorage.getItem('rememberUsername') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberUsername'));

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://172.18.18.196:5000/api/token/', {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const {
        access, refresh, full_name,
        is_active, is_staff, is_superuser,
        uuid, groups, permissions
      } = response.data;

      // 🧠 LocalStorage saqlash
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user_info', JSON.stringify({
        full_name,
        is_active,
        is_staff,
        is_superuser,
        uuid,
        groups,
        permissions
      }));

      if (rememberMe) {
        localStorage.setItem('rememberUsername', username);
      } else {
        localStorage.removeItem('rememberUsername');
      }

      alert("✅ Kirish muvaffaqiyatli!");
      navigate('/dashboard'); // bosh sahifaga o‘tish

    } catch (error) {
      console.error(error);
      alert("❌ Login xato. Foydalanuvchi nomi yoki parol noto‘g‘ri.");
    }
  };

  return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Kirish</h2>

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
