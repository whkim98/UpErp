// server.js
import express from 'express';
import session from 'express-session';
import userRoutes from './routes/userRoutes.js';
import d3TestRoutes from './routes/d3Test.js';
import EmployeeList from './routes/humanresources/EmployeeList.js';
import AddEmployee from './routes/humanresources/AddEmployee.js';
import Attendance from './routes/humanresources/Attendance.js';
import ClientList from './routes/client/ClientList.js';
import cors from 'cors';
import mysql from 'mysql2';

const app = express();
const PORT = 3000;

//redis세션과 express-mysql-session
//jwt 토큰 방식
//vpc와 subnet 설명해 주세요
//정규화와 반정규화 했다고 했는데 의미가 없지 않나요


app.use(cors());
app.use(express.json());

const MySQLStore = require('express-mysql-session')(session);

// MySQL 연결 설정
const mysqlOptions = {
    host: 'db-n9jkl-kr.vpc-pub-cdb.ntruss.com',
    port: 3306,
    user: 'nodeerp',
    password: 'dnehd1008@',
    database: 'nodeERP',
    connectionLimit: 10,
};

const connection = mysql.createPool(mysqlOptions);

const sessionStore = new MySQLStore(
    {
        expiration: 30 * 60 * 1000,
        createDatabaseTable: true,
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data',
            },
        },
    },
    connection
);

app.locals.sessionStore = sessionStore; // 세션 스토어를 app.locals에 저장

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
        },
    })
);

app.use('/api', userRoutes);
app.use('/api', d3TestRoutes);
app.use('/api', EmployeeList);
app.use('/api', AddEmployee);
app.use('/api', Attendance);
app.use('/api', ClientList);

app.listen(PORT, () => {
    console.log('서버 시작 성공!');
});
