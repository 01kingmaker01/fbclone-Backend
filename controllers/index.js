import mongoose from "mongoose";
import { postArray, postObj } from "../middleware/getUser";
import postMsg from "../model";

export const getPosts = async (req, res) => {
  try {
    const posts = await postMsg.find({});

    const userPost = await postArray(posts);

    return res.status(200).json(userPost);
  } catch (e) {
    console.log(e);
  }
};

export const createPost = async (req, res) => {
  try {
    const post = { ...req.body, author: res.locals.currentUser };

    const newPost = await new postMsg(post).save();

    const userPost = await postObj(newPost);

    return res.status(201).json(userPost);
  } catch (e) {
    console.error(e.message);
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id: _id } = req.params,
      post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send(`Not Found`);
    }
    const updatedPostOBJ = { ...post, _id };

    const updatedPost = await postMsg.findByIdAndUpdate(_id, updatedPostOBJ, {
      new: true,
    });

    return res.json({
      ...updatedPost._doc,
      displayName: post.displayName,
      photoURL: post.photoURL,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id, Q: mongoose.Types.ObjectId.isValid(id) });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`${req}`);

    await postMsg.findByIdAndDelete(id);

    return res.json({ message: "Post Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};
