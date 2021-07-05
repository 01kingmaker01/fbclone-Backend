import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  image: String,
  message: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
  },
});

export default mongoose.model("postMsg", postSchema);
