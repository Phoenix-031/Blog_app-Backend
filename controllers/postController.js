const User = require('../models/User');
const Post = require('../models/Post')
const CryptoJS = require('crypto-js')


//create a post

const createPost = async (req,res) =>{
    const newpost = new Post(req.body)
    try{
        const savedpost =await newpost.save();
        res.status(200).json({
            success:true,
            savedpost
        })

    }catch(err){
        res.status(500).json({
            success:true,
            msg:err
        })
    }
}


// //update a post
const updatePost = async (req,res) =>{
   try{
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username){
      try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,
            {$set:req.body},
            {new:true}
            )
            res.status(200).json({
                success:true,
                updatedPost
            })
    }catch(err){
        res.status(500).json({
            success:false,
            msg:err
        })
    }
}else{
    res.status(401).json({
        success:false,
        msg:"not authorised"
    })
}
   }catch(err){
    res.status(500).json({
        success:false,
        msg:err
    })
   }
}


// //delete post
const deletePost = async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
          try{
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json({
                    success:true,
                    msg:"post was deleted succesfully"
                })
        }catch(err){
            res.status(500).json({
                success:false,
                msg:err
            })
        }
    }else{
        res.status(401).json({
            success:false,
            msg:"not authorised"
        })
    }
       }catch(err){
        res.status(500).json({
            success:false,
            msg:err
        })
       }
}

// //get post
const getPost = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            success:true,
            post
        })

    }catch(err){
        res.status(500).json({
            success:false,
            msg:err
        })
    }
}

//get all posts

const getallPost = async(req,res) =>{
    const username = req.query.user;
    const cat = req.query.category
    try{
         let posts;
         if(username){
            posts = await Post.find({username:username})
         }
         else if(cat){
            posts = await Post.find({
                categories:{
                    $in:cat
                }
            })
         }else{
            posts = await Post.find();
            // console.log(posts)
         }
         res.status(200).json({
            success:true,
            posts
         })
    }catch(err){
        res.status(500).json({
            success:false,
            msg:err
        })
    }
}

module.exports ={createPost,updatePost,deletePost,getPost,getallPost} ;