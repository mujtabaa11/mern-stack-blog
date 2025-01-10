import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.route.js";
import "./db/index.js";

const app = express();

dotenv.config(); // to use environment variables

// middleware
app.use(cors()); // to allow cross origin access. configure at production mode.
app.use(express.json()); // to parse json data

// routes
app.use("/api/blogs", blogRoutes);

// check if server is running
app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
}); 

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
