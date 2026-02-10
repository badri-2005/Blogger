// backend/index.mjs

// importing modules
import express from 'express';
import connection from './DB/db.mjs';
import blog from './Schemas/blog.mjs';
import cors from 'cors';
import {signup} from './controllers/signup.mjs';
import {login} from './controllers/signup.mjs';
import session from "express-session";
import { getUserProfile } from './controllers/profilecontroller.mjs';





// initializing express app
const app = express();
app.use(express.json());


// They are used to store the session during the deployment of the app
app.set("trust proxy" , 1);

// CORS Configuration
app.use(cors({
  origin: ["http://localhost:5173","https://devnotex-frontend.onrender.com"],
  credentials: true
}));


app.use(session({
  name: "devnotex.sid",
  secret: "devcollab_session_secret",
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24
  }
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


app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await blog.find().lean();

    const userId = req.session.user?._id;

    const blogsWithLiked = blogs.map((b) => ({
      ...b,
      liked: userId ? b.likedBy.includes(userId) : false,
    }));

    return res.status(200).send(blogsWithLiked);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send('Error in Fetching Blogs');
  }
});


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
    console.log(req.session.user);
    
    return res.status(200).send(req.session.user);

})





// API for Like / Unlike a Blog
app.put("/api/blogs/:id/like", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send({ msg: "Login required" });
    }

    const blogId = req.params.id;
    const userId = req.session.user._id;

    const post = await blog.findById(blogId);
    if (!post) return res.status(404).send({ msg: "Blog not found" });

    const alreadyLiked = post.likedBy.includes(userId);

    if (alreadyLiked) {
      post.likes -= 1;
      post.likedBy.pull(userId);
    } else {
      post.likes += 1;
      post.likedBy.push(userId);
    }

    await post.save();

    return res.status(200).send({
      msg: alreadyLiked ? "Unliked" : "Liked",
      likes: post.likes,
      liked: !alreadyLiked,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "Like failed" });
  }
});

// API for Fetching User Profile
app.get("/api/profile", getUserProfile);

// API for User Signup
app.post('/api/signup',signup);


// API for User Login
app.post('/api/login',login);

// starting the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})