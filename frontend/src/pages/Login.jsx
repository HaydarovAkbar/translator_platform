import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://172.18.18.196:5000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      alert("Kirish muvaffaqiyatli!");
    } catch (error) {
      alert("Login xato!");
    }
  };

  return (
    <div style={{ margin: '100px' }}>
      <h2>Kirish</h2>
      <form onSubmit={handleLogin}>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" /><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Parol" /><br />
        <button type="submit">Kirish</button>
      </form>
    </div>
  );
}

export default Login;

// import React from 'react';

// function Login() {
//   return (
//     <div style={{ margin: '100px', textAlign: 'center' }}>
//       <h2>Login sahifasi</h2>
//       <p>Bu yerda login forma bo‘ladi.</p>
//     </div>
//   );
// }

// export default Login;