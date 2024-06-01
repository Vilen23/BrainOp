import dotenv from "dotenv";
import { Request, Response } from "express";
import { signupValidation } from "../utils/validation";
import db from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export const signup = async (req: Request, res: Response) => {
  try {
    const verify = signupValidation.safeParse(req.body);
    if (!verify.success)
      return res.status(400).json({ error: verify.error.message });
    const { username, password, profilepicture, name } = req.body;
    const checkUsername = await db.user.findFirst({
      where: {
        username,
      },
    });
    if (checkUsername)
      return res.status(400).json({ error: "Username already taken" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        username,
        password: hashPassword,
        name,
        profilepicture,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      message: "User signed up successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const checkUser = await db.user.findFirst({
      where: {
        username,
      },
    });
    if (!checkUser) return res.status(400).json({ error: "User not found" });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.status(400).json({ error: "Password is Incorrect" });

    const token = jwt.sign({ userid: checkUser.id }, process.env.SECRET || "", {
      expiresIn: "1h",
    });
    res.cookie("authToken", token,{
      expires: new Date(Date.now() + 3600000),
    });
    const { password: _, ...userWithoutPassword } = checkUser;
    return res
      .status(200)
      .json({
        message: "user has logged in successfully",
        user: userWithoutPassword,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
