import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Pie, Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        axios.get('http://172.18.18.196:5000/api/dashboard/stats/', {
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => setStats(res.data));
    }, []);

    if (!stats) return <p>Yuklanmoqda...</p>;

    const statusLabels = {
        sent: "Yuborilgan",
        viewed: "Ko‘rilgan",
        in_progress: "Ko‘rib chiqilmoqda",
        done: "Ko‘rib chiqilgan"
    };

// So‘ng Pie chartni shunday yozasiz:
    const statusData = {
        labels: stats.status_distribution.map(item => statusLabels[item.status] || item.status),
        datasets: [{
            data: stats.status_distribution.map(item => item.count),
            backgroundColor: ['#ffcd56', '#36a2eb', '#4bc0c0', '#ff6384']
        }]
    };

    const loginData = {
        labels: stats.login_activity.map(item => item.day),
        datasets: [{
            label: 'Haftalik loginlar',
            data: stats.login_activity.map(item => item.count),
            backgroundColor: '#66a6ff'
        }]
    };

    return (
        <div className="dashboard-wrapper">
            <h2>Umumiy statistika</h2>

            <div className="stat-box">
                <div className="card stat">
                    <h3>📄 Jami hujjatlar</h3>
                    <p>{stats.total_applications}</p>
                </div>

                <div className="card chart">
                    <h3>Statuslar kesimi</h3>
                    {statusData.labels.length > 0 ? <Pie data={statusData}/> : <p>Maʼlumot yoʻq</p>}
                </div>

                <div className="card chart">
                    <h3>Foydalanuvchilar haftalik kirishi</h3>
                    <Bar data={loginData}/>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
