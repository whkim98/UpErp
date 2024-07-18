// src/server.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import d3TestRoutes from './routes/d3Test.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 라우터 사용
app.use('/api', userRoutes);
app.use('/api', d3TestRoutes);

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
