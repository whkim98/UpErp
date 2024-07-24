import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/loginCheck', async (req, res) => {
    const { email, employee_pw } = req.body;

    const query = 'SELECT employee_id, email, first_name, last_name, employee_pw FROM employees WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
        if (error) {
            console.error('쿼리 에러:', error);
            return res.status(500).json({ error: '쿼리에러' });
        }

        if (results.length > 0) {
            const user = results[0];

            const match = await bcrypt.compare(employee_pw, user.employee_pw);
            if (match) {
                req.session.user = {
                    id: user.employee_id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                };
                res.json({ success: true, user: req.session.user });
            } else {
                res.status(401).json({ error: '패스워드 해싱 에러' });
            }
        } else {
            res.status(401).json({ error: '존재하지 않는 사용자' });
        }
    });
});

router.get('/currentUser', (req, res) => {
    if (req.session.user) {
        res.json({ success: true, user: req.session.user });
    } else {
        res.json({ success: false });
    }
});

router.post('/logout', (req, res) => {
    const session_id = req.sessionID; // 세션 ID 가져오기
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: '로그아웃 실패' });
        }

        const sessionStore = req.app.locals.sessionStore; // app.locals에서 세션 스토어 가져오기
        sessionStore.destroy(session_id, (err) => {
            if (err) {
                console.error('세션 삭제 에러:', err);
                return res.status(500).json({ error: '세션 삭제 에러' });
            }
            res.json({ success: true });
        });
    });
});

export default router;
