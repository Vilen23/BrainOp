import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    console.log(token);
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decode = jwt.verify(token, process.env.SECRET || "");
    if (!decode) return res.status(401).json({ error: "Unauthorized" });
    return res.status(200).json({ message: "Authorized" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
