// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
//
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
//
// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Feedbacks from './pages/Feedbacks';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;