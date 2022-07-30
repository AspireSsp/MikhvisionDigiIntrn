const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
try {

    const {token}  = req.cookies;
    // console.log("token: " + token);
    
  
    if (!token) {
        return res.status(401).json({
            message: "please login first"
        });
    }
    const decoded = jwt.verify(token ,process.env.JWT_SECRET);
    
    req.user = await User.findById(decoded._id);

    next();
}
 catch (error) {
    res.status(500).json({
        message:error.message,
    });
}
}