//server.js
// server.js
import express from 'express';
import session from 'express-session';
import userRoutes from './routes/userRoutes.js';
import d3TestRoutes from './routes/d3Test.js';
import EmployeeList from './routes/humanresources/EmployeeList.js';
import AddEmployee from './routes/humanresources/AddEmployee.js';
import cors from 'cors';

import mysql from 'mysql2';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const MySQLStore = require("express-mysql-session")(session);

// MySQL 연결 설정
const mysqlOptions = {
    host: 'db-n9jkl-kr.vpc-pub-cdb.ntruss.com',
    port: 3306, // 기본 MySQL 포트
    user: 'nodeerp',
    password: 'dnehd1008@',
    database: 'nodeERP',
    connectionLimit: 10 // 커넥션 풀 크기
};

// MySQL 연결 객체 생성
const connection = mysql.createPool(mysqlOptions);

// MySQLStore 세션 저장소 설정
const sessionStore = new MySQLStore({
    expiration: 24 * 60 * 60 * 1000, // 세션 만료 시간
    createDatabaseTable: true, // 테이블 생성 여부
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
}, connection);

// 세션 미들웨어 설정
app.use(
    session({
        secret: 'your-secret-key', // 세션을 발급할 때 사용되는 키입니다.
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            secure: false, // HTTPS를 사용하지 않는 경우 false
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 쿠키 만료 시간 (24시간)
        }
    })
);

app.use('/api', userRoutes);
app.use('/api', d3TestRoutes);
app.use('/api', EmployeeList);
app.use('/api', AddEmployee);

// 서버 시작
app.listen(PORT, () => {
    console.log('서버 시작 성공!');
});