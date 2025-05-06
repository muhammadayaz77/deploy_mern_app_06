import userModel from '../models/userModel.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerficationCode } from '../config/Email.mjs';
import EmailVerificationModel from '../models/EmailVerification.mjs';

import RefreshToken from '../models/RefreshTokenModel.mjs';



// Verify Email

export const verifyEmail = async(req,res) => {
  try {
    const {email,otp} = req.body;
    if(!email || !otp)
    {
      return res.status(400).json({
        message : 'Required all fields',
        success : false
      })
    }
    const existingUser = await userModel.findOne({email})

    if(existingUser.is_verified)
    {
      return res.status(400).json({
        message : 'User is already verified',
        success : false
      })
    }

    const emailVerification = await EmailVerificationModel.findOne({userId : existingUser._id,otp})

    if(!emailVerification){
      if(!existingUser.is_verified){
        await sendVerficationCode(req,existingUser)

        return res.status(400).json({
          message : 'Invalid OTP, new OTP sent to your email.',
          success : false
        })
      }
      return res.status(400).json({
        message : 'Invalid OTP ',
        success : false
      })
    }


    const currentTime = new Date();

    const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000)

    if(currentTime > expirationTime){
      await sendVerficationCode(req,existingUser)
      return res.status(400).json({
        message : 'Invalid OTP, new OTP sent to your email.',
        success : false
      })
    } 
    
    existingUser.is_verified = true;
    await existingUser.save();  

    // deleting email verification documents
    await EmailVerificationModel.deleteMany({userId : existingUser._id})
    return res.status(200).json({
      message : 'Email Verified Successfully!',
      success : true
    })
  } catch (error) {
    res.status(500).json({
      message : error.message,
      success : false
    })
  }
}



export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Require all fields",
        success: false
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false
      });
    }

    if (!user.is_verified) {
      return res.status(400).json({
        message: 'Your account is not verified',
        success: false
      });
    }

    let is_match = await bcrypt.compare(password, user.password);

    if (!is_match) {
      return res.status(400).json({
        message: 'Invalid Credentials!!!',
        success: false
      });
    }

    // Define Expiry Times
const ACCESS_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 1 day in milliseconds
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Generate Tokens
const accessToken = jwt.sign(
  { id: user._id, email: user.email },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: '1d' }
);

const refreshToken = jwt.sign(
  { id: user._id, email: user.email },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: '7d' }
);

// Set Cookies
res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: ACCESS_TOKEN_EXPIRY
});

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: REFRESH_TOKEN_EXPIRY
});

// Store Refresh Token in Database
await RefreshToken.create({
  token: refreshToken,
  userId: user._id,
  expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY) // 7 days expiry
});


    // Send Success Response with Tokens
    return res.status(200).json({
      message: 'Login successful',
      success: true,
      accessToken,
      refreshToken
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};



export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(403).json({ message: 'Refresh token required' });

  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const newAccessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    res.json({ accessToken: newAccessToken });
  });
};



export const logout = async (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  
  await RefreshToken.deleteOne({ token: req.cookies.refreshToken });

  return res.status(200).json({ message: 'Logged out successfully' });
};


export const updateProfile = async(req,res) => {
  try {
    let userId = req.userId;
    let user = await userModel.findByIdAndUpdate(userId,req.body,{new:true});
    return res.status(200).json({
      user,
      message : 'Profile Updated successfully!!!',
      success : true
    })
  } catch (error) {
    return res.status(404).json({
      message : error.message,
      success : false
    })
  }
}