import express from "express";
import cookie from "cookie-parser";
import cors from "cors";
import postRoutes from "./routes/post.route.js";
import authRoutes from "./routes/auth.route.js";
import testRoutes from "./routes/test.route.js";
import userRoutes from "./routes/user.route.js";
const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json())
app.use(cookie())
// Allow all origins
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/testRoute", testRoutes);

app.listen(8800, () => {
  console.log("Server is running");
});
