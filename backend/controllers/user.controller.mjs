import UserModel from "../models/userModel.mjs";



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

    return res.status(200).json({
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
