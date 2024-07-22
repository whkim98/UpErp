import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/employees', (req, res) => {
    // 데이터베이스에서 직원 정보를 가져오는 쿼리
    const query = 'SELECT * FROM employees';

    // 쿼리 실행
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database query failed' });
            return;
        }

        // 쿼리 결과를 JSON 형식으로 응답
        res.json(results);
    });
});

export default router;