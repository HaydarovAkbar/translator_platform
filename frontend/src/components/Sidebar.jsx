// // src/components/Sidebar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { hasRole } from '../utils/auth';
//
// const Sidebar = () => {
//     return (
//         <div className="sidebar">
//             <div className="logo">LOGO</div>
//             <ul>
//                 <li><Link to="/dashboard">🏠 Bosh sahifa</Link></li>
//                 <li><Link to="/documents">📄 Hujjatlar</Link></li>
//                 {hasRole('admin') && (
//                     <>
//                         <li><Link to="/feedbacks">📊 Fikr so‘rovlar</Link></li>
//                         <li><Link to="/users">👥 Foydalanuvchilar</Link></li>
//                     </>
//                 )}
//                 {hasRole('idoravakili') && (
//                     <li><Link to="/responses">📝 Fikr bildirish</Link></li>
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { hasRole } from '../utils/auth';

// Import ikonalar
import { MdSpaceDashboard } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { TbMessageReport } from 'react-icons/tb';
import { FiUsers } from 'react-icons/fi';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">LOGO</div>
            <ul>
                <li>
                    <Link to="/dashboard">
                        <MdSpaceDashboard style={{ marginRight: 8 }} /> Bosh sahifa
                    </Link>
                </li>
                <li>
                    <Link to="/documents">
                        <HiOutlineDocumentText style={{ marginRight: 8 }} /> Hujjatlar
                    </Link>
                </li>
                {hasRole('admin') && (
                    <>
                        <li>
                            <Link to="/feedbacks">
                                <TbMessageReport style={{ marginRight: 8 }} /> Fikr so‘rovlar
                            </Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <FiUsers style={{ marginRight: 8 }} /> Foydalanuvchilar
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
