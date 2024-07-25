import express from 'express';
import connection from '../../db/connection.js';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/attendanceInsert', (req, res) => {
    if(req.session && req.session.user){
        req.json(req.session.user);
        console.log(req.session.user);
    }
});

export default router;