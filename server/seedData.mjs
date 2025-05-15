import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import User from './models/User.mjs'
import dotenv from 'dotenv'
import Class from './models/Class.mjs'

dotenv.config()

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
      name: 'Dr. Rajesh Kumar',
      email: 'supadmin@icp.edu',
      password: adminPassword,
      role: 'sup_admin'
    });
    await supAdmin.save();

    // Create admin1 and admin2
    const admin1 = new User({
      name: 'Prof. Anil Sharma',
      email: 'admin1@icp.edu',
      password: adminPassword,
      role: 'admin1',
      createdBy: supAdmin._id
    });

    const admin2 = new User({
      name: 'Dr. Priya Singh',
      email: 'admin2@icp.edu',
      password: adminPassword,
      role: 'admin2',
      createdBy: supAdmin._id
    });

    await Promise.all([admin1.save(), admin2.save()]);

    // Create 10 teachers with realistic Indian names
    const teachers = [
      { name: 'Prof. Sunil Verma', email: 'sunil.verma@icp.edu', code: 'T101' },
      { name: 'Dr. Meena Patel', email: 'meena.patel@icp.edu', code: 'T102' },
      { name: 'Prof. Arun Gupta', email: 'arun.gupta@icp.edu', code: 'T103' },
      { name: 'Dr. Neha Joshi', email: 'neha.joshi@icp.edu', code: 'T104' },
      { name: 'Prof. Ramesh Iyer', email: 'ramesh.iyer@icp.edu', code: 'T105' },
      { name: 'Dr. Kavita Reddy', email: 'kavita.reddy@icp.edu', code: 'T106' },
      { name: 'Prof. Sanjay Malhotra', email: 'sanjay.malhotra@icp.edu', code: 'T107' },
      { name: 'Dr. Anjali Choudhary', email: 'anjali.choudhary@icp.edu', code: 'T108' },
      { name: 'Prof. Vikram Desai', email: 'vikram.desai@icp.edu', code: 'T109' },
      { name: 'Dr. Pooja Mehta', email: 'pooja.mehta@icp.edu', code: 'T110' }
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

    // Create 3 classes
    const classes = [
      { name: 'Class IX-A', gradeLevel: '9', section: 'A', academicYear: '2023-2024' },
      { name: 'Class X-B', gradeLevel: '10', section: 'B', academicYear: '2023-2024' },
      { name: 'Class XI-C', gradeLevel: '11', section: 'C', academicYear: '2023-2024' }
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

    // Create 100 students with realistic Indian names
    const firstNames = ['Aarav', 'Vihaan', 'Aditya', 'Arjun', 'Reyansh', 'Sai', 'Advait', 'Dhruv', 'Kabir', 'Ananya', 'Diya', 'Ishaan', 'Myra', 'Prisha', 'Avni', 'Krisha', 'Pari', 'Kiara', 'Aarohi'];
    const lastNames = ['Sharma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Reddy', 'Iyer', 'Choudhary', 'Malhotra', 'Mehta', 'Joshi', 'Verma', 'Desai', 'Nair', 'Menon', 'Pillai'];

    // Class 1 students (30)
    for (let i = 1; i <= 30; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      const student = new User({
        name: `${firstName} ${lastName}`,
        email: `student.9a.${i}@icp.edu`,
        password: studentPassword,
        role: 'student',
        gradeLevel: '9',
        section: 'A',
        courses: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'],
        class: allClasses[0]._id,
        createdBy: admin1._id
      });
      await student.save();
    }

    // Class 2 students (35)
    for (let i = 1; i <= 35; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      const student = new User({
        name: `${firstName} ${lastName}`,
        email: `student.10b.${i}@icp.edu`,
        password: studentPassword,
        role: 'student',
        gradeLevel: '10',
        section: 'B',
        courses: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'],
        class: allClasses[1]._id,
        createdBy: admin1._id
      });
      await student.save();
    }

    // Class 3 students (35)
    for (let i = 1; i <= 35; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      const student = new User({
        name: `${firstName} ${lastName}`,
        email: `student.11c.${i}@icp.edu`,
        password: studentPassword,
        role: 'student',
        gradeLevel: '11',
        section: 'C',
        courses: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
        class: allClasses[2]._id,
        createdBy: admin1._id
      });
      await student.save();
    }

    // Update classes with students
    const allStudents = await User.find({ role: 'student' });
    const class1Students = allStudents.filter(s => s.gradeLevel === '9');
    const class2Students = allStudents.filter(s => s.gradeLevel === '10');
    const class3Students = allStudents.filter(s => s.gradeLevel === '11');

    await Class.findByIdAndUpdate(allClasses[0]._id, { 
      students: class1Students.map(s => s._id) 
    });
    await Class.findByIdAndUpdate(allClasses[1]._id, { 
      students: class2Students.map(s => s._id) 
    });
    await Class.findByIdAndUpdate(allClasses[2]._id, { 
      students: class3Students.map(s => s._id) 
    });

    console.log('Database seeded successfully with realistic data');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedData();