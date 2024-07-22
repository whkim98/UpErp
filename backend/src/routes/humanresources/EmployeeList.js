import express from 'express';
import connection from '../../db/connection';
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

        // 캐시 제어 헤더 추가
        res.setHeader('Cache-Control', 'no-store');

        // 쿼리 결과를 JSON 형식으로 응답
        res.json(results);
        console.log('Query Results:', results);
    });
});

router.get('/orderby/employees', (req, res) => {
    const { order } = req.query;

    let query = 'SELECT * FROM employees';
    if (order) {
        query += ` ORDER BY ${connection.escapeId(order)}`; // 사용자 입력을 안전하게 처리하기 위해 escapeId 사용
    }

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Database query failed' });
            return;
        }

        res.setHeader('Cache-Control', 'no-store');
        res.json(results);
        console.log('Query Results:', results);
    });
});

export default router;
