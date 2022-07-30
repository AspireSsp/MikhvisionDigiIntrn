
const User = require("../models/userModel");




//     register a user 
exports.registerUser =  async(req,res,next)=>{

    try {
        const {name,email,phone,password} = req.body;

        const user = await User.create({
            name,email,phone,password
            
        });
        const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        return res.status(201).cookie("token", token, options).json({success: true, message : "User Added" , token})
    } catch (error) {
        return res.status(404).json({success: false, message : error.message})
    }
    
};

// LOgin the user 
exports.loginUser =  async(req,res,next)=>{ 
    try {
        const {email, password} = req.body;

    //  checking if user has given password and email
    if(!email || !password){
        return res.status(404).json({success : false, message: "please Enter email & password"})
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({success : false, message: "User not found"})
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return res.status(404).json({success : false, message: "Invailid email or password"})
    }
    const token = await user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
    res.status(201).cookie("token", token, options).json({success : true, message:"Login success",token});
    } catch (error) {
        res.status(404).json({success : false, message: error.message})
    }

};  

//     logged out the user
exports.logout = async(req,res,next)=>{
    try {
        res.cookie("token",null, {
            expires:new Date(Date.now()),
            httpOnly:true,
        })
        res.status(200).json({
             success:true,
             message: "Logged Out",
        });
        
    } catch (error) {
        res.status(404).json({success : false, message: error.message})
    }
};