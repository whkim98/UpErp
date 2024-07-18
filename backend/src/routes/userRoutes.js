import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

// Body parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 사용자 목록 조회 API
router.post('/loginCheck', (req, res) => {
    const { email, employee_pw } = req.body; // Using req.body to get email and password

    const query = 'SELECT 1 FROM employees WHERE email = ? AND employee_pw = ?';

    connection.query(query, [email, employee_pw], (error, results) => {
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
