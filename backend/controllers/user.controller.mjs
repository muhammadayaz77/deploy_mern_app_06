import UserModel from "../models/userModel.mjs";
import jwt from 'jsonwebtoken'


export const login = async(req,res) => {
  try {
    let {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        message : "Email or password is missing",
        success : false
      })
    }

    const existingUser = await UserModel.findOne({email});
    
    if(!existingUser){
      return res.status(400).json({
        message : "User not exist!",
        success : false
      });
    }

    if(password !== existingUser.password){
      return res.status(400).json({
        message : "Password not matched",
        success : false
      })
    }
    let token = jwt.sign({userId : existingUser._id},process.env.SECRET,{expiresIn : '1h'})


    return res.status(200).cookie("token",token, {
      maxAge: 1* 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure : false
    }).json({
      message : "You are logged in",
      success : true
    })

  } catch (error) {
    return res.json({
      message : error.message,
      success : false
    })
  }
}

export const updateProfile = async(req,res) => {
  try {
    if (req.file) {
      const file = req.file;
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
  } catch (error) {
    return res.status(400).json({
      message : error.message,
      success: false
    })
  }
}