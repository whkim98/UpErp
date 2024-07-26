import express from 'express';
import connection from '../../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/attendanceInsert', (req, res) => {
    if(req.session && req.session.user){

        let queryParams;
        const sql = 'INSERT INTO attendance(employee_id, date, status) values(?, now(), ?)';
        queryParams = [req.session.user.id, 'present'];

        connection.query(sql, queryParams, (err, result) => {
           if(err){
               console.log('에러', err);
               return res.status(500).json({err: '에러'});
           }
           res.json(result);
           console.log('성공');
        });
    }
});


export default router;