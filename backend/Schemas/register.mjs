import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    }
},{ timestamps: true });

const register = mongoose.model('registerSchema',registerSchema)

export default register;