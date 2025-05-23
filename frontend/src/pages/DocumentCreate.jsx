// import React, {useEffect, useState} from 'react';
// import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
// import './Documents.css';
// import {toast, ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
//
// function DocumentCreate() {
//     const navigate = useNavigate();
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [document, setDocument] = useState(null);
//     const [organizations, setOrganizations] = useState([]);
//     const [selectedOrgs, setSelectedOrgs] = useState([]);
//     const [deadlines, setDeadlines] = useState({});
//     const token = localStorage.getItem('access_token');
//
//     useEffect(() => {
//         axios.get('http://172.18.18.196:5000/api/organizations/', {
//             headers: {Authorization: `Bearer ${token}`}
//         }).then(res => setOrganizations(res.data));
//     }, []);
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content);
//         if (document) formData.append('document', document);
//         formData.append('targets', JSON.stringify(selectedOrgs.map(orgId => ({
//             organization: orgId,
//             deadline: deadlines[orgId] || null
//         }))));
//
//         // try {
//         //     await axios.post('http://172.18.18.196:5000/api/documents/create/', formData, {
//         //         headers: {
//         //             Authorization: `Bearer ${token}`,
//         //             'Content-Type': 'multipart/form-data'
//         //         }
//         //     });
//         //     navigate('/documents');
//         // } catch (err) {
//         //     alert('Yuborishda xatolik yuz berdi.');
//         // }
//         try {
//             await axios.post('http://172.18.18.196:5000/api/documents/create/', formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//
//             toast.success("✅ Hujjat muvaffaqiyatli yuborildi!");
//
//             // Formani tozalash
//             setTitle('');
//             setContent('');
//             setDocument(null);
//             setSelectedOrgs([]);
//             setDeadlines({});
//
//             // 2 soniyadan so‘ng sahifaga yo‘naltirish
//             setTimeout(() => {
//                 navigate('/documents');
//             }, 2000);
//
//         } catch (err) {
//             toast.error("❌ Xatolik yuz berdi, qaytadan urinib ko‘ring.");
//         }
//     };
//
//     return (
//         <div className="documents-wrapper">
//             <h2>Yangi hujjat yaratish</h2>
//             <form onSubmit={handleSubmit} className="document-form">
//                 <div>
//                     <label>Sarlavha:</label>
//                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
//                 </div>
//                 <div>
//                     <label>Matn:</label>
//                     <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
//                 </div>
//                 <div>
//                     <label>Fayl (ixtiyoriy):</label>
//                     <input type="file" onChange={(e) => setDocument(e.target.files[0])}/>
//                 </div>
//                 <div>
//                     <label>Tashkilotlar va deadline:</label>
//                     <div className="org-select-list">
//                         {organizations.map(org => (
//                             <div key={org.id} className="org-item">
//                                 <label>
//                                     <input
//                                         type="checkbox"
//                                         value={org.id}
//                                         checked={selectedOrgs.includes(org.id)}
//                                         onChange={(e) => {
//                                             const id = parseInt(e.target.value);
//                                             if (e.target.checked) {
//                                                 setSelectedOrgs(prev => [...prev, id]);
//                                             } else {
//                                                 setSelectedOrgs(prev => prev.filter(x => x !== id));
//                                                 const updated = {...deadlines};
//                                                 delete updated[id];
//                                                 setDeadlines(updated);
//                                             }
//                                         }}
//                                     />
//                                     {org.title}
//                                 </label>
//                                 {selectedOrgs.includes(org.id) && (
//                                     <input
//                                         type="date"
//                                         value={deadlines[org.id] || ''}
//                                         onChange={(e) => setDeadlines(prev => ({...prev, [org.id]: e.target.value}))}
//                                         placeholder="Deadline"
//                                     />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <button type="submit" className="create-btn">Yuborish</button>
//             </form>
//         </div>
//     );
// }
//
// export default DocumentCreate;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Documents.css';

const animatedComponents = makeAnimated();

function DocumentCreate() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [translation, setTranslation] = useState('');
    const [document, setDocument] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [selectedOrgs, setSelectedOrgs] = useState([]);
    const [deadline, setDeadline] = useState('');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        axios.get('http://172.18.18.196:5000/api/organizations/', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            const options = res.data.map(org => ({ value: org.id, label: org.title }));
            setOrganizations(options);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('translation', translation);
        if (document) formData.append('document', document);
        formData.append('deadline', deadline);
        formData.append('organizations', JSON.stringify(selectedOrgs.map(o => o.value)));

        try {
            await axios.post('http://172.18.18.196:5000/api/documents/create/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('✅ Hujjat muvaffaqiyatli yuborildi!');
            setTimeout(() => navigate('/documents'), 2000);
        } catch (err) {
            toast.error('❌ Yuborishda xatolik yuz berdi.');
        }
    };

    return (
        <div className="documents-wrapper">
            <ToastContainer position="top-right" autoClose={2000} />
            <h2>Yangi hujjat yaratish</h2>
            <form onSubmit={handleSubmit} className="document-form two-column">
                <div className="form-left">
                    <label>Sarlavha:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                    <label>Matn:</label>
                    <textarea
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Asl matn"
                    />
                </div>
                <div className="form-right">
                    <label>Tarjimasi:</label>
                    <textarea
                        rows="10"
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        placeholder="Tarjima"
                    />

                    <label>Fayl (ixtiyoriy):</label>
                    <input type="file" onChange={(e) => setDocument(e.target.files[0])} />

                    <label>Deadline:</label>
                    <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

                    <label>Tashkilotlar:</label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={organizations}
                        value={selectedOrgs}
                        onChange={setSelectedOrgs}
                        placeholder="Tashkilotlarni tanlang..."
                    />
                </div>

                <div className="full-width">
                    <button type="submit" className="create-btn">Yuborish</button>
                </div>
            </form>
        </div>
    );
}

export default DocumentCreate;
