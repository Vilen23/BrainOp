import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decode = jwt.verify(token, process.env.SECRET || "");
    if (!decode) return res.status(401).json({ error: "Unauthorized" });
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
