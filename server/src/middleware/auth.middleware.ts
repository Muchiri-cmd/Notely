import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtUser {
  id: string;
  email: string;
  userName: string;
}

export interface AuthorizedRequest extends Request {
  user?: JwtUser;
}

const authenticateToken = (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ error: "Invalid Request, no token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET!, (error, user) => {
    if (error) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = user as JwtUser;
    next();
  });
};

export default authenticateToken;
