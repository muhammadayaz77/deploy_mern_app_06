import mongoose from "mongoose";


let userSchema = mongoose.Schema({
  name : {
    type:String,
    require:true,
    trim : true
  },
  email : {
    type:String,
    unique:true,
    require:true,
    lowercase:true,
    trim:true
  },
  password : {
    type:String,
    require:true,
    trim:true
  },
  is_verified : {
    type:Boolean,
    default:false
  },
  roles : {
    type : String,
    enum : ['user','admin'],
    default : "user"
  }
})

const UserModel = mongoose.model('User',userSchema)

export default UserModel;