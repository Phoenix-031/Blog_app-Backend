const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const res = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology : true
        })
        console.log(`mongodb connected to:${res.connection.host}`)
    }catch(err){
        console.log(err)
    }

}

module.exports = connectDB