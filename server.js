import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db/connectDB.js";
import "express-async-errors";
//Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postsRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js"

//Middlewares
import notFound from "./middleware/notFound.js";
import fileUpload from "express-fileupload";
import authentication from "./middleware/authentication.js";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authentication, userRoutes);
app.use("/api/v1/posts", authentication, postsRoutes);
app.use("/api/v1/comments", authentication, commentRoutes);

app.use(notFound);
app.use(errorHandlingMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
