// src/server.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dnehd1008@',
    database: 'NodeERP'
});

// 연결 시도
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// 사용자 목록 조회 API
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM test';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log('Query results:', results);
        res.json(results); // 결과를 클라이언트에 응답
    });
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
