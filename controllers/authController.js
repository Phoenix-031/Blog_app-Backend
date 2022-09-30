const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


const loginUser = async (req,res)=>{
    // console.log(req.body)
    try{
        const usr = await User.findOne({username:req.body.username})

        if(usr === null){
            res.status(200).json({
                success:false,
                msg:"No such user exists"
            });
            return
        }
        
        const hash = CryptoJS.AES.decrypt(usr.password,process.env.SECRET_PHRASE);
        const passtr = hash.toString(CryptoJS.enc.Utf8);

          if(req.body.password !== passtr){
            res.status(401).json("Wrong credentials");
            return
          }


        //json web token created for user
        const accessToken = jwt.sign({
            id:usr._id,
            isAdmin:usr.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"3d"
        }
        );
            
          const {password,...others} = usr._doc;
            
          res.status(200).json({
            success:true,
            others,
            accessToken
          })

    }catch(err){
        res.status(500).json({
            success:false,
            msg:err});
    }
}

const registerUser= async (req,res) =>{
    try{
        const nuser = new User({
            username : req.body.username,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_PHRASE).toString(),
            email:req. body.email
        })

        const svuser = await nuser.save()
        res.status(200).json({
            success:true,
            svuser
        });

    }catch(err){
        res.status(500).json({
            success:false,
            msg:err
        });
    }
}

module.exports = {loginUser,registerUser};