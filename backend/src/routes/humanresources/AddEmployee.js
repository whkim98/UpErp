import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

// Body parser 미들웨어
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

app.post('/addEmployee', (req, res) => {
    const employee = req.body;
    const sql = 'INSERT INTO employees SET ?';
    db.query(sql, employee, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Employee added successfully');
        }
    });
});

export default router;