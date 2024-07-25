import express from 'express';
import connection from '../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/sales', (req, res) => {
    const salesData = [
        { week: "Week 1", sales: 10 },
        { week: "Week 2", sales: 15 },
        { week: "Week 3", sales: 20 },
        { week: "Week 4", sales: 25 },
        { week: "Week 5", sales: 30 }
    ];
    res.json(salesData);
    console.log(salesData);
});

export default router;