import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/d3', (req, res) => {
    const { department, option } = req.body;
    console.log('데이터: ', { department, option });

    let sql;
    let queryParams;

    if (option === 'salary') {
        sql = 'SELECT salary FROM employees WHERE department = ?';
        queryParams = [department];
    } else if (option === 'job_title') {
        sql = 'SELECT job_title, COUNT(*) AS count FROM employees WHERE department = ? GROUP BY job_title';
        queryParams = [department];
    } else {
        // option 값이 예상과 다를 경우
        return res.status(400).json({ error: '에러' });
    }

    // 쿼리 실행
    connection.query(sql, queryParams, (error, result) => {
        if (error) {
            console.log('에러: ', error);
            return res.status(500).json({ error: '에러' });
        }
        res.json(result);
        console.log('리스트: ', result);
    });
});


export default router;