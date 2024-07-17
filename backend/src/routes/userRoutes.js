// src/routes/userRoutes.js
import express from 'express';
import connection from '../db/connection.js';

const router = express.Router();

// 사용자 목록 조회 API
router.get('/users', (req, res) => {
    const query = 'SELECT * FROM test';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

export default router;
