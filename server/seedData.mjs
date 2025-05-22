import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.mjs';
import dotenv from 'dotenv';
import Class from './models/Class.mjs';

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Class.deleteMany({});

    // Password hashing
    const adminPassword = await bcrypt.hash('icp@Admin.123', 10);
    const teacherPassword = await bcrypt.hash('icp@Teacher.123', 10);
    const studentPassword = await bcrypt.hash('icp@Student.123', 10);

    // Create sup_admin
    const supAdmin = new User({
      name: 'Dr. Abdullah Khan',
      email: 'supadmin@icp.edu',
      password: adminPassword,
      role: 'sup_admin'
    });
    await supAdmin.save();

    // Create admin1 and admin2
    const admin1 = new User({
      name: 'Prof. Mohammed Ali',
      email: 'admin1@icp.edu',
      password: adminPassword,
      role: 'admin1',
      createdBy: supAdmin._id
    });

    const admin2 = new User({
      name: 'Dr. Fatima Ahmed',
      email: 'admin2@icp.edu',
      password: adminPassword,
      role: 'admin2',
      createdBy: supAdmin._id
    });

    await Promise.all([admin1.save(), admin2.save()]);

    // Create 10 teachers with Muslim names
    const teachers = [
      { name: 'Prof. Ibrahim Siddiqui', email: 'ibrahim.siddiqui@icp.edu', code: 'T101' },
      { name: 'Dr. Ayesha Rahman', email: 'ayesha.rahman@icp.edu', code: 'T102' },
      { name: 'Prof. Yusuf Malik', email: 'yusuf.malik@icp.edu', code: 'T103' },
      { name: 'Dr. Zainab Hussain', email: 'zainab.hussain@icp.edu', code: 'T104' },
      { name: 'Prof. Omar Farooq', email: 'omar.farooq@icp.edu', code: 'T105' },
      { name: 'Dr. Khadija Akhtar', email: 'khadija.akhtar@icp.edu', code: 'T106' },
      { name: 'Prof. Bilal Ansari', email: 'bilal.ansari@icp.edu', code: 'T107' },
      { name: 'Dr. Amina Sheikh', email: 'amina.sheikh@icp.edu', code: 'T108' },
      { name: 'Prof. Hamza Iqbal', email: 'hamza.iqbal@icp.edu', code: 'T109' },
      { name: 'Dr. Safiya Hassan', email: 'safiya.hassan@icp.edu', code: 'T110' }
    ];

    for (const teacher of teachers) {
      const newTeacher = new User({
        name: teacher.name,
        email: teacher.email,
        password: teacherPassword,
        role: 'teacher',
        teacherCode: teacher.code,
        createdBy: admin1._id
      });
      await newTeacher.save();
    }

    // Get all teachers
    const allTeachers = await User.find({ role: 'teacher' });

    // Create 3 classes for grades 8, 9, and 10
    const classes = [
      { name: 'Class VIII-A', gradeLevel: 8, section: 'A', academicYear: '2023-2024' },
      { name: 'Class IX-B', gradeLevel: 9, section: 'B', academicYear: '2023-2024' },
      { name: 'Class X-C', gradeLevel: 10, section: 'C', academicYear: '2023-2024' }
    ];

    for (let i = 0; i < 3; i++) {
      const cls = new Class({
        name: classes[i].name,
        gradeLevel: classes[i].gradeLevel,
        section: classes[i].section,
        academicYear: classes[i].academicYear,
        teacher: allTeachers[i]._id,
        createdBy: admin1._id
      });
      await cls.save();
    }

    // Get all classes
    const allClasses = await Class.find();

    // Create students with Muslim names for each grade level
    const firstNames = ['Mohammed', 'Ahmed', 'Ali', 'Omar', 'Yusuf', 'Ibrahim', 'Mustafa', 'Hamza', 'Bilal', 'Aisha', 'Fatima', 'Khadija', 'Maryam', 'Zainab', 'Amina', 'Safiya', 'Hafsa', 'Sumayya'];
    const lastNames = ['Khan', 'Ahmed', 'Malik', 'Rahman', 'Hussain', 'Farooq', 'Siddiqui', 'Iqbal', 'Sheikh', 'Ansari', 'Akhtar', 'Hassan', 'Qureshi', 'Saleem', 'Zafar'];

    // Grade 8 students (30)
    for (let i = 1; i <= 30; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      const student = new User({
        name: `${firstName} ${lastName}`,
        email: `student.8a.${i}@icp.edu`,
        password: studentPassword,
        role: 'student',
        gradeLevel: 8,
        section: 'A',
        courses: ['Mathematics', 'Science', 'English', 'Urdu', 'Social Studies'],
        class: allClasses[0]._id,
        createdBy: admin1._id
      });
      await student.save();
    }

    // Grade 9 students (35)
    for (let i = 1; i <= 35; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      const student = new User({
        name: `${firstName} ${lastName}`,
        email: `student.9b.${i}@icp.edu`,
        password: studentPassword,
        role: 'student',
        gradeLevel: 9,
        section: 'B',
        courses: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'],
        class: allClasses[1]._id,
        createdBy: admin1._id
      });
      await student.save();
    }

    // Grade 10 students (35)
    for (let i = 1; i <= 35; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      const student = new User({
        name: `${firstName} ${lastName}`,
        email: `student.10c.${i}@icp.edu`,
        password: studentPassword,
        role: 'student',
        gradeLevel: 10,
        section: 'C',
        courses: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
        class: allClasses[2]._id,
        createdBy: admin1._id
      });
      await student.save();
    }

    // Update classes with students
    const allStudents = await User.find({ role: 'student' });
    const grade8Students = allStudents.filter(s => s.gradeLevel === 8);
    const grade9Students = allStudents.filter(s => s.gradeLevel === 9);
    const grade10Students = allStudents.filter(s => s.gradeLevel === 10);

    await Class.findByIdAndUpdate(allClasses[0]._id, { 
      students: grade8Students.map(s => s._id) 
    });
    await Class.findByIdAndUpdate(allClasses[1]._id, { 
      students: grade9Students.map(s => s._id) 
    });
    await Class.findByIdAndUpdate(allClasses[2]._id, { 
      students: grade10Students.map(s => s._id) 
    });

    console.log('Database seeded successfully with grade levels 8, 9, and 10');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedData();