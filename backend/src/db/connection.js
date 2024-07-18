// src/db/connection.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'db-n9jkl-kr.vpc-pub-cdb.ntruss.com',
    user: 'nodeerp',
    password: 'dnehd1008@',
    database: 'nodeERP'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('DB연결성공!!!');
});

export default connection;
