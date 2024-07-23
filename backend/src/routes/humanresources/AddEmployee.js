import express from 'express';
import connection from '../../db/connection.js';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'; // 추가: bcrypt 모듈

const router = express.Router();

// Body parser 미들웨어
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/addEmployee', async (req, res) => {
    const { first_name, last_name, department, email, phone, job_title, hire_date, employee_pw } = req.body;

    try {
        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(employee_pw, 10);
        const formattedHireDate = new Date(hire_date).toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환

        // 데이터베이스에 추가할 데이터
        const employee = {
            first_name: first_name,
            last_name: last_name,
            department: department,
            email: email,
            phone: phone,
            hire_date: formattedHireDate,
            job_title: job_title,
            employee_pw: hashedPassword // 해시화된 비밀번호
        };

        const sql = 'INSERT INTO employees SET ?';
        connection.query(sql, employee, (err, result) => {
            if (err) {
                console.error('에러:', err);
                res.status(500).send('에러');
            } else {
                res.status(200).send('insert 성공');
            }
        });
    } catch (err) {
        console.error('패스워드 해싱 에러:', err);
        res.status(500).send('패스워드 해싱');
    }
});

export default router;
