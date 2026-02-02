import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import register from '../Schemas/register.mjs';

const JWT_SECRET = "mysecretkey";

const signup = async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        const user = await register.findOne({email});
        if(user)
        {
            return res.status(400).send({msg:"User already exists"});
        }
        const hashedpassword = await bcrypt.hash(password , 10);

        const newuser = await register.create({
            username , email , password : hashedpassword
        });

        res.status(201).send({
                    msg: "User registered successfully",
                    user: {
                        id: newuser._id,
                        username: newuser.username,
                        email: newuser.email
                    }
    });
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({msg:"Server Error"});
        
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await register.findOne({email});
        if(!user)
        {
            return res.status(400).send({msg:"User does not Exist"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch)
        {
            return res.status(400).send({msg:"Invalid Credentials"});
        }

        req.session.user = {
            id : user._id,
            email : user.email,
            username : user.username
        }

        res.status(200).send({msg:"Logged In" , user : req.session.user});
    }
    catch(err)
    {
        console.log(err.message);
        res.status(500).send({msg:"Server Error"});
        
    }
}

export {signup , login}