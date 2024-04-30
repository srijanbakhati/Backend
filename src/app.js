import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();

// CORS will allows servers to specify which origins are permitted to  acess the resources
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
//This will accept all the json formats like form etc with only limits of 15 kb.
app.use(express.json({limit: "16kb"}))
//This will accept the url of limit 15kb.
app.use(express.urlencoded({extended: true, limit: "16kb"}))
//This is used to accept any files which will be acessible as public.
app.use(express.static("public"))
//acess and set cookie from browser
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter);
export {app};