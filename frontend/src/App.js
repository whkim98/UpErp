// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/users');
                setUsers(response.data);
            } catch (err) {
                setError('데이터를 가져오는 데 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
              {users.map(user => (
                  <li key={user.id}>
                      이름: {user.name}, 번호: {user.num} zz
                  </li>
              ))}
            </ul>

        </div>
    );
};

export default App;
