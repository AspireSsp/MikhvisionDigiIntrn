const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxlength:[30,"Name cannot exceed 30 characters"],   
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail, "Please Enter a valid Email"]
    },
    phone:{
        type:String,
        required:[true,"Please Enter Your phone no."],  
    },    

    password:{
        type:String,
        required:[true, "Please Enter your password"],
        minlength:[8,"passowrd should be greater then 8 characters"],
        select:false,
    },
    tokens: [
        {
            token: {
                type: String,
                required:true
            }
        }
    ]
   
});

// for  bcrypt password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});
  
//    jwt token 
userSchema.methods.generateToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}


///      compare password
userSchema.methods.comparePassword = async function(enterdPassword){

    return await bcrypt.compare(enterdPassword, this.password);
}





module.exports= mongoose.model("user", userSchema);