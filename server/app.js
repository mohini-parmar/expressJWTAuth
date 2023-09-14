import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import {connectDB} from "./config/connectdb.js"
import userRoutes from "./routes/userRoutes.js"
import passport from "passport"
import expressSession from 'express-session'

const app = express()
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.urlencoded({extended:true}));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}));
app.use(passport.initialize())
app.use(passport.session())
//CORS policy
app.use(cors())

//database connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

//load routes
app.use("/api/user", userRoutes)

app.listen(port , ()=>{
    console.log(`server listening at http://localhost:${port}`);
    })