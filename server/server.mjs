
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
import superadmin from './routes/superadmin.route.mjs'


import User from './models/User.mjs';
dotenv.config()

const app = express();
// Enhanced MongoDB connection

connectDB()

// Middleware

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // This is crucial for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
// Routes
// Add after middleware section
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/superadmin', superadmin);
app.use('/api/teacher',teacher);
app.use('/api/marks', marks);
app.use('/ping',async(req,res) => {
  await User.deleteMany({role:'admin1'}).then(r => res.send(r))
  // res.send('pong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));