// backend/index.mjs

// importing modules
import express from 'express';
import connection from './DB/db.mjs';
import blog from './Schemas/blog.mjs';
import cors from 'cors';
import {signup} from './controllers/signup.mjs';
import {login} from './controllers/signup.mjs';
import session from "express-session";



// initializing express app
const app = express();
app.use(express.json());

// CORS Configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(session({
  secret: "devcollab_session_secret",
  resave: false,
  saveUninitialized: false
}));

// port number
const PORT = 3000;

// API
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to the Blogger App');
})

// API for Posting a new Blog
app.post('/api/add',async(req,res)=>{
    const body = req.body;
    console.log(body);

    const newBlog = new blog(body);

    try{
        const savedblog = await newBlog.save();
        return res.status(201).send(savedblog);
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(400).send('Error in Saving Blog');   
    }
})

// API for Fetching all Blogs
app.get('/api/blogs' , async(req,res)=>{
    try{
        const blogs = await blog.find();
        if(blogs.length > 0)
        {
            return res.status(200).send(blogs);
        }
        return res.status(200).send({msg:"No Blogs Found"});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(400).send('Error in Fetching Blogs');
    }
})

// API for Fetching a Single Blog by ID
app.get('/api/blogs/:id',async(req,res)=>{
    try{
        const blogId = req.params.id;
        const post = await blog.findById(blogId);
        if(post)
        {
            return res.status(200).send(post);
        }
        return res.status(200).send({msg:"Blog Not Found"});
    }
    catch(err)
    {
        console.log(err.message);
        return res.status(400).send('Error in Fetching Blog');
    }
})

// API for updating a Blog by ID
app.put('/api/blogs/:id',async(req,res)=>{
    try{
        const blogId = req.params.id;
        const updateuser = await blog.findByIdAndUpdate(blogId,req.body,{new:true});
        if(updateuser)
        {
            return res.status(200).send(updateuser);
        }
        return res.status(200).send({msg:"Blog Not Found"});
    }
    catch(err)
    {
        // console.log(err.message);
        return res.status(400).send('Error in Fetching Blog');
    }
})

// API for Deleting a Blog by ID

app.delete('/api/blogs/:id',async(req,res)=>{
    try{
        const blogId = req.params.id;
        console.log(blogId);
        
        const deletedBlog = await blog.findByIdAndDelete(blogId);
        if(!deletedBlog)
        {
            return res.status(200).send({msg:"Blog not Found"});

        }
            return res.status(200).send({msg:"Blog Deleted Successfully"});

    }
    catch(err)
    {
        console.log(err.message);
        return res.status(400).send('Error in Deleting Blog');
    }
})

// API for Login Details Fetching
app.get("/api/me",(req,res)=>{
    if(!req.session.user)
    {
        return res.status(401).send({msg:"Not Authenticated"});
    }

    return res.status(200).send(req.session.user);
})

// API for User Signup
app.post('/api/signup',signup);


// API for User Login
app.post('/api/login',login);

// starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})