import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref:'Users'
  },
  description:{
    type:String,
    max:1000,
    required:true
  },
  picturePath: {
    type: String,
    default:""
  },
  likes: {
    type: Map,
    of: Boolean,
  },
});

export default mongoose.model("Posts", postSchema);
