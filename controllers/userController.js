const User = require('../models/User');
const Post = require('../models/Post')
const CryptoJS = require('crypto-js')


//update a user
const updateUser = async (req,res) =>{
    if(req.body.userId === req.params.id){
        if(req.body.password) req.body.password =CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_PHRASE).toString()
        
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true})

            // console.log(updatedUser)
            const {password,...others} = updatedUser._doc
            res.status(200).json({
                success:true,
                others
            })
            }catch(err){
                req.status(500).json({
                    success:false,
                    msg:err
                })
            }
        }
    else{
        res.status(401).json({
            success:false,
            msg:"not authorised"
        })
    }
}


//delete user
const deleteUser = async (req,res) =>{
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            try{
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({
                    success:true,
                    msg:"Use has been deleted"
                })
                }catch(err){
                    req.status(500).json({
                        success:false,
                        msg:err
                    })
                }
        }catch(err){
            res.status(404).json("User not found")
        }
        }else{
            res.status(401).json("not authorised");
        }
}

//get user
const getUser = async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        const {password , ...others} = user._doc
        res.status(200).json({
            success:true,
            others
        })

    }catch(err){
        res.status(500).json({
            success:false,
            msg:err
        })
    }
}

module.exports ={ updateUser, deleteUser,getUser};