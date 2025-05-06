import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.mjs'
import dotenv from 'dotenv'
import connectDB from './config/db.mjs';
import cookieParser from 'cookie-parser';
let PORT = process.env.PORT || 3000
// cors policy error solved
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow frontend origin
  credentials: true, 
  optionSuccessStatus: 200
}

dotenv.config();
connectDB()

let app = express();

app.use(express.json())
app.use(cookieParser()) 
app.use(cors(corsOptions))


app.use('/api/user',userRoutes);
app.get('/ping',(req,res) => {
  res.json({
    message : 'pong'
  })
})

app.listen(PORT,() => {
  console.log('http://localhost:3000');
})