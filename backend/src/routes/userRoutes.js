import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'; // bcrypt 라이브러리 임포트

const router = express.Router();

// Body parser 미들웨어
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 사용자 로그인 체크 API
router.post('/loginCheck', (req, res) => {
    const { email, employee_pw } = req.body;

    // 이메일로 사용자 조회
    const query = 'SELECT email, last_name, employee_pw FROM employees WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
        if (error) {
            console.error('쿼리 에러:', error);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length > 0) {
            const user = results[0];

            // 입력된 비밀번호와 저장된 해시 비밀번호 비교
            const match = await bcrypt.compare(employee_pw, user.employee_pw);
            if (match) {
                req.session.user = { id: user.id, lastName: user.last_name };
                res.json({ success: true, user: req.session.user });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
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
