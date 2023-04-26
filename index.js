import express from "express";
import mongoose from "mongoose";
import {
    registerValidator,
    loginValidator,
    postCreateValidator,
} from "./validations/validations.js";
import multer from "multer";
import cors from "cors";
import { checkAuth, validationErrors } from "./utils/index.js";
import { PostController, UserController } from "./controllers/index.js";

mongoose
    .connect(
        "mongodb+srv://admin:admin@cluster1.wfonueo.mongodb.net/blog?retryWrites=true&w=majority"
    )
    .then(() => console.log("db ok"))
    .catch((err) => console.log("db erorr", err));

const app = express();
app.use(cors());
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.post("/auth/login", loginValidator, validationErrors, UserController.login);
app.post(
    "/auth/register",
    registerValidator,
    validationErrors,
    UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.get("/posts/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
    "/posts",
    checkAuth,
    postCreateValidator,
    validationErrors,
    PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
    "/posts/:id",
    checkAuth,
    postCreateValidator,
    validationErrors,
    PostController.update
);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("ok");
});
