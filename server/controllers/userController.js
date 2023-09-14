import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController{
    static userRegistration = async (req, res) => {
        const {name , email , password , password_confirmation , tc} = req.body;
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"failed", "message":"Email already exists"});
        }else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation){
                    try{
                        const salt = await bcrypt.genSalt(16)
                        const hashPassword = await bcrypt.hash(password , salt)
                        const doc = new UserModel({
                            name : name,
                            email : email,
                            password : hashPassword,
                            salt : salt,
                            tc : tc,
                        })
                        await doc.save()
                        const saved_user = await UserModel.findOne({email : email});
                        //generate jwt token
                        const jwtToken = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY , { expiresIn : '5d'});
                        res.status(200).send({"status":"success", "message":"Registered Successfully!!" , "token" : jwtToken})
                    }catch(error){
                        res.status(400).send({"status":"failed", "message":"Unable to register"})
                    }
                }else{
                    res.status(400).send({"status":"failed", "message":"Password & Confirm password doesn't match"});
                }
            }else{
                res.status(400).send({"status":"failed", "message":"All fields are required"});
            }
        }
    }

    static userLogin = async(req,res) =>{
        try{
            const {email, password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email:email})
                // !user
                if(user != null){
                    console.log("Here in login")
                    const isMatch = await bcrypt.compareSync(password, user.password)
                    if(user.email === email && isMatch){
                        // Generate JWT token
                        console.log("Here in login success")
                        const jwtToken = jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY , { expiresIn : '5d'});
                        res.status(200).send({"status":"success", "message":"login successful", "token" : jwtToken})
                    }else{
                        res.status(400).send({"status":"failed", "message":"email or password does not match"});     
                    }
                }else{
                    res.status(400).send({"status":"failed", "message":"You are not registered user"});
                }  
            }else{
                res.status(400).send({"status":"failed", "message":"All fields are required"});
            }
        }catch(error){
            console.log(error);
        }
    } 
}

export default UserController;