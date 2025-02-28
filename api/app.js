import express from "express";
import cookie from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import authRoutes from "./routes/auth.route.js";
const app = express();

app.use(express.json())
app.use(cookie())
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
  console.log("Server is running");
});
