import express from 'express';
// import dotenv from 'dotenv';
import { createServer } from 'http';
// dotenv.config();

import './database/Connection';
import createRoutes from './router/Index';

const app = express();
const http = createServer(app);

createRoutes(app);
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3003;
http.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT} , ${process.env.PORT}`);
});