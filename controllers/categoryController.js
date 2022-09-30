const Category = require('../models/Category')

const cat = async (req,res) =>{
    const newcat = new Category(req.body);
    try{
        const svcat = await newcat.save()
        res.status(200).json({
            success:true,
            svcat
        })
    }catch(err){
        res.status(500).json({
            success:true,
            msg:err
        })
    }

}

const getallCat = async (req,res) =>{
    try{
        const cat =await Category.find();
        res.status(200).json({
            success:true,
            cat
        })
    }catch(err){
        res.status(500).json({
            success:true,
            msg:err
        })
    }

}

module.exports = {cat,getallCat};