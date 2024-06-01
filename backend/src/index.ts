import express from "express";
import cors from "cors";
import authRoute from "./routes/auth-routes";
import postRoute from "./routes/post-route";
import cookieParser from "cookie-parser";
import verifyRoute from "./routes/verify-route";
import rateLimit from "express-rate-limit";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//rateLimiting
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message:
    "Too many accounts created from this IP, please try again after 5 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});

//RouteHandler
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/posts", postRoute);
app.use("/api/verify", verifyRoute);

app.listen(8000);
