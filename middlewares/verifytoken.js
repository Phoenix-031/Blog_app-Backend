const jwt = require('jwt');

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,user) =>{
            if(err) return res.status(403).json("Token not valid");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json({
            success:false,
            msg:"not authenticated! Please login"
        })
    }
}

const verifytokenandauthorisation = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.body.userId === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Not Authorised")
        }
    })
}

module.exports = {verifyToken,verifytokenandauthorisation};