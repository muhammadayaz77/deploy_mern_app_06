
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.mjs';

// // routes
import auth from './routes/auth.route.mjs'
import teacher from './routes/teacher.mjs'
import marks from './routes/marks.mjs'
import admin from './routes/admin.route.mjs'

dotenv.config()

const app = express();
// Enhanced MongoDB connection

connectDB()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Routes
// Add after middleware section
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/teacher',teacher);
app.use('/api/marks', marks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));