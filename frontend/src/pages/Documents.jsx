import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import './Documents.css';
import {FaEye} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function Documents() {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('');
    const token = localStorage.getItem('access_token');

    // const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}');
    const permissions = userInfo.permissions || [];
    const canCreate = permissions.includes('add_application');

    useEffect(() => {
        fetchData();
    }, [page, filter]);

    const fetchData = async () => {
        const response = await axios.get(`http://172.18.18.196:5000/api/documents/?page=${page}&search=${filter}`, {
            headers: {Authorization: `Bearer ${token}`}
        });

        setDocuments(response.data.results);
        setCount(response.data.count);
        setTotalPages(response.data.total_pages || 1);
    };

    return (
        <div className="documents-wrapper">
            <div className="documents-header">
                <h2>Hujjatlar</h2>

                <div style={{display: 'flex', gap: '10px'}}>

                    {canCreate && (
                        <button
                            onClick={() => navigate('/documents/create')}
                            className="create-btn"
                        >
                            Yaratish
                        </button>
                    )}
                </div>
            </div>

            <div className="documents-table">
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Sarlavha</th>
                        <th>Yaratilgan sana</th>
                        <th>Fayl</th>
                        <th>Muddati</th>
                        <th>Amallar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.length > 0 ? documents.map((doc, i) => {
                        return (
                            <tr key={doc.id}>
                                <td>{(page - 1) * 10 + i + 1}</td>
                                <td>{doc.title}</td>
                                <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                                <td>{doc.document ?
                                    <a href={doc.document} target="_blank" rel="noreferrer">Yuklab olish</a> : '—'}</td>
                                <td>{doc.deadline || '—'}</td>
                                <td>
                                    <button
                                        className="view-btn"
                                        onClick={() => window.location.href = `/documents/${doc.id}`}
                                        title="Ko‘rish"
                                    >
                                        <FaEye/>
                                    </button>
                                </td>
                            </tr>
                        );
                    }) : (
                        <tr>
                            <td colSpan="8">Maʼlumot topilmadi</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <div className="documents-footer">
                <span>Jami: {count}</span>
                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            </div>
        </div>
    );
}

export default Documents;
