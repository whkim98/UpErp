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

router.get('/clientItemList', (req, res) => {
    const {supplier_id} = req.body;
    let queryParams;
    const sql = 'SELECT * FROM suppliers s LEFT JOIN purchase_orders po ON s.supplier_id = po. supplier_id LEFT JOIN purchase_order_items poi ON po.order_id = poi.order_id WHERE s.supplier_id = ?';
    queryParams = [supplier_id];
    connection.query(sql, queryParams, (err, result) => {
        res.json(result);
    });
});

export default router;