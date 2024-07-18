// src/routes/userRoutes.js
import express from 'express';
import connection from '../db/connection.js';

const router = express.Router();

// 사용자 목록 조회 API
router.get('/loginCheck', (req, res) => {
    const { email, password } = req.query; // Assuming email and password are passed as query parameters

    const query = 'SELECT 1 FROM employees WHERE email = ? AND employee_pw = ?';

    connection.query(query, [email, password], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

export default router;
