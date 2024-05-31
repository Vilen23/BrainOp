import db from "../utils/db";
import { Request, Response } from "express";

export const fetchPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const posts = await db.post.findMany({
      skip,
      take: limit,
    });
    const totalPosts = await db.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    return res.status(200).json({ page, limit, totalPages, totalPosts, posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, picture, content } = req.body;
    const  user  = req.user;
    if(title === "" && picture === "" && content === "") return res.status(400).json({error: "Invalid Inputs"});
    const post = await db.post.create({
      data: {
        title,
        picture,
        content,
        authorId: user.userid,
      },
    });
    if(!post) return res.status(400).json({error: "Post not created"});
    return res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
