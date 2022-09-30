const express = require('express');
const cors  = require('cors');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')

//importing the routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const catRoutes = require('./routes/categories')
const multer = require('multer');


dotenv.config({path:'./config/config.env'});

connectDB();

const app = express();


//middlewares
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors())
app.use(express.json())


//multer 
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images");
    },
    filename:(req,file,cb) =>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res) =>{
    res.status(200).json({
        success:true,
        msg:"file has been updated"
    })
})


//routes
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/category',catRoutes);



//sever static assets

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))

//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
    
// }

app.get('/',(req,res)=>{res.json("server is up and running")})


PORT = process.env.PORT || 8600;

app.listen(PORT ,()=>{console.log(`server is running on port http://localhost/${PORT}`)});