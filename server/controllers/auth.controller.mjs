import User from '../models/User.mjs'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 5 * 24 * 60 * 60 * 1000 // 5 days
};

// Register a new user (only for sup_admin to create admins)
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json(
      {
         message: 'User already exists',
         success : false
       }
    );
    if(!name || !email || !password || !role){
      res.status(400).json({
        message : "Required all fields",
        success : false
      })
    }

    // allow admin 
    if(role !== 'admin1' && role !== 'admin2')
    {
      return res.status(400).json({
        message : `You can't add '${role}' role.`,
        success : false
      })
    }

    // Check if role exists
    let findRole = await User.findOne({role});
    if(findRole)
    {
      return res.status(400).json({
        message : "Admin with current role is already exists",
        success : false
      })
    }
    

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      createdBy: req.user.id
    });

    await user.save();

    // Create JWT
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token, cookieOptions);
        res.json({ 
          message: 'Admin added successful',
          data : {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }});
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ 
      message: 'Invalid credentials',
      success : false
    });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Create JWT
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.cookie('token', token, cookieOptions);
        res.json({ 
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    );
  } catch (err) {
    res.status(500).json({message : 'Server error'});
  }
};

// Get current user
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Change Password

export const changePassword = async(req,res) => {
  try {
    let {oldPassword,newPassword} = req.body;
    let user = await User.findById(req.user.id);

    let isMatch = await bcrypt.compare(oldPassword,user.password)
    if(!isMatch)
      return res.status(400).json(
    {message : 'Old password is incorrect',
      success : false
    });

    let hashPassword = await bcrypt.hash(newPassword,10)

    user.password = hashPassword;
    user.save();
    res.status(200).json(
      {
        message : "Password changed successfully",
        success : true
      }
    )
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message : 'Server error',success : false});
  }
}

// Logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message : 'Server error',success : false});
  }
};