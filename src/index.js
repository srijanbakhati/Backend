import 'dotenv/config'
import connectDB from './db/index.js';
import {app} from "./app.js"

const port=process.env.PORT;

connectDB()
.then(()=>{
    // app.on("error",(error)=>{
    //     console.log("Error",error);
    //     throw error;
    // })
    app.listen(port||8000,()=>{
        console.log(`Server is listening to the port ${port}`);
    })
})
.catch((error)=>{
    console.log("MongoDb connection Failed!",error)
})


// import dotenv from "dotenv"
// import connectDB from "./db/index.js";
// import {app} from './app.js'
// dotenv.config({
//     path: './.env'
// })



// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
// })













































// import 'dotenv/config'
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
// import express from "express"

// const app=express();
// const port=process.env.PORT;

// ;(async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log("Err",error)
//             throw error
//         })
//         app.listen(port,()=>{
//             console.log(`App is listening to the port ${port}`)
//         })

//     }catch(error){
//         console.log("Connection Failed!",error);
//         throw error;
//     }
    
// })()
