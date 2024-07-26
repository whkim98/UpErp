import express from 'express';
import connection from '../../db/connection';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/clientList', (req, res) => {
   const sql = 'SELECT * FROM suppliers';

   connection.query(sql, (err, result) => {
       if(err){
           console.log('쿼리에러: ', err);
           return;
       }
       res.json(result);
       console.log('거래처 리스트: ', result);
   });
});

export default router;