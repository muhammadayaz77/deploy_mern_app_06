import mongoose from "mongoose";


let userSchema = mongoose.Schema({
  name : {
    type:String,
    required:true,
    trim : true
  },
  email : {
    type:String,
    unique:true,
    required:true,
    lowercase:true,
    trim:true
  },
  password : {
    type:String,
    require : true,
    trim:true
  },
  phone : {
    type : Number,
    require : true,
    unique : true,
    trim : true
  },
  emergency_phone : {
    type : Number,
    unique : true,
    trim : true
  },
  present_address : {
    type : String,
    unique : false,
    trim : true,
    require : false
  },
  permanent_address : {
    type : String,
    unique : false,
    trim : true,
    require : false
  },
  signature : {
    type : String,
    unique : false,
    trim : true,
    require : false
  },
  covid : {
    type : String,
    unique : false,
    trim : true,
    require : false

  },
  role : {
    type : String,
    require : true,
    enum : ['student','sup_admin','admin1','admin2','admin3','teacher'],
  }
})

const UserModel = mongoose.model('User',userSchema);

export default UserModel;