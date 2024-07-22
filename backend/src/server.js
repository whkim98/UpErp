import express from 'express';
import cors from 'cors';
import session from 'express-session'; // express-session 추가
import userRoutes from './routes/userRoutes.js';
import d3TestRoutes from './routes/d3Test.js';

const app = express();
const PORT = 3000;

// 세션 미들웨어 설정
app.use(session({
    secret: 'your-secret-key', // 비밀 키 설정
    resave: false, // 세션을 항상 저장하지 않도록 설정
    saveUninitialized: false, // 초기화되지 않은 세션을 저장하지 않도록 설정
    cookie: {
        secure: false, // HTTPS를 사용하지 않는 경우 false
        maxAge: 24 * 60 * 60 * 1000 // 쿠키 만료 시간 (24시간)
    }
}));

app.use(cors());
app.use(express.json());

// 라우터 사용
app.use('/api', userRoutes);
app.use('/api', d3TestRoutes);

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버 시작 성공! :: http://localhost:${PORT}`);
});
