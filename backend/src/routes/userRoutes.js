// userRoutes.js
import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

// Body parser 미들웨어
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 사용자 로그인 체크 API
router.post('/loginCheck', (req, res) => {
    const { email, employee_pw } = req.body;

    const query = 'SELECT email, last_name FROM employees WHERE email = ? AND employee_pw = ?';

    connection.query(query, [email, employee_pw], (error, results) => {
        if (error) {
            console.error('쿼리 에러:', error);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length > 0) {
            const employee = results[0];
            req.session.user = { id: employee.id, lastName: employee.last_name };
            res.json({ success: true, employee });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

// 현재 사용자 정보 조회 API
router.get('/currentUser', (req, res) => {
    if (req.session.user) {
        res.json({ success: true, user: req.session.user });
    } else {
        res.json({ success: false });
    }
});

// 로그아웃 API
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ success: true });
    });
});

export default router;
