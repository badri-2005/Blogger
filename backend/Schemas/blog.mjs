import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true
  },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
