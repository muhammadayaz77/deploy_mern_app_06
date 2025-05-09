import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes.mjs'
import dotenv from 'dotenv'
import connectDB from './config/db.mjs';
import cookieParser from 'cookie-parser';
import UserModel from './models/userModel.mjs';
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

const students = [
  {
    name: "Ahmed Khan",
    email: "bscs-221001",
    password: "icp@Student.123",
    phone: 923001234567,
    role: "student"
  },
  {
    name: "Fatima Ali",
    email: "bsse-221002",
    password: "icp@Student.123",
    phone: 923001234568,
    role: "student"
  },
  {
    name: "Muhammad Hassan",
    email: "bsai-221003",
    password: "icp@Student.123",
    phone: 923001234569,
    role: "student"
  },
  {
    name: "Ayesha Raza",
    email: "bscs-221004",
    password: "icp@Student.123",
    phone: 923001234570,
    role: "student"
  },
  {
    name: "Bilal Ahmed",
    email: "bsse-221005",
    password: "icp@Student.123",
    phone: 923001234571,
    role: "student"
  },
  {
    name: "Sara Malik",
    email: "bsai-221006",
    password: "icp@Student.123",
    phone: 923001234572,
    role: "student"
  },
  {
    name: "Usman Shah",
    email: "bscs-221007",
    password: "icp@Student.123",
    phone: 923001234573,
    role: "student"
  },
  {
    name: "Zainab Akhtar",
    email: "bsse-221008",
    password: "icp@Student.123",
    phone: 923001234574,
    role: "student"
  },
  {
    name: "Ali Raza",
    email: "bsai-221009",
    password: "icp@Student.123",
    phone: 923001234575,
    role: "student"
  },
  {
    name: "Hina Khan",
    email: "bscs-221010",
    password: "icp@Student.123",
    phone: 923001234576,
    role: "student"
  },
  // Continuing with unique email patterns...
  {
    name: "Omar Farooq",
    email: "bsse-221011",
    password: "icp@Student.123",
    phone: 923001234577,
    role: "student"
  },
  {
    name: "Aisha Mahmood",
    email: "bsai-221012",
    password: "icp@Student.123",
    phone: 923001234578,
    role: "student"
  },
  {
    name: "Kamran Ali",
    email: "bscs-221013",
    password: "icp@Student.123",
    phone: 923001234579,
    role: "student"
  },
  {
    name: "Nadia Hussain",
    email: "bsse-221014",
    password: "icp@Student.123",
    phone: 923001234580,
    role: "student"
  },
  {
    name: "Faisal Iqbal",
    email: "bsai-221015",
    password: "icp@Student.123",
    phone: 923001234581,
    role: "student"
  },
  {
    name: "Mehak Saleem",
    email: "bscs-221016",
    password: "icp@Student.123",
    phone: 923001234582,
    role: "student"
  },
  {
    name: "Tariq Mahmood",
    email: "bsse-221017",
    password: "icp@Student.123",
    phone: 923001234583,
    role: "student"
  },
  {
    name: "Sadia Khan",
    email: "bsai-221018",
    password: "icp@Student.123",
    phone: 923001234584,
    role: "student"
  },
  {
    name: "Imran Ashraf",
    email: "bscs-221019",
    password: "icp@Student.123",
    phone: 923001234585,
    role: "student"
  },
  {
    name: "Rabia Akram",
    email: "bsse-221020",
    password: "icp@Student.123",
    phone: 923001234586,
    role: "student"
  },
  {
    name: "Asad Ullah",
    email: "bsai-221021",
    password: "icp@Student.123",
    phone: 923001234587,
    role: "student"
  },
  {
    name: "Sana Mirza",
    email: "bscs-221022",
    password: "icp@Student.123",
    phone: 923001234588,
    role: "student"
  },
  {
    name: "Haris Malik",
    email: "bsse-221023",
    password: "icp@Student.123",
    phone: 923001234589,
    role: "student"
  },
  {
    name: "Zara Sheikh",
    email: "bsai-221024",
    password: "icp@Student.123",
    phone: 923001234590,
    role: "student"
  },
  {
    name: "Waqas Ahmed",
    email: "bscs-221025",
    password: "icp@Student.123",
    phone: 923001234591,
    role: "student"
  },
  {
    name: "Amina Khan",
    email: "bsse-221026",
    password: "icp@Student.123",
    phone: 923001234592,
    role: "student"
  },
  {
    name: "Saad Abdullah",
    email: "bsai-221027",
    password: "icp@Student.123",
    phone: 923001234593,
    role: "student"
  },
  {
    name: "Farah Naz",
    email: "bscs-221028",
    password: "icp@Student.123",
    phone: 923001234594,
    role: "student"
  },
  {
    name: "Nasir Khan",
    email: "bsse-221029",
    password: "icp@Student.123",
    phone: 923001234595,
    role: "student"
  },
  {
    name: "Saima Iqbal",
    email: "bsai-221030",
    password: "icp@Student.123",
    phone: 923001234596,
    role: "student"
  },
  {
    name: "Junaid Akbar",
    email: "bscs-221031",
    password: "icp@Student.123",
    phone: 923001234597,
    role: "student"
  },
  {
    name: "Hira Shah",
    email: "bsse-221032",
    password: "icp@Student.123",
    phone: 923001234598,
    role: "student"
  },
  {
    name: "Fahad Mustafa",
    email: "bsai-221033",
    password: "icp@Student.123",
    phone: 923001234599,
    role: "student"
  },
  {
    name: "Mariam Khan",
    email: "bscs-221034",
    password: "icp@Student.123",
    phone: 923001234600,
    role: "student"
  },
  {
    name: "Arslan Malik",
    email: "bsse-221035",
    password: "icp@Student.123",
    phone: 923001234601,
    role: "student"
  },
  {
    name: "Nida Ali",
    email: "bsai-221036",
    password: "icp@Student.123",
    phone: 923001234602,
    role: "student"
  },
  {
    name: "Shahid Afridi",
    email: "bscs-221037",
    password: "icp@Student.123",
    phone: 923001234603,
    role: "student"
  },
  {
    name: "Saba Qamar",
    email: "bsse-221038",
    password: "icp@Student.123",
    phone: 923001234604,
    role: "student"
  },
  {
    name: "Babar Azam",
    email: "bsai-221039",
    password: "icp@Student.123",
    phone: 923001234605,
    role: "student"
  },
  {
    name: "Ayesha Omar",
    email: "bscs-221040",
    password: "icp@Student.123",
    phone: 923001234606,
    role: "student"
  },
  {
    name: "Hamza Ali",
    email: "bsse-221041",
    password: "icp@Student.123",
    phone: 923001234607,
    role: "student"
  },
  {
    name: "Zoya Malik",
    email: "bsai-221042",
    password: "icp@Student.123",
    phone: 923001234608,
    role: "student"
  },
  {
    name: "Saifullah Khan",
    email: "bscs-221043",
    password: "icp@Student.123",
    phone: 923001234609,
    role: "student"
  },
  {
    name: "Aiman Khan",
    email: "bsse-221044",
    password: "icp@Student.123",
    phone: 923001234610,
    role: "student"
  },
  {
    name: "Rizwan Ahmed",
    email: "bsai-221045",
    password: "icp@Student.123",
    phone: 923001234611,
    role: "student"
  },
  {
    name: "Sana Safdar",
    email: "bscs-221046",
    password: "icp@Student.123",
    phone: 923001234612,
    role: "student"
  },
  {
    name: "Adnan Sami",
    email: "bsse-221047",
    password: "icp@Student.123",
    phone: 923001234613,
    role: "student"
  },
  {
    name: "Mehwish Hayat",
    email: "bsai-221048",
    password: "icp@Student.123",
    phone: 923001234614,
    role: "student"
  },
  {
    name: "Shahzad Roy",
    email: "bscs-221049",
    password: "icp@Student.123",
    phone: 923001234615,
    role: "student"
  },
  {
    name: "Anum Tanveer",
    email: "bsse-221050",
    password: "icp@Student.123",
    phone: 923001234616,
    role: "student"
  },
  {
    name: "Noman Ali",
    email: "bsai-221051",
    password: "icp@Student.123",
    phone: 923001234617,
    role: "student"
  },
  {
    name: "Kiran Khan",
    email: "bscs-221052",
    password: "icp@Student.123",
    phone: 923001234618,
    role: "student"
  },
  {
    name: "Waleed Akhtar",
    email: "bsse-221053",
    password: "icp@Student.123",
    phone: 923001234619,
    role: "student"
  },
  {
    name: "Sadia Ghaffar",
    email: "bsai-221054",
    password: "icp@Student.123",
    phone: 923001234620,
    role: "student"
  },
  {
    name: "Faisal Khan",
    email: "bscs-221055",
    password: "icp@Student.123",
    phone: 923001234621,
    role: "student"
  },
  {
    name: "Huma Qureshi",
    email: "bsse-221056",
    password: "icp@Student.123",
    phone: 923001234622,
    role: "student"
  },
  {
    name: "Salman Ahmed",
    email: "bsai-221057",
    password: "icp@Student.123",
    phone: 923001234623,
    role: "student"
  },
  {
    name: "Areeba Malik",
    email: "bscs-221058",
    password: "icp@Student.123",
    phone: 923001234624,
    role: "student"
  },
  {
    name: "Tahir Hussain",
    email: "bsse-221059",
    password: "icp@Student.123",
    phone: 923001234625,
    role: "student"
  },
  {
    name: "Nadia Khan",
    email: "bsai-221060",
    password: "icp@Student.123",
    phone: 923001234626,
    role: "student"
  },
  {
    name: "Asim Azhar",
    email: "bscs-221061",
    password: "icp@Student.123",
    phone: 923001234627,
    role: "student"
  },
  {
    name: "Sara Riaz",
    email: "bsse-221062",
    password: "icp@Student.123",
    phone: 923001234628,
    role: "student"
  },
  {
    name: "Zeeshan Khan",
    email: "bsai-221063",
    password: "icp@Student.123",
    phone: 923001234629,
    role: "student"
  },
  {
    name: "Ayesha Siddiqui",
    email: "bscs-221064",
    password: "icp@Student.123",
    phone: 923001234630,
    role: "student"
  },
  {
    name: "Ali Abbas",
    email: "bsse-221065",
    password: "icp@Student.123",
    phone: 923001234631,
    role: "student"
  },
  {
    name: "Mahnoor Shah",
    email: "bsai-221066",
    password: "icp@Student.123",
    phone: 923001234632,
    role: "student"
  },
  {
    name: "Shayan Ahmed",
    email: "bscs-221067",
    password: "icp@Student.123",
    phone: 923001234633,
    role: "student"
  },
  {
    name: "Zainab Khan",
    email: "bsse-221068",
    password: "icp@Student.123",
    phone: 923001234634,
    role: "student"
  },
  {
    name: "Saad Malik",
    email: "bsai-221069",
    password: "icp@Student.123",
    phone: 923001234635,
    role: "student"
  },
  {
    name: "Hina Aslam",
    email: "bscs-221070",
    password: "icp@Student.123",
    phone: 923001234636,
    role: "student"
  },
  {
    name: "Farhan Ali",
    email: "bsse-221071",
    password: "icp@Student.123",
    phone: 923001234637,
    role: "student"
  },
  {
    name: "Amina Sheikh",
    email: "bsai-221072",
    password: "icp@Student.123",
    phone: 923001234638,
    role: "student"
  },
  {
    name: "Usama Khan",
    email: "bscs-221073",
    password: "icp@Student.123",
    phone: 923001234639,
    role: "student"
  },
  {
    name: "Sadia Malik",
    email: "bsse-221074",
    password: "icp@Student.123",
    phone: 923001234640,
    role: "student"
  },
  {
    name: "Imran Khan",
    email: "bsai-221075",
    password: "icp@Student.123",
    phone: 923001234641,
    role: "student"
  },
  {
    name: "Saba Faisal",
    email: "bscs-221076",
    password: "icp@Student.123",
    phone: 923001234642,
    role: "student"
  },
  {
    name: "Ahsan Ali",
    email: "bsse-221077",
    password: "icp@Student.123",
    phone: 923001234643,
    role: "student"
  },
  {
    name: "Maryam Khan",
    email: "bsai-221078",
    password: "icp@Student.123",
    phone: 923001234644,
    role: "student"
  },
  {
    name: "Shahid Khan",
    email: "bscs-221079",
    password: "icp@Student.123",
    phone: 923001234645,
    role: "student"
  },
  {
    name: "Ayesha Akhtar",
    email: "bsse-221080",
    password: "icp@Student.123",
    phone: 923001234646,
    role: "student"
  },
  {
    name: "Hamza Malik",
    email: "bsai-221081",
    password: "icp@Student.123",
    phone: 923001234647,
    role: "student"
  },
  {
    name: "Sanaullah Khan",
    email: "bscs-221082",
    password: "icp@Student.123",
    phone: 923001234648,
    role: "student"
  },
  {
    name: "Aiman Malik",
    email: "bsse-221083",
    password: "icp@Student.123",
    phone: 923001234649,
    role: "student"
  },
  {
    name: "Raza Ahmed",
    email: "bsai-221084",
    password: "icp@Student.123",
    phone: 923001234650,
    role: "student"
  },
  {
    name: "Sadia Faisal",
    email: "bscs-221085",
    password: "icp@Student.123",
    phone: 923001234651,
    role: "student"
  },
  {
    name: "Adil Sami",
    email: "bsse-221086",
    password: "icp@Student.123",
    phone: 923001234652,
    role: "student"
  },
  {
    name: "Mehwish Malik",
    email: "bsai-221087",
    password: "icp@Student.123",
    phone: 923001234653,
    role: "student"
  },
  {
    name: "Shahzad Khan",
    email: "bscs-221088",
    password: "icp@Student.123",
    phone: 923001234654,
    role: "student"
  },
  {
    name: "Anum Khan",
    email: "bsse-221089",
    password: "icp@Student.123",
    phone: 923001234655,
    role: "student"
  },
  {
    name: "Noman Khan",
    email: "bsai-221090",
    password: "icp@Student.123",
    phone: 923001234656,
    role: "student"
  },
  {
    name: "Kiran Malik",
    email: "bscs-221091",
    password: "icp@Student.123",
    phone: 923001234657,
    role: "student"
  },
  {
    name: "Waleed Khan",
    email: "bsse-221092",
    password: "icp@Student.123",
    phone: 923001234658,
    role: "student"
  },
  {
    name: "Sadia Khan",
    email: "bsai-221093",
    password: "icp@Student.123",
    phone: 923001234659,
    role: "student"
  },
  {
    name: "Faisal Malik",
    email: "bscs-221094",
    password: "icp@Student.123",
    phone: 923001234660,
    role: "student"
  },
  {
    name: "Huma Khan",
    email: "bsse-221095",
    password: "icp@Student.123",
    phone: 923001234661,
    role: "student"
  },
  {
    name: "Salman Khan",
    email: "bsai-221096",
    password: "icp@Student.123",
    phone: 923001234662,
    role: "student"
  },
  {
    name: "Areeba Khan",
    email: "bscs-221097",
    password: "icp@Student.123",
    phone: 923001234663,
    role: "student"
  },
  {
    name: "Tahir Khan",
    email: "bsse-221098",
    password: "icp@Student.123",
    phone: 923001234664,
    role: "student"
  },
  {
    name: "Nadia Malik",
    email: "bsai-221099",
    password: "icp@Student.123",
    phone: 923001234665,
    role: "student"
  },
  {
    name: "Asim Khan",
    email: "bscs-221100",
    password: "icp@Student.123",
    phone: 923001234666,
    role: "student"
  }
];

app.use('/api/user',userRoutes);
app.get('/ping',async(req,res) => {
  try {
    // await UserModel.dropIndex("emergency_phone_1")

    await UserModel.insertMany(students)
    return res.send("success")
  } catch (error) {
    res.json({
      message : error.message,
      success : false
    })
  }
})

app.listen(PORT,() => {
  console.log('http://localhost:3000');
})